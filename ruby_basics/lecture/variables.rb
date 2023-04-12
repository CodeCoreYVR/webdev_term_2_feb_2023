
# Name of the variables is snakecase

first_name = "Jennifer"
last_name = "Aniston"

name = first_name + " " + last_name;

# p name.class

# It will give us syntax error
# 2name = "demo name"

name = 11000
# p name.class

# Constant name uses uppercase
# FULL_NAME = "Hooman"
# FULL_NAME = "Keerat Mander" #It will give us warning, but no error.
# p FULL_NAME

# is_a? is a method that takes type/class of the object
# it is true
p 311.is_a? Integer
p 3.14.is_a?(Float)

# It is false
p "3.14".is_a? Integer

a = "30"
b = a
a = "10"
print b.class

