require './cookieBag.rb'
require './oreo.rb'
require './car.rb'

# oreo_1 = Oreo.new("New oreo")

# p oreo_1.filling_type
# p oreo_1.sugar
# p oreo_1.flour

# oreo_1.filling_type = "Chocolate"

# p oreo_1.filling_type

# oreo_1.details
# oreo_1.eat

##################

cookie_bag = CookieBag.new
cookie_bag.add_cookie(Cookie.new)
    .add_cookie(Cookie.new("Named Cookie", 15, 40))
    .add_cookie(Cookie.new("Zeor sugar Cookie 2", 0, 40))
    .add_cookie("A string here....")

cookie_bag.details

cookie_bag.remove_cookie
cookie_bag.remove_cookie

cookie_bag.details


cookie_demo = Cookie.new("Named                        Cookie", 15, 40)
p cookie_demo.name_display

p Car.name_display