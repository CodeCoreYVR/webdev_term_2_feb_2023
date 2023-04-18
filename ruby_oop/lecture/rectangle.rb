
class Rectangle
    
    attr_accessor(:width, :height)

    def initialize(width, height)
        @width = width
        @height = height
    end

    def area 
        width()*height() # it executes width() and height() method, then it mulitiplies
    end

    # def area
    #     @width * @height # it will mulitply between the instance variables
    # end


    def is_square?
        width == height
    end
end