
#Method is a function that belongs to an object. 
p 44.class()
p "Hello world".class()
p 5.5.is_a?(Float)

# ----------------

# Use 'def' keyword to define a method
# def name_of_the_method arguments 
# here parenthesis is optional
def multiply a,b
    # if return keyword is not mentioned in a method the last expression will be considered as return
    a*b
end

# here parenthesis is optional
p multiply 4, 7

#------------
def multiply(a,b)
    # if return keyword is not mentioned in a method the last expression will be considered as return
    return a*b
end

# here parenthesis is optional
p multiply(4, 7)

#----------divisible by five

# For ruby, if a method return boolean we should add '?' at the end of method name
def by_five? number
    number % 5 == 0
end

p by_five? 15
p by_five? 22
p by_five? 20.0
p by_five? 20.2

# ---------- what is it

def what_is_it(obj)
    if(obj.is_a?(String)) 
        return "String"
    end
    if(obj.is_a?(Integer))
        return "Integer"
    end
    if(obj.is_a?(Array))
        return "Array"
    end
    "Something Else"
end

def what_is_it2 obj
    return obj.class.to_s if([String, Integer, Array].include?(obj.class))
    "Something Else"
end

p what_is_it(5)
p what_is_it("Hello world!")
p what_is_it([2,4,6,8])
p what_is_it(3.1416)

#------------------ Returning early

def demo_method
    3
    5
    return [2,4]
    "Hello"
end

p demo_method

def demo_multiply a,b
    return a*b
    # Following expression will never be executed
    a + b
end

p demo_multiply 4,5