# Array 

a = [[1, 2, 3], true, "Hey", "Bye"]

#To access
a[2]

aa = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]

aa[0]
aa[0][1]

# ---------------METHODS-------------------

#Methods on array

# .push
a.push([4, 5, 6])
p a

# Shovel operator
# <<
a << "Hola" 
p a

array = [1, 2, 3]
p array.include?(4)
p array.include?(2)

# Finding the number of elements in an array
p array.count
p array.length
p array.size

# To turn a multi-dimensional array into a one-dimensional array
multi_array = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
p multi_array.flatten

# Add and remove elements from the begining of arrays

# shift removes the first element in the array and return the removed element
# it permanently mutates the original array
a1 = ["a", "b", "c", "d", "e"]
p a1.shift
p a1 

# unshift adds a new element to the begining of the array and return the new array
a1.unshift("a2") 
p a1

# Drop the first 1 element
# return a new array without dropped elements
p a1.drop(1)
# The original array remains the same
p a1

# Convert a string to array of words
str = "Hello everyone, how is going everything?"
p str.split(' ')

# Convert an array onto a string sentence
arr = ["Hello", "everyone,", "how", "is", "going", "everything?"]
p arr.join(' ')

# Swap elements
a3 = ["Hello", "CodeCore", "Students"]
a3 = a3[1], a3[2], a3[0]
p a3
