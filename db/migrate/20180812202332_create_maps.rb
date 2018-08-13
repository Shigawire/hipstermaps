class CreateMaps < ActiveRecord::Migration[5.2]
  def change
    create_table :maps do |t|
      t.string :format
      t.string :lon
      t.string :lat
      t.string :mapbox_map_id
      t.string :filename
      t.string :title
      t.string :subtitle
      t.integer :status

      t.timestamps
    end
  end
end
