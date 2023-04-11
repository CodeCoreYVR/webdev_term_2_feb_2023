# Print numbers from 50 to 15 using downto
def print_numbers
  puts "Printing numbers from 50 to 15 using downto:"
  50.downto(15) do |num|
    puts num
  end
  puts "\n"
end

# Print letters from "B" to "O" using upto
def print_letters
  puts "Printing letters from B to O using upto:"
  "B".upto("O") do |letter|
    puts letter
  end
  puts "\n"
end

# Call the print_numbers and print_letters methods
print_numbers
print_letters


# ******************** [Exercise] Use Upto and Downto ********************

# Write the numbers from 50 to 15 using downto
# Write the letters from "B" to "O" using upto