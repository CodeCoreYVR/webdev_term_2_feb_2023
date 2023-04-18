names = []

while name = gets.chomp
    if name == "exit"
        break
    else 
        names << name 
    end
end

names.each do |name|
    puts name.capitalize 
end

