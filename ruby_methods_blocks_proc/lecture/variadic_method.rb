
# *args is similar to javascript ...args

def log *args
    for item in args
        p item
    end
end

log 4, 4.5, "Hello world", [2,5,6,7]


def log2 first, *args, last
    p "----First: #{first}"
    p "----args: #{args}"
    p "----last: #{last}"
end

log2 4, 4.5, "Hello world", [2,5,6,7], 100

#--------Reduce with bloack Variadic Method 

def product(*args)
    args.reduce(1) do |accumulator, item|
        puts "acc: #{accumulator}, next: #{item}"
        accumulator * item
    end
end

p product 2,3,4



def product_exercise(first_number, *args)
    acc = args.reduce(1) do |accumulator, item|
        accumulator * item
    end
    acc * first_number
end

p product_exercise 2,3,4


def product_exercise2(first_number, *args)
    result = first_number
    args.each do |num|
        result = result * num
    end
    result
end

p product_exercise2 2,3,4

def minimum_number(*args)
    acc = args.reduce do |accumulator, next_item|
        if accumulator > next_item
            next_item
        else
            accumulator
        end
    end
end

def minimum_number2(*args)
    acc = args.reduce { |accumulator, next_item|
        if accumulator > next_item
            next_item
        else
            accumulator
        end
    }
end

p minimum_number 100, 24,2,3,4