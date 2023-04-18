
require "./cookie.rb"
require "./car.rb"

# Class method belongs to the class, not the object made from the class
cookie1 = Cookie.new
# cookie2 = Cookie.new

p cookie1.class

#cookie1.bake # private method `bake' called for #<Cookie:0x00000126d71eada8> (NoMethodError)
cookie1.eat

# cookie2.bake
# cookie2.eat

car1 = Car.new()

car1.info()
car1.start()

car1.drive
car1.stop
car1.park
# car1.max_speed # No method error

p car1.class

# car2 = Car.new()

# car2.info()
# car2.start()

# car2.drive
# car2.stop
# car2.park


Cookie.info

# cookie_x = Cookie.new
# cookie_x.info #  undefined method `info' for #<Cookie:0x000001c8f7bde928> (NoMethodError)

p Car.max_speed