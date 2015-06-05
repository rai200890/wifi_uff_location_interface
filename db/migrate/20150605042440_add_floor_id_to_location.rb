class AddFloorIdToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :floor_id, :integer
  end
end
