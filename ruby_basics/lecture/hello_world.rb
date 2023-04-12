
puts "How many times?"
times_to_print = gets.chomp.to_i
i = 0

while i < times_to_print
    puts "Hello world!"
    i += 1
end

puts "------------------------------"

for num in 1..times_to_print
    puts num.to_s + "--> Hello World!"
end

puts "------------------------------"

# for num in (0..100).step(5)
#     puts num
# end