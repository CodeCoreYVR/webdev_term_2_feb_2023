  # Define a method called get_user_info
def get_user_info
  # Ask the user for their first name and store it in a variable called first_name
  puts "What is your first name?"
  first_name = gets.chomp.capitalize
  
  # Ask the user for their last name and store it in a variable called last_name
  puts "What is your last name?"
  last_name = gets.chomp.capitalize
  
  # Ask the user for their city of birth and store it in a variable called city_of_birth
  puts "What is your city of birth?"
  city_of_birth = gets.chomp.capitalize
  
  # Ask the user for their age and store it in a variable called age as an integer
  puts "What is your age?"
  age = gets.chomp.to_i
  
  # Create a hash called user_info with the user's information and return it
  user_info = {first_name: first_name, last_name: last_name, city_of_birth: city_of_birth, age: age}
  return user_info
end

# Call the get_user_info method and display the hash with the user's information
puts get_user_info


# ************************* Lab *************************

# [Lab] Hash of Information

# Create a method, get_user_info, that when called asks the user for the following personal information: first name, last name, city of birth and age. Then, return that information as a hash.

#   get_user_info
#   # Prompts the user a bunch of times for their information
#   # => { first_name: "Jon", last_name: "Snow", city_of_birth: "Winterfell", age: 26 }
