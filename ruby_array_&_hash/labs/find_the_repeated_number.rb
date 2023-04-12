# Generate an array with numbers between 1 and 1,000,000 and one number repeated twice
array = (1..1000000).to_a
array << rand(1..1000000)

# Using a hash to find the duplicate number
hash = {}

p "************************* Without Hashes ************************"
# Sort the array and compare adjacent numbers to find the duplicate
array.sort.each_cons(2) do |a, b|
  if a == b
    puts "Duplicate number is #{a}"
    break # Break out of the loop once the duplicate is found
  end
end
p "************************ With Hashes 1 **************************"
# Loop through the array and add each number to the hash as a key, if the key already exists, it means the number is a duplicate
array.each do |n|
  if hash[n]
    puts "Duplicate number is #{n}"
    break # Break out of the loop once the duplicate is found
  else
    # Add the number to the hash as a key and the value is the number itself, this is less efficient than using a boolean value
    hash[n] = n
  end
end
# similar to above but using a ternary operator, ; to seperate puts from break, and a boolean value instead of number for efficiency
hash = {} # Reset the hash
array.each { |n| hash[n] ? (puts "Duplicate number is #{n}"; break) : hash[n] = true }
p "************************ With Hashes 2 **************************"
# Using the group_by method to group the numbers by their value and then using the transform_values method to transform the values to a boolean value
hash = {} # Reset the hash
hash = array.group_by { |a| a }.transform_values { |v| puts "Duplicate number is #{v.first}" if v.length > 1 }
# ****************************** Lab ******************************


# [Lab] Find The Repeated Number

# You are given an array with numbers between 1 and 1,000,000. One integer is in the array twice. How can you determine which one? Can you think of a way to do it using little extra memory?
# Solve it in two ways: one using hashes and one without.
  