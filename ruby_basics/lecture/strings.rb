
mulitple_of_2_and_3 = 6
puts "#{2*3} is equal to #{mulitple_of_2_and_3}"


puts "#{2*3} is not equal to #{2+5}"

# string interpoletion does not work with single quote
puts '#{2*3} is not equal to #{2+5}'

puts "I'm a human"

# Strings are mutable
# name = "ross geller"
# puts name
# name[0] = "B"
# puts name

# name = "Monica Geller"
# puts name.capitalize
# puts name.upcase # => name.upcase()

# name = "Monica Geller"
# puts name.downcase.reverse
# puts name.swapcase


message = "Good morning, it is raining"
puts message.gsub("ing", "###")
