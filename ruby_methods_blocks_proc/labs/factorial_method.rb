# Defining a method that returns the factorial value of a number
def factorial(n)
  # If n is less than or equal to 1, return 1
  if n <= 1
    1
  else
    # Otherwise, return the product of n and the factorial of n - 1
    n * factorial(n - 1)
  end
end

p factorial(0)   # Returns ~> 1
p factorial(1)   # Returns ~> 
p factorial(5)   # Returns ~> 120
p factorial(10)  # Returns ~> 3628800



# ******************************* Lab *******************************

# [Exercise] Factorial method

# Write a method factorial that takes one argument and returns the factorial value of that number. In math, factorial for a number n is the product of the numbers from 1 to the number n. For instance, factorial for 5 will be: 5 * 4 * 3 * 2 * 1.
