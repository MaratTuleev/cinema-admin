FactoryBot.define do
  factory :category do
    name { "Category #{SecureRandom.hex(4)}" }
  end
end