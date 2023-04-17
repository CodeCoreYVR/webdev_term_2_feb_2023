require './mixins.rb'

class Cookie

    @@cookie_created = 0

    # It impletments both attr_reader and attr_writer
    attr_accessor :name
    # It does the following:
    # attr_reader :name
    # attr_writer :name

    #It is a getter
    attr_reader :flour
    # It does the following:
    # def flour
    #     @flour
    # end
    # attr_writer :flour
    # def flour=(new_amount)
    #     @flour = new_amount
    # end

    include HelperMethods
    def initialize(name = "Default", sugar = 10, flour = 12)
        # puts "I am initializing the cookie object"
        # Instance variable starts with @, it belongs to the instance of the class
        @name = name
        @sugar = sugar
        @flour = flour
        
        # Class variable starts with @@, it belongs to the class
        @@color = "Brown"
        
        # if @@cookie_created = nil
        #     @@cookie_created = 0 
        # else
            @@cookie_created += 1
        # end
    end

    def self.color
        @@color
    end

    def self.color=color
        @@color = color
    end

    def self.cookie_created
        puts "The number of cookie created: #{@@cookie_created}"
    end

    def sugar
        @sugar
    end

    def sugar=(sugar)
        @sugar = sugar
    end

    def details
        puts "#{@name} ===> Sugar: #{@sugar}, Flour: #{@flour}"
    end

    # Class method: It belongs to the class, not the object created from the class
    def self.info
        puts "I am Class for cookie. I have three methods in total"
    end

    # Instance methods: It can be called from the object created of this class, not from the class
    def eat
        bake
        puts "eating the cookie, and total cookie created is #{@@cookie_created}"
    end
    
    # Private method can only be call from inside the Class. In ruby, everything below the private keyword
    # would be considered as private.
    private
    def bake
        puts "Baking the cookie"
    end
end