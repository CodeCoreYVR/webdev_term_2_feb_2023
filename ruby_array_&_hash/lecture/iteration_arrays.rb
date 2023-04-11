# iteration through elements of an array

arr = ['a', 'b', 'c', 'd']

for element in arr do
    # puts element
end


arr2 = [1, 2, 3, 4, 5, 6, 7]

# .each

arr2.each do |x|
    # puts x
end

arr3 = [1, 2, 3, 4, 5]

arr3.each do |element|
    y = element * 2
    # puts y
end
# puts arr3

# .map

arr4 = [1, 2, 3, 4, 5]
new_arr = arr4.map do |element|
    element * 2
    # puts y
end
puts new_arr