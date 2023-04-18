# Define a class called FizzBuzz
class FizzBuzz
  # Create getter and setter methods for first_number and second_number attributes
  attr_accessor :first_number, :second_number

  # Constructor that takes two arguments and initializes first_number and second_number attributes
  def initialize(first_number, second_number)
    @first_number = first_number
    @second_number = second_number
  end

  # Define a method called run that returns an array of 100 elements
  def run
    # Use the map method to iterate from 1 to 100, and transform each element based on the following conditions
    (1..100).map do |num|
      if num % (first_number * second_number) == 0
        "fizzbuzz"
      elsif num % first_number == 0
        "fizz"
      elsif num % second_number == 0
        "buzz"
      else
        num
      end
    end
  end
end

# Create an instance of the FizzBuzz class with first_number 3 and second_number 5
fb = FizzBuzz.new(3, 5)
# Call the run method on the instance and print the result
fb.run.inspect # returns [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz", 11, "fizz", 13, 14, "fizzbuzz", 16, 17, "fizz", 19, "buzz", "fizz", 22, 23, "fizz", "buzz", 26, "fizz", 28, 29, "fizzbuzz", 31, 32, "fizz", 34, "buzz", "fizz", 37, 38, "fizz", "buzz", 41, "fizz", 43, 44, "fizzbuzz", 46, 47, "fizz", 49, "buzz", "fizz", 52, 53, "fizz", "buzz", 56, "fizz", 58, 59, "fizzbuzz", 61, 62, "fizz", 64, "buzz", "fizz", 67, 68, "fizz", "

# Change the values of first_number and second_number to 2 and 3, respectively
fb.first_number = 2
fb.second_number = 3
# Call the run method on the instance and print the result
puts fb.run.inspect



# ************************* Lab 3: FizzBuzz Class **************************

# [Lab] FizzBuzz Class

# Build a class called FizzBuzz that takes two numbers as parameters and then have a method called run that returns a fizzbuzz array (numbers from 1 to 100, numbers divisible by the first number replaced by 'fizz' and numbers divisible by the second number replaced by 'buzz' and numbers divisible by both replaced by 'fizzbuzz'). For instance this code should work with your class:
#   fb = FizzBuzz.new(3,5)
#   fb.run # returns an array like: [1, 2, 'fizz', 4, 'buzz, ...

# Now modify your solution to make it flexible and be able to change the numbers after you create the object. For instance:
#   fb = FizzBuzz.new(3,5)
#   fb.run # returns an array: [1, 2, 'fizz', 4, 'buzz, ...
#   fb.first_number = 2
#   fb.second_number = 3
#   fb.run # returns an array: [1, 'fizz', 'buzz', 'fizz', 5, 'fizzbuzz'...

