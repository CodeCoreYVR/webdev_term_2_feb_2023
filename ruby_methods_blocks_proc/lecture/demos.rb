def name(first: "First name", last: "Last name")
    "#{first}  #{last}"
end

# it gives error
# name("I", "U")

p name(first: "I", last:"U")
p name

def hash(hash)
    p hash[:a]
    p hash[:b]
end

hash a:1, b:2

method_name = "Three"

define_method(method_name) do 
    p eval("3*3+4")
end

Three()