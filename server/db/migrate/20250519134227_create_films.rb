class CreateFilms < ActiveRecord::Migration[8.0]
  def change
    create_table :films do |t|
      t.string :name

      t.timestamps
    end
  end
end
