def triangle
  # Prompt the user to enter a number and read the input from the user
  print "Enter a number\n> "
  number = gets.chomp.to_i

  # Print the header for the ASCII triangle
  puts "\nASCII triangle with #{number} layers:"
  
  # Loop through each layer of the triangle, from 1 to the user input number
  for n in 1..number
    # Print each layer of the triangle with the appropriate spacing and "O" characters
    puts "> #{n} #{' ' * (number - n)}#{"O " * n}"
  end
end

triangle



# ******************** [Lab] ASCII Triangle ********************

# [Lab] ASCII Triangle

# Write a method that takes a number N and then draw a triangle that has N number of letter O on each of its sides. For example given the number 5 your will get something like:
# 1     O
# 2    O O
# 3   O O O
# 4  O O O O
# 5 O O O O O 