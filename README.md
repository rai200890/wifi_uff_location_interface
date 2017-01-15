# scifi_viz_interface
[![Code Climate](https://codeclimate.com/github/rai200890/wifi_uff_location_interface/badges/gpa.svg)](https://codeclimate.com/github/rai200890/wifi_uff_location_interface)
[![Dependency Status](https://gemnasium.com/rai200890/wifi_uff_location_interface.svg)](https://gemnasium.com/rai200890/wifi_uff_location_interface)
[![Build Status](https://travis-ci.org/rai200890/wifi_uff_location_interface.svg?branch=master)](https://travis-ci.org/rai200890/wifi_uff_location_interface)

This project's aim is to help SCIFI-UFF study group locate EDUROAM's routers inside university's buildings. This application makes SNMP requests to these devices to discover in which channel and power they are operating on. Hopefully, this data will be useful to help configure routers better. For instance, devices close to one another, operating on the same channel are more susceptible to interference.

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
