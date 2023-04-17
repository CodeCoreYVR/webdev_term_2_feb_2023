
require './rectangle.rb'

rect_1 = Rectangle.new(20,40)

p rect_1.area
p rect_1.is_square?

p "----Changing the height------"
rect_1.height = 20

p rect_1.area
p rect_1.is_square?

