movies_with_directors = {
    "Fast and Furious" => "Vin Diesel",
    "Titanic" => "James Cameron",
    "Top Gun" => "Tony Scott"
}

puts movies_with_directors

movies_with_directors.each do |key, values|
    puts "#{key}: #{values}"
end