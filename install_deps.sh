#!/usr/bin/env bash
# CURL
sudo apt-get install -y curl

# RVM (Ruby Version Manager)
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | sudo bash -s stable
sudo adduser vagrant rvm
source /etc/profile.d/rvm.sh

# MySQL
#root: username: root password: root
echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
sudo apt-get -y install mysql-server
sudo apt-get install -y mysql-client libmysqlclient-dev

# NodeJS
sudo apt-get update
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g grunt grunt-cli bower

#SNMP Agent (so that VM responds to localhost)
sudo apt-get install snmpd

#SNMP Manager (DAEMON, to run snmpwalk and snmpget, not necessary for this application)
#sudo apt-get install snmp snmp-mibs-downloader

#PROJECT DEPS
cd /vagrant
rvm install "$(< /vagrant/.ruby-version)"
# Bundler
gem install bundler

#Install project's ruby deps
bundle install

#Install node deps
npm install

#Install asset deps(Javascript, CSS)
bower install
# END PROJECT DEPS

#DATABASE Creation
#rake db:create
#rake db:migrate

#Run rails server
#rails s -b 0.0.0.0

# Deps for running tile making task
# thor tiles:make IMAGE_FILE --directory <destination directory>
#Script to install gdal2tiles-leaflet by commenthol
#
#The MIT License (MIT)
#
#gdal2tiles.py
#	Copyright (c) 2008, Klokan Petr Pridal
#	Copyright (c) 2010-2013, Even Rouault <even dot rouault at mines-paris dot org>
#
#rastercoords.js
#	Copyright (c) 2015, commenthol
#
sudo apt-get install -y git python2.7 python-gdal gdal-bin
git clone https://github.com/commenthol/gdal2tiles-leaflet /vagrant/vendor/plugins/gdal2tiles-leaflet