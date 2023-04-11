# 1. a is assigned the value "hello"
a = "hello"
# 2. b is assigned the value of a, which is "hello"
b = a
# 3. a.capitalize! modifies the value of a to "Hello" by capitalizing the first letter of the string in place. Since b points to the same object as a, its value is also modified to "Hello"
a.capitalize!
# 4. puts b == "Hello" compares the value of b to the string "Hello". Since b was modified in step 3 to have the value "Hello", the output will be true
puts b == "Hello" # Returns ~> true



# ******************** [Exercise] Variables ********************

# Can you tell what the output will be for the following:
# 1. a = "hello"
# 2. b = a
# 3. a.capitalize!
# 4. puts b == "Hello" 