# Include the HelperMethods module(from helper_methods.rb within the same directory as cat_and_bird.rb i.e. require_relative) to access the random_number method 
require_relative 'helper_methods'

# Define the Animal class with the name attribute and catch method
class Animal
  # Include the HelperMethods module in the Animal class to access the random_number method
  include HelperMethods

  # Define a getter method for the name attribute
  attr_reader :name

  # Initialize the Animal object with a name attribute
  def initialize(name)
    @name = name
  end

  # Define a method that allows the animal to catch a bird and print out a message
  def catch(bird, birds)
    if random_number(2) == 0
      # If the random number generated is 0, the animal missed the bird and this message is output
      puts "#{name} missed #{bird.name}!"
    else
      # If the random number generated is 1, the animal caught the bird and this message is output
      puts "#{name} caught #{bird.name} and ate it!"
      # Remove the caught bird from the birds array
      birds.delete(bird)
    end
  end
end

# Define the Cat class that inherits from Animal
class Cat < Animal
  # Initialize the Cat object with a name attribute
  def initialize(name)
    super(name)
  end
end

# Define the Bird class with the name attribute
class Bird < Animal
  # Define a getter method for the name attribute
  attr_reader :name

  # Initialize the Bird object with a name attribute
  def initialize(name)
    @name = name
  end
end

# Create 100 cats and 100 birds with random names
cats = []
birds = []

100.times do |i|
  # Append a new Cat object to the cats array with a random name
  cats << Cat.new("Cat#{i+1}")
  # Append a new Bird object to the birds array with a random name
  birds << Bird.new("Bird#{i+1}")
end

# Have each cat try to catch and eat a bird
cats.each do |cat|
  # Select a random bird from the birds array
  bird = birds.sample
  # Have the cat attempt to catch the selected bird
  cat.catch(bird, birds)
end



# ************************* Lab 3: Cat & Bird **************************

# [Lab] Cat & Bird

# Model the following in Ruby Classes & Objects: 
#The cat catches the bird and eats it

# Stretch
# 1. Use inheritance 
# 2: Give the cat and the bird names.
# 3: Make the chances of the cat catching the bird 50%.
# 4: Simulate having 100 cats trying to catch and eat 100 birds.
# 5: Create a module called HelperMethods in a separate file that has a method called `random_number`. 
#Include the module in your classes and use the `random_number` method if it makes sense.
