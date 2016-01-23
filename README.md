# wifi_uff_location_interface
[![Code Climate](https://codeclimate.com/github/rai200890/wifi_uff_location_interface/badges/gpa.svg)](https://codeclimate.com/github/rai200890/wifi_uff_location_interface)
[![Dependency Status](https://gemnasium.com/rai200890/wifi_uff_location_interface.svg)](https://gemnasium.com/rai200890/wifi_uff_location_interface)
[![Build Status](https://travis-ci.org/rai200890/wifi_uff_location_interface.svg?branch=master)](https://travis-ci.org/rai200890/wifi_uff_location_interface)

This project aims helping SCIFI-UFF study group locating EDUROAM's routers inside university's buildings.
This application makes SNMP requests to these devices to discover in which channel and power they are operating on.
Hopefully, this data will be useful for helping configuring routers better, since devices close to one another,
operating at the same channel are more succeptible to interference.  

This is a Single Page Application using AngularJS which makes requests to this [API](https://github.com/rai200890/wifi_uff_location_api).

##Instalation

### External dependencies

Make sure you have NodeJS and NPM installed in your machine.

``
npm install -g grunt grunt-cli
``

### Project's dependencies

``
npm install
``

##Running

### Watch task

``
grunt watch
``

### Static server

``
grunt connect
``

Now open [http://localhost:8000/aps](http://localhost:8000/aps) on your browser
