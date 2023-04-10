
for num in 1..100
    if num % 5 == 0 && num % 3 == 0
        puts "FIZZBUZZ"
    elsif num % 3 == 0
        puts "FIZZ"
    elsif num % 5 == 0
        puts "BUZZ"
    else
        puts num
    end
end

10.times{puts 'Hello world'}