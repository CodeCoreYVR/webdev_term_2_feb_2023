
i = 1
while i < 51
    puts i
    i += 1
end

i = 1
counter = 0
while counter < 30 
    if i % 2 != 0
        puts counter.to_s + " ----> " + i.to_s
        counter += 1
    end
    i += 1
end

i = 1
counter = 0
until counter >= 30 
    if i % 2 != 0
        puts counter.to_s + " ----> " + i.to_s
        counter += 1
    end
    i += 1
end