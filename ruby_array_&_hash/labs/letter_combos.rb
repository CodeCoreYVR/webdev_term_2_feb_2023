# Description: Given a string such as "abcd". Generate an array that gives every 2-letter combination that are adjacent so your code will generate:
def adjacent_pairs(str)
  # each_cons method to iterate over the input string, yielding each consecutive pair of characters as an array.
  # The map method is then used to convert each array of characters to a string
  str.chars.each_cons(2).map(&:join) # &:join syntax is a shorthand way of writing {|pair| pair.join }
  # Below is the longhand way of writing the above line
  # str.chars.each_cons(2).map { |pair| pair.join }
end

# Test your code here
p adjacent_pairs("abcd") # Returns ~> ["ab", "bc", "cd"]
p adjacent_pairs("123456") # Returns ~> ["12", "23", "34", "45", "56"]


# ****************************** Lab ******************************

# [Lab] Letter combos

# Given a string such as "abcd". Generate an array that gives every 2-letter combination that are adjacent so your code will generate:
# ["ab", "bc", "cd"]

# Given a string "123456":  
# ["12", "23", "34", "45", "56"]
