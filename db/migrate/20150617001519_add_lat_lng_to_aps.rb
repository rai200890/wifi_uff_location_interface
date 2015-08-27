class AddLatLngToAps < ActiveRecord::Migration
  def change
    add_column :aps, :lat, :float
    add_column :aps, :lng, :float
  end
end
