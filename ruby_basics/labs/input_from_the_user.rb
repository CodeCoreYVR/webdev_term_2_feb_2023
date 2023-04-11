# Define a function to multiply a number by 5 and add it to itself
def multiply_and_add
  # Prompt the user to enter a number
  print "Give me a number:\n> "
  # Get user input and convert it to an integer
  number = gets.chomp.to_i
  # Print the number multiplied by 5
  puts "\n> #{number * 5}"
  # Print the number added to itself
  puts "> #{number + number}"
end

# Call the multiply_and_add method to execute the code
multiply_and_add



# ******************** [Exercise] Input From the User ********************

# Ask user for a number then print out the number multiplied by 5 and then the same number added to itself.