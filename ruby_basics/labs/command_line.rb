def quiz
  # Initialize a variable to keep track of the number of correct answers.
  correct = 0
  
  # Define an array of arrays, with each nested array representing a question and its options and correct answer
  questions = [
    ["What is the file extension for a Ruby file?", ["1. .html", "2. .css", "3. .rb", "Enter the correct number:"], 3], # the first question has three options, with option 3 being the correct answer
    ["What is the method used to output text to the console in Ruby?", ["1. puts", "2. gets", "3. print", "Enter the correct number:"], 1], # the second question has three options, with option 1 being the correct answer
    ["What is the keyword used to define a new class in Ruby?", ["1. class", "2. def", "3. module", "Enter the correct number:"], 1] # the third question has three options, with option 1 being the correct answer
  ]

  # Loop through each question in the questions array.
  questions.each do |question|
    # Print the current question and answer choices.
    puts question[0]
    puts question[1]
    
    # Get the user's answer and check if it's correct.
    answer = gets.chomp.to_i
    if answer == question[2]
      puts "Correct!\n\n"
      correct += 1
    else
      puts "Wrong!\n\n"
    end
  end
  
  # Calculate the percentage of correct answers and output the result.
  percent = (correct / questions.length.to_f) * 100
  puts "You scored #{percent.round}%, you got #{correct} out of #{questions.length} questions correctly."
end

# ******************** version 2 ********************

# def quiz
#   # Initialize a variable to keep track of the number of correct answers.
#   correct = 0;
  
#   # Ask the first question and get the user's answer.
#   puts "What is the file extension for a Ruby file?\n1. .html\n2. .css\n3. .rb\nEnter the correct number:\n"
#   answer = gets.chomp
  
#   # Check if the user's answer is correct and provide feedback.
#   if answer == "3"
#     puts "Correct!"
#     correct += 1
#   else
#     puts "Wrong!"
#   end
  
#   # Ask the second question and get the user's answer.
#   puts "\nWhat is the method used to output text to the console in Ruby?\n1. puts\n2. gets\n3. print\nEnter the correct number:\n"
#   answer = gets.chomp
  
#   # Check if the user's answer is correct and provide feedback.
#   if answer == "1"
#     puts "Correct!"
#     correct += 1
#   else
#     puts "Wrong!"
#   end
  
#   # Ask the third question and get the user's answer.
#   puts "\nWhat is the keyword used to define a new class in Ruby?\n1. class\n2. def\n3. module\nEnter the correct number:\n"
#   answer = gets.chomp
  
#   # Check if the user's answer is correct and provide feedback.
#   if answer == "1"
#     puts "Correct!"
#     correct += 1
#   else
#     puts "Wrong!"
#   end
  
#   # Calculate the percentage of correct answers and output the result.
#   percent = (correct / 3.0) * 100
#   puts "\nYou scored #{percent.round}%, you got #{correct} out of 3 questions correctly."
# end


# Call the quiz function to execute the code
quiz



# ******************** [Lab] Command Line ********************

# Build a command line quiz where it prompts the user with a three questions like:
# How many sides does a hexagon have?
# 1- five
# 2- six
# 3- seven

# Enter the correct number:
# The user can then enter the correct number of the question.

# At the end it will display:
# You scored 66%, you got 2 out of 3 questions correctly.
