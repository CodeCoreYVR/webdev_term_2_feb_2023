string_one = "aaaabbc"
string_two = "T a d c g d g d d n"
string_three = "1111 monkeys on the wall"

# ********************** Example 1 **********************
# Define a method called most_common_letter that takes a string as an argument
def most_common_letter(str)
  # Create a hash to store character counts, with a default value of 0
  counts = Hash.new(0)

  # Iterate through each character in the string
  str.chars.each do |char|
    # If the character is a letter (case insensitive) or a digit, increment its count in the hash
    if ('a'..'z').include?(char.downcase) || ('0'..'9').include?(char)
      counts[char.downcase] += 1
    end
  end

  # Return the key (character) with the highest value (count) in the hash
  counts.max_by { |k, v| v }[0]
end
# ********************** Example 2 **********************
def most_common_letter_two(str)
  str.gsub(/[^A-Za-z0-9]/, '') # Remove non-alphanumeric characters
     .downcase # Convert all characters to lowercase
     .chars # Convert the string into an array of characters
     .group_by(&:itself) # Group the characters by themselves
     .transform_values(&:count) # Count the frequency of each character
     .max_by { |k, v| v } # Find the character with the highest frequency
     .first # Return only the character itself
end
# ********************* Method Call *********************

p most_common_letter(string_one)
p most_common_letter(string_two)
p most_common_letter(string_three)
p most_common_letter_two(string_one)
p most_common_letter_two(string_two)
p most_common_letter_two(string_three)

# ************************* Lab *************************

# [Lab] Most Common Letter

# Create a method, most_common_letter, that takes a string as an argument and returns the most common letter in the string. Ignore special characters and include numbers.

# Example usage:
#   most_common_letter("aaaabbc") # => "a"
#   most_common_letter("T a d c g d g d d n") # => "d"
#   most_common_letter("1111 monkeys on the wall") # => "1" 