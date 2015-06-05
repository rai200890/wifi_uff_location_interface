#Script to install gdal2tiles-leaflet
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
sudo apt-get install -y python2.7 gdal-bin python-gdal
git clone https://github.com/commenthol/gdal2tiles-leaflet vendor/plugins/gdal2tiles-leaflet