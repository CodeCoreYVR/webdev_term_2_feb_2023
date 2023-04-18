# Similar symbol will not create new instance. Instead, it refer the previous value
# As a result, object id is different for both strings despite being same, but similar for both symbols
puts "hello".object_id
puts "hello".object_id 
puts :hello.object_id
puts :hello.object_id

#symbol is denoted with colon in fornt :im_a_symbol
#symbols are immutable 

#we can convert a string into a symbol
puts "hello".to_sym 

#we can convert a symbol into a string
puts :hello.to_s 
puts :hello.intern

#writing a symbol
:i_am_symbol
# :i-am-not-a-symbol => invalid
# :i am not a symbol => invalid
# :'i am not a symbol' => valid but not good practises

var = :i_am_symbol
puts

#Hash that stores personal information
personal = {
    :name => 'John',
    :job => 'Developer',
    :track => 'Web'
}

# Another way of declaring hash where all keys are symbols
personal = {
    name: 'John',
    job: 'Developer',
    track: 'Web'
}


puts personal[:name]

