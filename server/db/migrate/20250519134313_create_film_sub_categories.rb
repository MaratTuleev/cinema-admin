class CreateFilmSubCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :film_sub_categories do |t|
      t.references :film, null: false, foreign_key: true
      t.references :sub_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
