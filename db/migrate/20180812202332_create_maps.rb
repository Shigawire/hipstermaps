class CreateMaps < ActiveRecord::Migration[5.2]
  def change
    create_table :maps do |t|
      t.string :format, required: true
      t.string :style, required: true
      t.float :lon, required: true
      t.float :lat, required: true
      t.float :zoom, required: true
      t.string :filename, required: true
      t.string :title, required: true
      t.string :subtitle
      t.integer :status, required: true, default: 0

      t.timestamps
    end
  end
end
