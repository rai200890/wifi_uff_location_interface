#encoding: utf-8
class Tiles < Thor
  include Thor::Actions

  desc "install_deps", "Install tile making script's deps"
  def install_deps
    run "sudo apt-get install -y git python2.7 gdal-bin python-gdal"
    run "git clone https://github.com/commenthol/gdal2tiles-leaflet vendor/plugins/gdal2tiles-leaflet"
  end

  method_option :directory, :aliases => "-d", :desc => "Specify destination directory"
  method_option :zoom, :aliases => "-z", :desc => "Specify zoom level"
  desc "make", "Make tiles from image file"
  def make image
    dirname = File.basename(image, ".*")
    run "vendor/plugins/gdal2tiles-leaflet/gdal2tiles.py -l -p raster -z 0-#{options[:zoom]} -w none #{image} #{options[:directory]}/#{dirname}"
  end

end