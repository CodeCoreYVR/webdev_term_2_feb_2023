# Define an array of letters from 'a' to 'z'
letters = ('a'..'z').to_a

# Define a method that takes an array of letters and prints them with spaces
def print_letters(letters)
  # Iterate over each letter in the array, along with its index
  letters.each_with_index do |letter, index|
    # Print the letter followed by a space, repeated by the current index + 1
    # The result is a string of the letter followed by a space, repeated multiple times
    puts (letter + " ") * (index + 1)
  end
end

# Call the print_letters method with the letters array
print_letters(letters)



# ******************** [Lab] Print Letters ********************

# Write a code that prints letters in increasing number as follows:

# a
# b b
# c c c
# d d d d
# e e e e e
# ...etc 