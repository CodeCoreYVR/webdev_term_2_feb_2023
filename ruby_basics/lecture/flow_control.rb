puts "Enter the temperature:"
temp = gets.chomp.to_f

puts "It's cold" if temp < 10

puts "It's hot" unless temp < 30 # is equivalent to puts "It's hot" if temp >= 30

if temp < 15
    puts "COLD"
elsif temp > 15 && temp < 25
    puts "Normal"
else
    puts "Hot"
end

puts "What is the manufacture year of your car?"
year = gets.to_i

puts 'Future' unless year < 2022
puts "New" unless year != 2021
# i.e. year 2025
# (year < 2010) || (year > 2020)
# false || true
# true 
# unless true does not run
# i.e. year 2015
# (year < 2010) || (year > 2020)
# false || false
# false 
# unless false does run
puts "Old" unless (year < 2010) || (year > 2020) # 2010 - 2020
puts "Very Old" unless year > 2009

###################

