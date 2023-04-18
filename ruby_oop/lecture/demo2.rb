
require "./cookie.rb"
require "./car.rb"

cookie_1 = Cookie.new("cookie 1",10,40)
cookie_1.details
p cookie_1.sugar

cookie_2 = Cookie.new("cookie 2",20,40)

p Cookie.color
Cookie.color = "White"
p Cookie.color

cookie_1.sugar = 20
p cookie_1.sugar

cookie_0 = Cookie.new("Zero sugar cookie",0,40)
cookie_0.details
cookie_0.eat

p Cookie.cookie_created

car_1 = Car.new("Toyota", "CEDT", 4)
car_1.details

p $car_global