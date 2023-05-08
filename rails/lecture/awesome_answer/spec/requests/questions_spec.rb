require 'rails_helper'

RSpec.describe "Questions", type: :request do
  
  include CommonHelpers
  include SessionHelpers

  describe "#index" do
    it 'renders list of questions' do
      get "/questions"
      expect(response).to render_template(:index)
    end
  end

  describe "#new" do
    
    it 'redirects to signin page' do
      get "/questions/new"
      expect(response).to redirect_to(sessions_new_path)
    end

    it 'renders new question page' do
      user1 = User.create(valid_user)
      login(valid_user)
      get "/questions/new"
      expect(response).to render_template(:new)
    end
  end

end
