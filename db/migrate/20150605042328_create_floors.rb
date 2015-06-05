class CreateFloors < ActiveRecord::Migration
  def change
    create_table :floors do |t|
      t.string :number
      t.integer :building_id
      t.timestamps null: false
    end
  end
end
