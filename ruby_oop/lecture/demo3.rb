
require "./cookie.rb"
require "./car.rb"


cookie_1 = Cookie.new("cookie 1",10,40)
cookie_1.details
p cookie_1.sugar

p cookie_1.name

cookie_1.name = "Cookie One"
p cookie_1.name

p cookie_1.flour
# cookie_1.flour = 30 # It will give us error

car_1 = Car.new("Toyota", "CEDT", 4)

car_1.model = "New Model"
car_1.capacity = 2

p car_1.model
p car_1.capacity