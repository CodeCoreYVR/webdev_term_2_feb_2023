# Define a method named has_c
def has_c
  # Ask the user to enter a string
  print "Enter a string: "
  # Store the user's input in a variable called user_input
  user_input = gets.chomp
  
  # Check if the user's input contains the letter "c" (uppercase or lowercase)
  # If it does, print "Yes it has C"
  # If it doesn't, print "There is no C"
  (user_input.downcase.include? 'c') ? (puts "Yes it has C") : (puts "There is no C")
  
  # # The code above is equivalent to the following code using an if statement:
  # if user_input.downcase.include? 'c'
  #   puts "Yes it has C"
  # else
  #   puts "There is no C"
  # end
end

# Call the has_c method to start the program
has_c



# ******************** [Exercise] Does it Include C? ********************

# Write a code that takes user's input and then prints out "Yes it has C" if entered input contains the letter "C" (upper or lower case). And it prints "There is no C" if it doesn't.