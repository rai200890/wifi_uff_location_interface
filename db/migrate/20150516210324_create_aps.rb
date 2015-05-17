class CreateAps < ActiveRecord::Migration
  def change
    create_table :aps do |t|
      t.string :name
      t.string :wan_mac_address
      t.string :wlan_mac_address
      t.string :switch_ip
      t.integer :port
      t.string :socket
      t.string :panel_port
      t.string :status
      t.string :ip
      t.text :comments
      t.boolean :validated
      t.string :syslocation
      t.float :latitude
      t.float :longitude
      t.float :height
      t.integer :location_id
      t.integer :ap_model_id
      t.integer :ap_status_id
      t.integer :control_region_id
    end
  end
end
