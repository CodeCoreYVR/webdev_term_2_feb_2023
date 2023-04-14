array_of_hashes_1 = [{a:1}, {a:2}]
array_of_hashes_2 = [{b:2}, {a:4, b:4}, {a:1}, {c:4}]
array_of_hashes_3 = [{b:2}, {a:4, b:4}, {a:1}, {c:4}]

# Define the `pluck` method, which takes an array of hashes and a key name, and returns an array containing the values for each named key in the hash.
def pluck(array_of_hashes, key_name)
  # Map over each hash in the array and return the value associated with the given key name
  array_of_hashes.map { |hash| hash[key_name] }
end

p pluck(array_of_hashes_1, :a) # Returns ~> [1, 2]
p pluck(array_of_hashes_2, :a) # Returns ~> [nil, 4, 1, nil]
p pluck(array_of_hashes_3, :b) # Returns ~> [2, 4, nil, nil]



# ******************************* Lab *******************************

# [Lab] Implement Pluck Method

# Implement a `pluck` method, which takes an array of hashes and a key name, and returns an array containing the values for each named key in the hash.

# For example:
#   pluck([{a:1}, {a:2}], :a) ## returns [1,2]
#   pluck([{b:2}, {a:4, b:4}, {a:1}, {c:4}], :a) ## returns [nil, 4, 1, nil]
#   pluck([{b:2}, {a:4, b:4}, {a:1}, {c:4}], :b) ## returns [2,4,nil,nil]

# If an hash is missing the property, you should just leave it as nil in the output array.

# http://www.codewars.com/dojo/katas/530017aac7c0f49926000084
