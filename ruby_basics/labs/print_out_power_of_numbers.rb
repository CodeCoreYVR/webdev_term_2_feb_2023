# Define a function to determine the power of a number based on its divisibility by 2 and 3
def power_of_number
  # Ask user for a number
  print "Enter a number: "
  number = gets.chomp.to_i

  # Check if the number is divisible by 3
  if number % 3 == 0
    # If it is, print the number raised to the power of 3
    puts number ** 3
  # Check if the number is divisible by 2
  elsif number % 2 == 0
    # If it is, print the number raised to the power of 2
    puts number ** 2
  else
    # If the number is neither divisible by 2 nor by 3, print the number itself
    puts number
  end
end

# Call the function to execute the code
power_of_number


# ******************** [Exercise] Print out Power of Numbers ********************

# Write code that takes a number and then prints the power of three of that number if it's divisible by three and it prints the power of two if it's divisible by 2 and prints the number itself otherwise.