class Animal
  # Attribute accessors for name and color
  attr_accessor :name, :color
  
  # If no arguments are passed when creating an instance of a class with its own constructor, 
  # the instance variables will be set to nil by default. However, if a child class uses its 
  # parent's constructor but does not pass arguments, the parent's constructor must have default 
  # values for its arguments, otherwise an error will occur.
  def initialize(name = nil, color = nil)
    # Constructor that sets the name and color instance variables
    @name = name
    @color = color
  end
  
  # Method that prints "I'm eating"
  def eat
    puts "I'm eating"
  end
  
  # Method that prints "I'm walking"
  def walk
    puts "I'm walking"
  end
end

# Dog class that inherits from Animal
class Dog < Animal
  # Method that returns "woof"
  def bark
    return "woof"
  end
  
  # Override the eat method to print what Animal's eat method prints and "Bones are yummy!"
  def eat
    super # Call the Animal's eat method
    puts "Bones are yummy!"
  end
end

# Cat class that inherits from Animal
class Cat < Animal
  # Override the eat method to print "Fish is yummy!"
  def eat
    puts "Fish is yummy!"
  end
end

# Creating a dog object and calling its methods
dog = Dog.new("Fido", "Brown")
# Works with no arguments, because the initialize method sets the name and color to nil
dog2 = Dog.new
puts dog.name # Output: "Fido"
puts dog.color # Output: "Brown"
dog.eat # Output: "I'm eating" and "Bones are yummy!"
dog.walk # Output: "I'm walking"
puts dog.bark # Output: "woof"
dog2.name = "Spot" # Output: "Spot"
dog2.color = "Black" # Output: "Black"
puts dog2.eat # Output: "I'm eating" and "Bones are yummy!"

# Creating a cat object and calling its methods
cat = Cat.new("Whiskers", "Grey")
puts cat.name # Output: "Whiskers"
puts cat.color # Output: "Grey"
cat.eat # Output: "Fish is yummy!"
cat.walk # Output: "I'm walking"



# **************************** Lab 1: Animals ****************************

# [Lab] Animals

# 1. Build a class Animal that has two methods: "eat" that prints "I'm eating" and "walk" that prints "I'm walking". Make the class have two attribute accessors: name and color. Make the initialize method set those two variables.
# 2. Now build a class called Dog that inherits from the Animal class. Add a new method to this class called bark that returns woof. Override the eat methods and make it print whatever the Animal class eat method prints and then print "Bones are yummy!".
# 3. Now build a class called Cat that inherits from the Animal class. Override the eat methods and make it print "Fish is yummy!".
