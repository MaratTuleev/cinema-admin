FactoryBot.define do
  factory :sub_category do
    name { "SubCategory #{SecureRandom.hex(4)}" }
    category
  end
end