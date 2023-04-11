


grades = {
    "john doe" => 10,
    "jim carter" => 5,
    "list" => 12,
    7 => "num",
    "7" => :num,
    :lex => 56 
}

puts grades["7"]

grades["7"] = "seven" 
puts grades["7"]
puts grades

# Method
#return all the keys of a hash as an array

# .keys
puts grades.keys

#return all the values of a hash as an array

# .keys
puts grades.values

