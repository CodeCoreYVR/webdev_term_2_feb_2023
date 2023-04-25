
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#if it is in development environment or testing environment
Question.destroy_all()
Answer.destroy_all()

200.times do
    q = Question.create(
        created_at: Faker::Date.backward(days: 365),
        title: Faker::ChuckNorris.fact,
        body: Faker::Hacker.say_something_smart,
        view_count: rand(10_000),
        updated_at: Faker::Date.backward(days: 365)
    )
    
    if q.valid?
        rand(1..5).times do
            Answer.create(body: Faker::Hacker.say_something_smart, question: q)
        end
    end
end


puts Cowsay.say("Generated #{Question.all.count}# questions", :Elephant)
puts Cowsay.say("Generated #{Answer.all.count}# answers", :Dragon)