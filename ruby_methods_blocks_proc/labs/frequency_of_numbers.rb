def frequency_of_numbers(array)
  # We create a new hash object with a default value of 0, this means that when a new key is added to the hash, its value will be 0 by default
  array.each_with_object(Hash.new(0)) do |num, hash|
    # We use the current number as the key and increment its value, this way, we count how many times each number appears in the array
    hash[num] += 1
  end
end

# Example usage:
array = [1, 2, 3, 4, 4, 4, 2, 3, 3, 3]
puts frequency_of_numbers(array) # Returns ~> {1=>1, 2=>2, 3=>4, 4=>3}



# ******************************* Lab *******************************

# [Exercise] Frequency of Numbers

# Given an array of number such as:
#   array = [1, 2, 3, 4, 4, 4, 2, 3, 3, 3]

# Write a method, frequency_of_numbers, that will generate a hash of frequencies that looks like:
#   {1 => 1, 2 => 2, 3 => 4, 4 => 3}

# Attempt to do the exercise in one line of code using methods like each_with_object.
