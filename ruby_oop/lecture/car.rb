require './mixins.rb'


class Car

    $car_global = "hello car"

    attr_accessor(:model, :type, :capacity, :name)
    # It does the following:
    # attr_accessor :model
    # attr_accessor :type
    # attr_accessor :capacity

    extend HelperMethods

    def initialize model, type, capacity, name = "No Name"
        @model = model
        @type = type
        @capacity = capacity
    end

    def details
        puts "Model: #{@model}, Type: #{@type}, Capacity: #{@capacity}"
    end

    def self.max_speed
        200
    end

    def info
        puts "I am a 🚗"
    end

    def start
        pump_gas
        puts "I am starting 🔥🔥"
    end

    def drive
        ignite
        puts "Driving the car 🚗💨"
    end

    def stop
        puts "Stoping the car"
    end

    def park
        puts "Parking the car"
    end

    private
    def pump_gas
        puts "Pumping gas to car"
    end

    def ignite
        puts "Igniting the engine 🔥🔥"
    end
end