# create a reverse function that takes a string as an argument and returns the string reversed, you can use any method from the Array class except reverse
def reverse(str)
  # Use the each_char method to iterate over the input string and generate a new array of characters
  str.each_char.with_object([]) { |char, arr| arr.unshift(char) }.join
  # Below is a similar way of writing the above line
  # reversed_string = []
  # str.split('').map { |char| reversed_string.unshift(char) }
  # reversed_string.join
end 

p reverse("hello") # Returns ~> "olleh"



# ****************************** Lab ******************************

# [Lab] Reverse engineer String's `reverse` method

# Ruby String class comes with a `reverse` method that reverses the order of characters in a string:
#   1 | greeting = "hello"
#   2 | puts greeting.reverse # olleh

# Write a code that gives the same outcome of the reverse method. You can use any method from the Array except reverse. 