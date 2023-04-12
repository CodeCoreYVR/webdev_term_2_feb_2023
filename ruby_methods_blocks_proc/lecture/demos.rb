def minimum_number(*args)
    acc = args.reduce { |accumulator, next_item|
        if accumulator > next_item
            next_item
        else
            accumulator
        end
    }
end

p minimum_number 100, 24,2,3,4