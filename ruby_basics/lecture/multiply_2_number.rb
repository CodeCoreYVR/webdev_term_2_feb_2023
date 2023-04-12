puts "Enter 1st number"
a = gets.chomp

puts "Enter 2nd number"
b = gets.chomp

c = a.to_f * b.to_f

if( c > 10)
    puts "#{c} is greater than 10";
else
    puts "#{c} is equal or less than 10"
end

puts c