def ask_user_for_information
  # Reusable method to ask user for input
  def ask_user(prompt)
    print prompt
    gets.chomp
  end

  # Get user input and store it in variables
  first_name = ask_user("What is your first name? ")
  last_name = ask_user("What is your last name? ")
  age = ask_user("What is your age? ") { |input| input.to_i.to_s == input }
  
  # Reusable method for capitalizing the first letter of each word in a string
  def capitalize_words(string)
    # Split the string into an array of words, capitalize each word, and join the words back into a string
    string.split.map(&:capitalize).join(' ')
  end

  # Array to store the cities the user has visited
  cities = []
  # Loop until the user enters 'done' or 'd'
  loop do
    # Ask the user for a city and add it to the cities array
    city = ask_user("What city have you visited? (type 'done' when finished) ")
    # Break out of the loop if the user enters 'done' or 'd'
    break if city.downcase == "done" || city.downcase == "d"
    # Capitalize the first letter of each word in the city name and add it to the cities array
    cities << capitalize_words(city)
  end

  # Create a hash to store the user data
  user_data = { 
    first_name: capitalize_words(first_name), 
    last_name: capitalize_words(last_name), 
    age: age, 
    cities: cities 
  }

  puts "Here is the information you entered:"
  # Block that loops over the user_data hash and display the results
  user_data.each do |key, value|
    # If the key is not :cities, display the key and value
    if key != :cities
      puts "#{key}: #{value}"
    else
      puts "#{key} Visited:"
      # If the key is :cities, loop over the array of cities and display each city
      value.each { |city| 
        puts "    #{city}"
      }
    end
  end

  # Return the user_data hash
  user_data
end

# Call the method to test it
ask_user_for_information


# ******************************* Lab *******************************

# [Exercise] Ask user for information

# 1. Ask the user for the following information: first name, last name and age.
# 2. Then ask them for cities they've visited (they can keep entering until they type "done").
# 3. Store all the entered data in a hash and then loop through the hash and display results.
