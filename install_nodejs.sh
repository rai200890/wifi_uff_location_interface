#!/usr/bin/env bash
#Install NodeJS
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install npm -g
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo npm install -g grunt grunt-cli
