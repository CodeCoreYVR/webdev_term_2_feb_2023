# Purpose: Given an array of words, generate an array of numbers that contains the lengths of each word in the first array in the same order.
def array_of_sizes(array)
  # Use the map method to iterate over the input array of words and generate a new array of lengths
  array.map(&:length) # &:length syntax is a shorthand way of writing {|word| word.length }
  # Below is the longhand way of writing the above line
  # array.map { |word| word.length }
end

# Test your code here
words = ["hello", "what", "is", "up", "dude"]
lengths = array_of_sizes(words)

# Expected output:
p words, lengths



# ****************************** Lab ******************************
# [Lab] Array of Sizes

# Given an array of words, generate an array of numbers that contains the lengths of each word in the first array in the same order.