FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/indoors-3117027_1920.jpg")}
    user
    group
  end
end