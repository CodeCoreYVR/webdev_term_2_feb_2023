
1. Create the model for user
```ruby
rails g model user first_name:string last_name:string email:string:index password_digest:string_digest:string
```
Here, the email has been indexed because it will be used frequently for user login and others.
The command will generate the following files
```ruby
db/migrate/???????_create_users.rb
app/models/user.rb
```

2. User's email should be unique for signin and signup. Add unique option in migration file.
```ruby
# ???????_create_users.rb
add_index :users, :email, unique: true
```

3. In the user model the password is mentioned as plain text. For encrypted password, uncomment `gem "bcrypt"` from Gemfile and run `bundle`.

4. Call the `has_secure_password` method in the `User` model. This adds a few features to the model:

```ruby
class User < ApplicationRecord
  has_secure_password
  # ...
end
```

* Adds attribute accessors to the user model for `password` and `password_confirmation`
* Validates presence of `password` and password matching with `password_confirmation` if present
* Encrypts the `password` and stores it in password_digest using the `bcrypt` gem

For more details on this method checkout [this link](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password).

5. Run `rails db:migrate`

6. Create user in console, and find if it is valid.
```
[1] pry(main)> u1 = User.new(first_name:"Tony", last_name:"Stark",email:"tony@stark.com", password:"123",password_confirmation:"456")
=> #<User:0x00000206350bfa08 id: nil, first_name: "Tony", last_name: "Stark", email: "tony@stark.com", password_digest: "[FILTERED]", created_at: nil, updated_at: nil>
[2] pry(main)> u1.valid?
=> false
[4] pry(main)> u1.errors.full_messages
=> ["Password confirmation doesn't match Password"]
[7] pry(main)> u1 = User.new(first_name:"Tony", last_name:"Stark",email:"tony@stark.com", password:"123abc",password_confirmation:"123abc")
=> #<User:0x0000020637b48040 id: nil, first_name: "Tony", last_name: "Stark", email: "tony@stark.com", password_digest: "[FILTERED]", created_at: nil, updated_at: nil>
[8] pry(main)> u1.save
  TRANSACTION (0.6ms)  BEGIN
  User Create (3.2ms)  INSERT INTO "users" ("first_name", "last_name", "email", "password_digest", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id"  [["first_name", "Tony"], ["last_name", "Stark"], ["email", "tony@stark.com"], ["password_digest", "[FILTERED]"], ["created_at", "2023-04-26 04:53:56.686137"], 
["updated_at", "2023-04-26 04:53:56.686137"]]
  TRANSACTION (1.3ms)  COMMIT
=> true
```

7. Try to authenticate the user with password.
```
[9] pry(main)> u1.authenticate("123abc")
=> #<User:0x0000020637b48040
 id: 1,
 first_name: "Tony",
 last_name: "Stark",
 email: "tony@stark.com",
 password_digest: "[FILTERED]",
 created_at: Wed, 26 Apr 2023 04:53:56.686137000 UTC +00:00,
 updated_at: Wed, 26 Apr 2023 04:53:56.686137000 UTC +00:00>
[10] pry(main)> u1.authenticate("123abcd")
=> false
```

8. Seed a super user and run `rails db:seed`
```
#seeds.rb
super_user = User.create(first_name:"Tony", last_name:"Stark",email:"tony@stark.com", password:"123abc",password_confirmation:"123abc")
```

8. Run the following command to create the controller for user's signin and signout
```
rails g controller sessions new create destroy
``` 
and it will do the following:
```
      create  app/controllers/sessions_controller.rb
       route  get 'sessions/new'
              get 'sessions/create'
              get 'sessions/destroy'
      invoke  erb
      create    app/views/sessions
      create    app/views/sessions/new.html.erb
      create    app/views/sessions/create.html.erb
      create    app/views/sessions/destroy.html.erb
      invoke  helper
      create    app/helpers/sessions_helper.rb
```

9. Comment out the auto-generated routing with resource. 'resource' and 'resources' different method. Check rails documentation.
```ruby
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resource :sessions # it will implement all the methods/actions in the sessions controller
```

10. Change the root path of the application
```ruby
#routes.rb
root "welcome#index"
```

11. We implement the SessionsController as a standard Rails controller with two actions new and create. We utilize the @user.authenticate method which comes with the has_secure_password method. This method takes a password and hashes it the same way it was hashed the first time and compares the outcome with password_digest. If the outcome is the same it means that the user has entered the correct password so the method returns true. If the password is not the same then the method will return false. This is because we can’t go from password_digest to a clear-text password. We can only go one way with Hashing algorithms.

```ruby
# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_email params[:email]
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
  end
end
```
If the user is found and authenticated properly, we log in the user by setting a session key, :user_id

11. In `views/sessions/new.html.erb`, we use form_tag instead of form_for to create the session new form, because we’re not creating a model. We never implemented a Session model that stores to the database.
```
<!-- app/views/sessions/new.html.erb -->
<h1>Sign In</h1>

<%= form_tag sessions_path do %>
  <div>
    <%= label_tag :email %>
    <%= email_field_tag :email %>
  </div>
  <div>
    <%= label_tag :password %>
    <%= password_field_tag :password %>
  </div>
  <div>
    <%= submit_tag "Log In" %>
  </div>
<% end %>
```

12. Implement Signout
```ruby
# app/controllers/sessions_controller.rb
# ...
  def destroy
    session[:user_id] = nil
    redirect_to sessions_new_path
  end
end
```

13. Implement user controller with new and create action so that user can signup.
```
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Logged In!"
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
```

14. Add the routes
```
# config/routes.rb
resources :users, only: [:new, :create]
```

15. Implement the view
```
<!-- app/views/users/new.html.erb -->
<h1>Sign Up</h1>

<% if @user.errors.any? %>
  <ul>
    <% @user.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
  </ul>
<% end %>

<%= form_for @user do |f| %>
  <div>
    <%= f.label :first_name %>
    <%= f.text_field :first_name %>
  </div>
  <div>
    <%= f.label :last_name %>
    <%= f.text_field :last_name %>
  </div>
  <div>
    <%= f.label :email %>
    <%= f.email_field :email %>
  </div>
  <div>
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div>
    <%= f.label :password_confirmation %>
    <%= f.password_field :password_confirmation %>
  </div>
  <%= f.submit %>
<% end %>
```

16. Implement helper methods.
We'll implement a few controller methods that will help us use user authentication within our application. We'll put those methods in ApplicationController to make them accessible in all of our controllers.

We make the current_user and user_signed_in? helper methods by adding helper_method :current_user and helper_method :user_signed_in?, because we need to access those in the view files as well as controller files.
```
# app/controllers/application_controller.rb
  def authenticate_user!
    redirect_to new_sessions_path unless user_signed_in?
  end

  def user_signed_in?
    current_user.present?
  end
  helper_method :user_signed_in?

  def current_user
    @current_user ||= User.find_by_id session[:user_id]
  end
  helper_method :current_user
end
```

17. Add `authentiate_user!` in questions_controller.rb so that only authorized user can update, create and delete.
```
# app/controllers/questions_controller.rb
before_action :authenticate_user!, except: [:index, :show]
```

18. Add full name to user.
```
#app/models/user.rb
def full_name
  first_name + " " + last_name
end
```

19. Show login informaton
```
# app/views/layouts/application.erb
<% if user_signed_in? %>
  Hello <%= current_user.full_name %> | 
  <%= link_to "Logout", sessions_destroy_path %>
<% else %>
  <%= link_to "Login", new_sessions_path %> |
  <%= link_to "Sign Up", new_user_path %>
<% end %>
<hr>
```

20. Generate migration so that questions belongs to user and run `rails db:migrate`
```
rails g migration add_user_references_to_questions user:references
```

22. Add the reference to question model
```
# app/models/question.rb
belongs_to :user, optional: true
```
and for user.rb
```
has_many :questions
```

23. Add the referrences when question is created.
```
# app/controllers/questions_controller.rb

# ...
def create
  @question = Question.new question_params
  @question.user = current_user
# ...
```

24. Show user name for question
```
#...
<% if @question.user %>
    <small>Asked by: <%= @question.user.full_name %></small>
<% end %>
#...
```

25. Like question, answer will also belong to user.