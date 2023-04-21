# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Clear the database of any existing records before re-seeding
Product.destroy_all

# Seed the database with 10 products
10.times do
  Product.create(
    title: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
    price: Faker::Commerce.price(range: 50..500, as_string: false)
  )
end

# Print the number of products created
puts "Created #{Product.count} products"