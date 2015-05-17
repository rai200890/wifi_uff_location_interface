class CreateApStatuses < ActiveRecord::Migration
  def change
    create_table :ap_statuses do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
