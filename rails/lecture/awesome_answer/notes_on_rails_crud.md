1. Generate the controller
```
rails g controller questions
```
It generates questions_controller and associated codes for the controller
```
 create  app/controllers/questions_controller.rb
      invoke  erb
      create    app/views/questions
      invoke  helper
      create    app/helpers/questions_helper.rb
```

2. Add the route to get the form for creating a new question
```
# in config/routes.rb
get "/questions/new" => "questions#new", as: :new_question
```

3. Add new action for the route
```
class QuestionsController < ApplicationController
    
    def new
        @question = Question.new
    end

end
```

4. Add the view for new question form
```
<%= form_for @question do |f| %>
  <div>
    <%= f.label :title %>
    <%= f.text_field :title %>
  </div>
  <div>
    <%= f.label :body %>
    <%= f.text_area :body %>
  </div>
  <%= f.submit %>
<% end %>
```

* <b>The form above will not work if we do not have any path for form action value.By default, the action=value attribute is action="question:
So we need to add the following route in routes.rb.</b>
```
post "/questions" => "questions#create", as: :questions #questions_path (_path is postfix)
```

* In 'manifest.js' if we don't have the directory available in our 'app', it will give use error.

5. Add the action for post request to create question in our application.
```
def create
        question_params = params.require(:question).permit(:title, :body)
        Question.create(question_params)
        # render text: "Question created successfully"
    end
```