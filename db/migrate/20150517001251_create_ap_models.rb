class CreateApModels < ActiveRecord::Migration
  def change
    create_table :ap_models do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
