
require './cookie.rb'

class Oreo < Cookie
    
    attr_accessor :filling_type

    def initialize(name, sugar = 10, flour = 20, filling_type = "Milk")
        super(name, sugar, flour)
        @filling_type = filling_type
    end

end