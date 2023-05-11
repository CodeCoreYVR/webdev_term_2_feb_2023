# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Clear the database of any existing records before re-seeding
User.destroy_all
Product.destroy_all
Review.destroy_all
NewsArticle.destroy_all

# Create an admin user
User.create(
  first_name: "Admin",
  last_name: "User",
  email: "admin@user.ca",
  password: 'password',
  admin: true
)

# create 5 users with the Faker gem
5.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(domain: "example"),
    password: 'password',
    admin: false
  )
end

# create 5 products for each user (25 total), first user(admin) is skipped
User.all.drop(1).each do |user|
  5.times do
    product = user.products.create(
      title: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      price: Faker::Commerce.price(range: 50..500, as_string: false)
    )
  end
end

# create 5 reviews for each product (125 total)
Product.all.each do |product|
  5.times do
    product.reviews.create(
      rating: Faker::Number.between(from: 1, to: 5),
      body: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      hidden: false,
      user_id: User.all.sample.id
    )
  end
end

# create 10 news articles
User.all.drop(1).each do |user|
  5.times do
    news_article = user.news_articles.create(
      title: Faker::Lorem.sentence(word_count: 5),
      description: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      published_at: Faker::Time.between(from: 30.days.ago, to: Time.now)
    )
  end
end

# Print the number of users created
puts "Created #{User.count} users"
# Print the number of products created
puts "Created #{Product.count} products"
# Print the number of reviews created
puts "Created #{Review.count} reviews"
# Print the number of news articles created
puts "Created #{NewsArticle.count} news articles"