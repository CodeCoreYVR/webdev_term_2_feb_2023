# This method prints the first x prime numbers
def prime_numbers
  # Ask the user for the number of prime numbers they want to print
  puts "How many prime numbers?"
  x = gets.chomp.to_i

  # Initialize an empty array to store the prime numbers
  primes = []
  # Start checking for prime numbers at 2
  num = 2

  # This method returns true if a given number is prime, false otherwise
  def is_prime?(n)
    # A number less than 2 is not prime
    return false if n < 2
    
    # Check if n is divisible by any number from 2 to the square root of n
    (2..Math.sqrt(n)).each do |i|
      # If n is divisible by i, it is not prime
      return false if n % i == 0
    end
    
    # If n is not divisible by any number from 2 to the square root of n, it is prime
    true
  end

  # Loop until we have found x prime numbers
  while primes.length < x
    # If the current number is prime, add it to the primes array
    primes << num if is_prime?(num)
    # Move on to the next number
    num += 1
  end

  # Print out the first x prime numbers
  puts "\nThe first #{x} prime numbers are:\n" + primes.join(" ")
end

# Call the prime_numbers method
prime_numbers



# ******************** [Lab] Prime Numbers ********************

# [Lab] Prime Numbers

# Ask the user for a number x and then print the first x prime numbers.
# Prime numbers are divisible only by 1 and themselves.
# https://en.wikipedia.org/wiki/Prime_number

# Example
# ruby prime_numbers.rb
# > "How many prime numbers?"
# > 5

# should print out:
# > 1 2 3 5 7