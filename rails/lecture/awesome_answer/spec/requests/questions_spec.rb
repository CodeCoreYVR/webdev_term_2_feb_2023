require 'rails_helper'

RSpec.describe "Questions", type: :request do
  
  describe "#index" do
    it 'renders list of questions' do
      get "http://127.0.0.1:3000/questions"
      expect(response).to render_template(:index)
    end
  end

  describe "#new" do
    
    it 'redirects to signin page' do
      get "http://127.0.0.1:3000/questions/new"
      expect(response).to redirect_to(sessions_new_path)
    end

    it 'renders new question page' do
      user1 = User.create(first_name: 'John',
        last_name: 'Smith',
        email: 'john@smith.com',
        password: 'supersecret')
      
      post "http://127.0.0.1:3000/sessions", params: {
        email: 'john@smith.com',
        password: 'supersecret'
      }
      
      get "http://127.0.0.1:3000/questions/new"
      expect(response).to render_template(:new)
    end
  end

end
