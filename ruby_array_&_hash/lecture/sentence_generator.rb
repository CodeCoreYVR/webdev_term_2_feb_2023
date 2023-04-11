a = [
    ['john', 'steve', 'jen'],
    ['ate', 'sat on', 'brought'],
    ['an apple', 'the couch', 'a toothbrush']
]

words =a.map do |element|
    element.sample
end

sentence = words.join(' ')
puts sentence