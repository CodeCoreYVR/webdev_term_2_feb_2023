# Set the value of degrees to 90
degrees = 90

# Define a method that converts degrees to radians
def degrees_to_radians(deg)
  # Calculate the value of radians by multiplying degrees by pi/180
  # Math::PI is a built-in constant in Ruby that represents the value of pi
  radian = deg * (Math::PI / 180)

  # Print out the value of radian
  puts radian

  # Return the value of radian
  return radian
end

# Call the degrees_to_radians method with the degrees variable as an argument
degrees_to_radians(degrees)


# ******************** [Exercise] Easy as PI ********************

# [Exercise] Easy as PI

# Find out how to get PI in Ruby and then write a formula using that to convert degrees to radian.