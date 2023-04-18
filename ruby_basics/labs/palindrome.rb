# This method checks whether a passed string is a palindrome or not.
def palindrome?(str)
  # Remove all non-letter characters and downcase the string
  clean_str = str.gsub(/[^a-zA-Z]/, '').downcase

  # Check if the cleaned string is equal to its reverse
  # The result is assigned to the variable 'palindrome'
  palindrome = clean_str.downcase == clean_str.downcase.reverse
  
  # Print the result and return it
  puts palindrome
  return palindrome
end


palindrome?("Ogopogo") # Returns ~> true
palindrome?("hello") # Returns ~> false
palindrome?("A man a plan a canal Panama") # Returns ~> true



# ******************** [Exercise] Palindrome ********************

# Write a method that checks whether a passed String is a palindrome or not. A palindrome is a string that reads that same both ways for instance: sugnangus