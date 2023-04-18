sentence = gets.chomp

words = sentence.split(' ')

new_words = words.map.with_index do |word, index|
    if index % 2 == 0
        word.upcase
    else 
        word.downcase
    end
end

new_sentence = new_words.join(' ')
puts new_sentence