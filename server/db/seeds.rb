# Очистка таблиц
FilmSubCategory.destroy_all
Film.destroy_all
SubCategory.destroy_all
Category.destroy_all

# Создание фильмов
film_records = {}
[
  { name: "The Matrix" },
  { name: "Inception" },
  { name: "Interstellar" },
  { name: "The Dark Knight" },
  { name: "Pulp Fiction" }
].each do |film_data|
  film = Film.create!(film_data)
  film_records[film.name] = film
end

# Создание категорий, подкатегорий и связей
categories = [
  {
    name: "Action",
    sub_categories: [
      { name: "Sci-Fi", films: ["The Matrix", "Inception", "Interstellar"] },
      { name: "Superheroes", films: ["The Matrix", "Inception", "The Dark Knight"] }
    ]
  },
  {
    name: "Drama",
    sub_categories: [
      { name: "Historical", films: ["The Matrix", "Interstellar", "Pulp Fiction"] },
      { name: "Romance", films: ["Inception", "Interstellar", "Pulp Fiction"] }
    ]
  }
]

categories.each do |category_data|
  category = Category.create!(name: category_data[:name])

  category_data[:sub_categories].each do |sub_data|
    sub_category = category.sub_categories.create!(name: sub_data[:name])

    sub_data[:films].each do |film_name|
      film = film_records[film_name]
      FilmSubCategory.create!(film: film, sub_category: sub_category)
    end
  end
end

puts "Seeding completed successfully!"