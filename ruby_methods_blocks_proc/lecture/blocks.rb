
# block is similar to anonymous function

def test_method(name = "")
    result = "It is the result a api call"
    puts "I am from method"
    # yield executes the block provided to a method
    yield(name) if block_given? # block_given? checks if the block is provided to the methad during calling
    yield(result) if block_given?
end

test_method("Ayaka") do |result|
    puts "Hello, #{result}"
end

test_method("Keerat") { |result| puts "Hello, #{result}" }

test_method() { |res| 
    x = "#{res} by test method" + " Do something more with the result";
}

def each(array)
    for item in array
        yield(item) if block_given?
    end
end

each([1,2,3,4]) { |x|  
    num = x*10
    print num.to_s + ","
}

each([1,2,3,4,5,6,7,8,9]) { |x|
    is_even = x % 2 == 0 
    p "#{x} is even: #{is_even}"
}


def filter(array)
    result = []
    for item in array
        if block_given?
            if yield(item)
                result << item
            end
        end
    end
    result
end


result_arr = filter([1,2,3,4,5,6,7,8,9]) { |x| x.even? }
p result_arr

result_arr = filter([1,2,3,4,5,6,7,8,9]) { |x| x % 3 == 0 }
p result_arr

def map(array)
    result = []
    for item in array
        result_item = yield(item)
        result << result_item
    end
    result
end


result_arr = map([1,2,3,4,5,6,7,8,9]) { |x| x*10 }
p result_arr

result_arr = map([1,2,3,4,5,6,7,8,9]) { |x| 
    "Hello, #{x}"
}
p result_arr