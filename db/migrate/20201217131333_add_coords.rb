class AddCoords < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :coords, :string
  end
end
