# Purpose: Square Array of Arrays
array = [[2,3,4], [5,6,7], [6,7,8]]

# **************************** Regular ****************************
# Use the map method to iterate over the input array of arrays and generate a new array of arrays with each element multiplied by itself
result = array.map do |sub_array|
  sub_array.map { |n| n * n }
end
# *************************** Recursive ***************************
# Define a recursive method that will take an array of arrays and return a new array of arrays with each element multiplied by itself
def square_array_recursive(array)
  array.map do |item|
    # If the item is an array, call the recursive method again and pass in the item as the argument
    item.is_a?(Array) ? square_array_recursive(item) : item * item
  end
end

# Call the square_array_recursive method and store the result in a variable
result_recursive = square_array_recursive(array)
# ************************* Calling result ************************
# Print the result
puts result.inspect
puts result_recursive.inspect



# ****************************** Lab ******************************

# [Lab] Square Array of Arrays

# Given an array of arrays:
# array = [[2,3,4], [5,6,7], [6,7,8]]

# Write a piece of code that will take that array and give back an array of arrays with each element multiplied by itself so you will get back:
# [[4, 9, 16], [25, 36, 49], [36, 49, 64]]
