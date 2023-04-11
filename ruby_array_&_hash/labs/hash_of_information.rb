# Ask user for personal information
puts "Please enter your personal information:"
print "First name: "
first_name = gets.chomp.capitalize
print "Last name: "
last_name = gets.chomp.capitalize
print "City of birth: "
city_of_birth = gets.chomp.capitalize
print "Age: "
age = gets.chomp.to_i

# Store user's personal information in a hash
personal_info = {
  "first name" => first_name,
  "last name" => last_name,
  "city of birth" => city_of_birth,
  "age" => age
}

# Display the user's personal information
puts "\nYour personal information is:"
personal_info.each do |key, value|
  puts "Your #{key} is #{value}."
end



# ****************************** Lab ******************************

# [Lab] Hash of Information

# Ask the user for personal information: first name, last name, city of birth and age. Then store that information in a hash. After that loop through the hash and display the results, for example:
#   Your first name is Tam.
#   Your last name is K.
#   Your city of birth is Burnaby.
#   Your age is 25.

# Capitalize the inputs from the user if they are capitalizable.
