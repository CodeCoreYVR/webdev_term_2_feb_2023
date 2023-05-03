
* create a db for test environment.
```
createdb awesome_answer_test
```

* run migrate for test environment
```
rake db:migrate RAILS_ENV=test
```

* run seed for test environment
```
rake db:seed RAILS_ENV=test
```

* add rails controller testing to gemfile and run bundle
```
# Gemfile
gem 'rails-controller-testing'
```

* After running a test the database turns to the state it was before running the test.

* If `rspec-rails` is installed in our computer, it will generate a spec file. And, when we generate a model or a controller. A spec will be generated for that. For instance `rails g controller users` will generate `spec/controllers/users_controller_spec.rb`.

Check the documentation: https://rubydoc.info/gems/rspec-expectations

* If you'd like to generate a spec file for a controller that was generated already, you can run this in the console:
```
rails g rspec:controller users
```
For my system, it generates a file: spec/requests/users_spec.rb

* Let's write a unit test for Sign up page
```ruby
#users_spec.rb
require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe '#new' do
    it 'renders the sign up form' do
      get "http://127.0.0.1:3000/users/new"
      expect(response).to render_template(:new)
    end
  end
end
```
But if we use the `expect(response).to render_template(:new)` the test will fail. Check the error message.

* Check if user is created from create action in user controller.
```ruby
describe "#create" do
    it 'shows success message for sign up' do
      post("http://127.0.0.1:3000/users", params: { user: { first_name: 'John',
            last_name: 'Smith',
            email: 'john@smith.com',
            password: 'supersecret'
          }
      })
      expect(flash[:notice]).to eq("Signup is successful!")

      #expect(flash[:notice]).to eq("Signup is successful!!")
      #Failure/Error: expect(flash[:notice]).to eq("Signup is successful!!")
      # expected: "Signup is successful!!"
      # got: "Signup is successful!"
    end 
  end
```

* Check if redirection is working properly.
```ruby
it 'redirects to home page after signin' do
      post("http://127.0.0.1:3000/users", params: { user: { first_name: 'John',
            last_name: 'Smith',
            email: 'john@smith.com',
            password: 'supersecret'
          }
      })
      expect(flash[:notice]).to redirect_to(root_path)
    end
```

* Generate Factory for user
```
rails g factory_bot:model user
```

* Make sure to include all the valid attributes for that model. If the attribute has to be unique, then you can make use of FactoryBot's sequence which provides a number every time you call the factory so you can use that number to make the attribute unique as in:

```ruby
FactoryBot.define do
  factory :user do
    first_name 'John'
    last_name  'Smith'
    sequence(:email)  {|n| 'john-#{n}@smith.com' }
    password   'supersecret'
  end
end
```