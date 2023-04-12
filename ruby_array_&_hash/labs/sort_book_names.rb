# Createing an array to later include book names then sorting them
books = []

# Looping until the user enters 'exit' or 'e'
loop do
  # If the array is empty, print the first message, otherwise print the second message
  if books.length <= 0
    print "Enter a book name (or 'exit' to quit): "
  else
    print "Enter another book name: (or 'exit' to quit)"
  end

  # Get the user input and downcase it
  input = gets.chomp.downcase
  # If the user enters 'exit' or 'e', break out of the loop
  break if input == 'exit' || input == 'e'

  # Capitalize the first letter of each word and join them together
  books << input.split.map(&:capitalize).join(' ') # &:capitalize syntax is a shorthand way of writing {|word| word.capitalize }
end

puts "\nYou entered the following books:"
# Sort the array and print it
puts books.sort.inspect


# ****************************** Lab ******************************

# [Lab] Sort Book Names

# Write some code that keeps asking the user for book names until the user enters "exit". After typing "exit" the program should display all the entered book names sorted and have the book names capitalized.