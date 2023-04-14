# define the reduce method that takes an array, an initial value, and a block
def reduce(array, initial_value, &block)
  # set the accumulator to the initial value
  accumulator = initial_value 

  # iterate over each element in the array
  for element in array 
    # call the block with the current accumulator and element, and set the result to the accumulator
    accumulator = block.call(accumulator, element) 
  end

  p accumulator # print the final value of the accumulator
  accumulator # return the final value of the accumulator
end

# sum the elements of an array
reduce([1, 2, 3, 4, 5, 6], 0) { |total, v| total + v } # => 21

# concatenate the elements of an array into a string
reduce(["This", "is", "my", "sentence"], "") { |sentence, word| sentence + " " + word } # => "This is my sentence"

# find the minimum value in an array
reduce([6, 5, 9, 2, 1, 10, 3], Float::INFINITY) do |min, v|
  if min > v
    v
  else
    min
  end
end


# ******************************* Lab *******************************

# [Lab] Implement Reduce

# Implement a reduce method which takes an array, and initial value and a block as its arguments. Reduce is used to process lists (or arrays) of elements and return another value that is an aggregation of all the elements. You are not allowed to use Ruby's reduce or collect and you must use yield to execute the passed block.

# Here are some examples:
# reduce([1, 2, 3, 4, 5, 6], 0) { |total, v| total + v } # => 21

# reduce(["This", "is", "my", "sentence"], "") { |sentence, word| sentence + " " + word } # => "This is my sentence"

# reduce([6, 5, 9, 2, 1, 10, 3], Float::INFINITY) do |min, v|
#   if min > v
#      v
#   else
#      min
#   end
# end
# # => 1 