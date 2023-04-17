# Object containing a hash of temperatures in Celsius
average_temperature_in_c = {
  vancouver: 13.7, 
  edmonton: 8.5, 
  Calgary: 10.5
}

# Method that takes a hash and returns a new hash with the same keys and values, except the values are converted to Fahrenheit and rounded to 1 decimal place
average_temperature_in_f = average_temperature_in_c.transform_values { |c| (c * 9/5 + 32).round(1) }
# Method that takes a hash and returns a new hash with the same keys and values, except the values are converted to Celsius and rounded to 1 decimal place
average_temperature_in_c = average_temperature_in_f.transform_values { |f| ((f - 32) * 5/9).round(1) }

# Call the method and display the results
puts average_temperature_in_f # Output ~> {:vancouver=>56.66, :edmonton=>47.3, :Calgary=>50.9}
puts average_temperature_in_c # Output ~> {:vancouver=>13.7, :edmonton=>8.5, :Calgary=>10.5}

# **************************** Exercise *****************************

# [Exercise] Temperature Conversion

# Given a hash of average temperatures:
#   average_temperature_in_c = {vancouver: 13.7, edmonton: 8.5, Calgary: 10.5}

# Create another hash called average_temperature_in_f that has the same keys (city names) but the temperatures are in Fahrenheit instead of Celsius.

# The formula to convert Celsius to Fahrenheit is: F = C * 9/5 + 32
