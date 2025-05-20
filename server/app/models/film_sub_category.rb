class FilmSubCategory < ApplicationRecord
  belongs_to :film
  belongs_to :sub_category
end
