class Film < ApplicationRecord
  has_many :film_sub_categories, dependent: :destroy
  has_many :sub_categories, through: :film_sub_categories
end
