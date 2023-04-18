arr =[[1, 7, 3], [4, 4, 6], [7, 2, 9]]

arr.each do |sub_array|
    sub_array.each do |element|
        puts element * element
    end
end