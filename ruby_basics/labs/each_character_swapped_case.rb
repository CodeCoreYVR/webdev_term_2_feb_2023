# Define a variable called string and assign it the value "HelLo"
string = "HelLo"

# Define a method named swap_case that takes a string as an argument
def swap_case(str)
  # Iterate over each character in the string using the `each` method and a block
  str.chars.each do |char|
    # Check if the character is already lowercase
    if char == char.downcase
      # If it is, capitalize it and print it to the console
      puts char.upcase
    else
      # Otherwise, make it lowercase and print it to the console
      puts char.downcase
    end
  end
end

# Call the swap_case method with the string variable as an argument
swap_case(string)


# ******************** [Exercise] Each Character Swapped Case ********************

# Take a string and find a way to display each character on a new line with its case swapped so if I give: "Hello" I will get:
#   h
#   E
#   L
#   L
#   O