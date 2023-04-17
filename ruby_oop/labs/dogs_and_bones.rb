# Define the Bone class
class Bone
  # define a reader for the size attribute
  attr_reader :size 

  def initialize(size)
    # assign the size parameter to the instance variable @size
    @size = size 
  end
end

# Define the Dog class
class Dog
  # define readers for the color, type, and bones attributes
  attr_reader :color, :type, :bones 

  def initialize(color, type)
    # assign the color parameter to the instance variable @color
    @color = color 
    # assign the type parameter to the instance variable @type
    @type = type
    # initialize an empty array to store the dog's bones 
    @bones = [] 
  end

  def give(bone)
    # check if the dog already has three bones
    if @bones.size >= 3 
      puts "I have too many bones"
    else
      # add the bone to the dog's array of bones
      @bones << bone 
      puts "Bone added to the collection"
    end
  end

  def eat_bone
    # check if the dog has any bones to eat
    if @bones.empty? 
      puts "No bones to eat"
    else
      # remove the last bone from the dog's array of bones
      bone = @bones.pop 
      # print a message indicating the size of the bone that was eaten
      puts "Yummy! I ate a '#{bone.size}' bone" 
    end
  end
end

# Create a Dog object and add some bones to it
dog = Dog.new("brown", "Labrador")
bone1 = Bone.new("small")
bone2 = Bone.new("medium")
bone3 = Bone.new("large") 
bone4 = Bone.new("extra large")

dog.give(bone1) # This will print "Bone added to the collection"
dog.give(bone2) # This will print "Bone added to the collection"
dog.give(bone3) # This will print "Bone added to the collection"
dog.give(bone4) # This will print "I have too many bones"
dog.eat_bone # This will print "Yummy! I ate a 'large' bone"
dog.give(bone4) # This will print "Bone added to the collection"
dog.eat_bone # This will print "Yummy! I ate a 'medium' bone"
dog.eat_bone # This will print "Yummy! I ate a 'small' bone"
dog.eat_bone # This will print "No bones to eat"




# ************************* Lab 2: Dogs & Bones **************************

# [Lab] Dogs & Bones

# 1. Make two classes dog and bones. The dog class must have an initialize method that takes dog's colour and type. The bone must have an initialize method that assigns a size for the bone.
# 2. The dog class must have a give method that takes a bone object and adds it to an array of bones for the dog. The dog can take a maximum of three bones so if you give it more than three it will will print, I have too many bones.
# 3. The dog class must have an eat bone method so that when you call it it removes a bone from the array of bones and prints "yummy! I ate 'big' bone" the 'big' part comes from the size attribute of bone.
