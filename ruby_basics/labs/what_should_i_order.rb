# Define a method to take user's coffee order based on the coffee shop they choose
def coffee_order
  # Prompt user to enter the coffee shop
  puts "Enter the coffee shop:"
  # Get user input and convert it to lowercase
  shop = gets.chomp.downcase

  # Use a case statement to match the user input to a coffee shop
  order = case shop
    # If the user entered "starbucks"
    when "starbucks"
      # Set the order to "Grande Latte"
      "Grande Latte"
    # If the user entered "tim hortons"
    when "tim hortons"
      # Set the order to "Double Double"
      "Double Double"
    # If the user entered "blenz"
    when "blenz"
      # Set the order to "Medium Coffee"
      "Medium Coffee"
    # For any other input
    else 
      # Set the order to "I don't know this shop"
      "I don't know this shop"
    end

  # Print out the order suggestion for the user
  puts "\nYou should order:" 
  puts order
end

# Call the method to start the coffee ordering process
coffee_order



# ******************** [Exercise] What Should I Order? ********************

# Using case / when statements ask user to enter the coffee shop they want to order from and then print: "Grande Latte" if they enter Starbucks and "Double Double" if they enter "Tim Hortons" and "Medium Coffee" if they enter Blenz and "I don't know this shop" if they enter something else. 