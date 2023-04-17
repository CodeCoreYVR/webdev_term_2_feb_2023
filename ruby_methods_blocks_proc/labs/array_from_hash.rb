# Object containing a hash of BC cities and their population
bc_cities_population = {
  vancouver: 2135201, 
  victoria:  316327, 
  abbotsford: 149855, 
  kelowna: 141767, 
  nanaimo:  88799, 
  white_rock: 82368, 
  kamloops: 73472, 
  chilliwack: 66382 
}

# Method that takes a hash and returns an array of the values divided by 1000
def array_from_hash(hash)
  # Map over the hash and return an array of the values converted to floats and divided by 1000
  # Floats are used to ensure the values are not rounded to integers
  hash.values.map {|value| value.to_f / 1000}
end

# Call the method and display the results
puts array_from_hash(bc_cities_population)



# **************************** Exercise *****************************

# [Exercise] Array from Hash

# bc_cities_population = {vancouver: 2135201, victoria:  316327, abbotsford: 149855, kelowna: 141767, nanaimo:  88799, white_rock: 82368, kamloops: 73472, chilliwack: 66382 }

# Write a method that takes the hash above and returns an array of the values divided by a 1000 in one line of code.
