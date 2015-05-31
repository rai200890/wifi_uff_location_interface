class CreateControlRegions < ActiveRecord::Migration
  def change
    create_table :control_regions do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
