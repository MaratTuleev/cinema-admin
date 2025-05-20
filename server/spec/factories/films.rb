FactoryBot.define do
  factory :film do
    name { "Film #{SecureRandom.hex(4)}" }
  end
end