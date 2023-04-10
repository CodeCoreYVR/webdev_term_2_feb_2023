
puts "Enter your score:"
score = gets.chomp.to_f

puts "A" if score >= 90
puts "B" if score >= 80 && score < 90
puts "c" if score >= 70 && score < 80
puts "D" if score >= 60 && score < 70
puts "F" if score < 60
