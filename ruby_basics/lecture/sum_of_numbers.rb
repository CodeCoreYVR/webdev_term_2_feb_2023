

sum = 0;

loop do
    puts "Enter the number or, type 'exit' to close"
    input = gets.chomp
    break if input == "exit"
    sum += input.to_f
end
puts "Sum: " + sum.to_s


# for num in (0..100).step(5)
#     puts num
# end
