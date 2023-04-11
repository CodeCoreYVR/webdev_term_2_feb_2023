my_string ="Hello World"

# Define a function to get the last 4 characters of a string
def last_four_characters(str)
  # Get the length of the string
  length = str.length
  # Get a substring that starts at the 4th character from the end and ends at the end of the string
  substring = str[length-4..length-1]
  
  puts substring
  # Return the substring
  return substring
end

# Test the function with the given string
last_four_characters(my_string)



# ******************** [Exercise] Print 10 to 20 Using for Loop ********************

# Given the string:
# 1 | my_string ="Hello World"

# Find a way to get a substring that contains the last 4 characters.
