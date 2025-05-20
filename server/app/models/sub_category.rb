class SubCategory < ApplicationRecord
  belongs_to :category
  has_many :film_sub_categories, dependent: :destroy
  has_many :films, through: :film_sub_categories
end
