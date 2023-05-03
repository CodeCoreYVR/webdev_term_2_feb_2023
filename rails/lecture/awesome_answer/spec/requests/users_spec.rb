require 'rails_helper'

RSpec.describe "Users", type: :request do
  
  describe '#new' do
    it 'renders the sign up form' do
      get "http://127.0.0.1:3000/users/new"
      expect(response).to render_template(:new)
      # expect(response).to render_template(:edit)
    end
  end

  describe "#create" do

    it 'shows success message for sign up' do
      post("http://127.0.0.1:3000/users", params: { user: { first_name: 'John',
            last_name: 'Smith',
            email: 'john@smith.com',
            password: 'supersecret'
          }
      })
      expect(flash[:notice]).to eq("Signup is successful!")

      # expect(flash[:notice]).to eq("Signup is successful!!")
      # Failure/Error: expect(flash[:notice]).to eq("Signup is successful!!")
      # expected: "Signup is successful!!"
      # got: "Signup is successful!"
    end

    it 'redirects to home page after signin' do
      post("http://127.0.0.1:3000/users", params: { user: { first_name: 'John',
            last_name: 'Smith',
            email: 'john@smith.com',
            password: 'supersecret'
          }
      })
      expect(response).to redirect_to(root_path)
    end

    it 'shows new page for invalid informaton' do
      post("http://127.0.0.1:3000/users", params: { user: { first_name: nil,
            last_name: 'Smith',
            email: nil,
            password: 'supersecret'
          }
      })
      expect(response).to render_template(:new)
    end
  end
end
