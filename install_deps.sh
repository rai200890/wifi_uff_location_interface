#!/usr/bin/env bash
# CURL
sudo apt-get install -y curl

# RVM
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | sudo bash -s stable
sudo adduser vagrant rvm
source /etc/profile.d/rvm.sh
rvm install "$(< /vagrant/.ruby-version)"

# MySQL
echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
sudo apt-get -y install mysql-server
sudo apt-get install -y mysql-client libmysqlclient-dev

# NodeJS
sudo apt-get update
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g grunt grunt-cli bower

# Bundler
gem install bundler

#Install project's deps
bundle install

# Deps for running tile making task
sudo apt-get install -y git python2.7 python-gdal gdal-bin
#git clone https://github.com/commenthol/gdal2tiles-leaflet /vagrant/vendor/plugins/gdal2tiles-leaflet