# This function prints numbers from 10 to 20 using a for loop with a range
# that includes the last value using three dots
def three_dots
  puts "Using three dots:"
  for i in 10...21 # <--- notice the three dots and the 21
    puts "> #{i}"
  end
end

# This function prints numbers from 10 to 20 using a for loop with a range
# that excludes the last value using two dots
def two_dots
  puts "\nUsing two dots:"
  for i in 10..20 # <--- notice the two dots and the 20
    puts "> #{i}"
  end
end

# Call the three_dots and two_dots methods to execute the code
three_dots
two_dots



# ******************** [Exercise] Print 10 to 20 Using for Loop ********************

# Print 10 to 20 using a for loop in two ways:
# 1- using range with three dots
# 2- using range with two dots