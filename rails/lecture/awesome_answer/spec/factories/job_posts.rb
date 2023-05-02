FactoryBot.define do
  RANDOM_100_CHARS = "hello world hello world hello world hello world hello world hello world hello world hello world hello world
  hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
  hello world hello world hello world hello world hello world 
  hello world hello world hello world hello world hello world hello world hello world hello world hello world
  hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
  hello world hello world hello world hello world hello world"
  factory :job_post do
    sequence(:title) { |n| Faker::Job.title+ " #{n}"}
    describe { Faker::Job.field + "-#{RANDOM_100_CHARS}" }
    company_name {Faker::Company.name}
    min_salary {rand(80_000..200_0000)}
    max_salary {rand(200_0000..400_000)}
    location {Faker::Address.city}
  end

  # FactoryBot.create(:job_post) # will create and save the object to the database
  # FactoryBot.build(:job_post) # will create the object like .new but not save to the database
  # FactoryBot.attributes_for(:job_post) # will generate a job post with only those specific attributes
end
