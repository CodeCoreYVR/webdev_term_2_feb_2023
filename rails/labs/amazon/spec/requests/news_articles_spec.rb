# This file is a Rails test file for the NewsArticlesController
require 'rails_helper'

# RSpec is the testing framework being used here
RSpec.describe NewsArticlesController, type: :controller do
  # The first group of tests is for the 'new' action in the controller
  describe 'GET #new' do
    # This test checks if the 'new' action renders the correct template
    it 'renders the new template' do
      get :new
      expect(response).to render_template(:new)
    end

    # This test checks if the 'new' action assigns a new instance of NewsArticle to @news_article
    it 'assigns a new instance of NewsArticle to @news_article' do
      get :new
      expect(assigns(:news_article)).to be_a_new(NewsArticle)
    end
  end

  # The second group of tests is for the 'create' action in the controller
  describe 'POST #create' do
    # This context block tests the behavior of the 'create' action with valid attributes
    context 'with valid attributes' do
      let (:valid_attributes) { attributes_for(:news_article) }

      # This test checks if the 'create' action creates a new NewsArticle with valid attributes
      it 'creates a new NewsArticle' do
        expect {
          post :create, params: { news_article: valid_attributes }
        }. to change(NewsArticle, :count).by(1)
      end
    end

    # This context block tests the behavior of the 'create' action with invalid attributes
    context 'with invalid attributes' do
      let (:invalid_attributes) { attributes_for(:news_article, title: nil) }

      # This test checks if the 'create' action does not create a new NewsArticle with invalid attributes
      it 'does not create a new NewsArticle' do
        expect {
          post :create, params: { news_article: invalid_attributes  }
        }.to_not change(NewsArticle, :count)
      end

      # This test checks if the 'create' action renders the 'new' template when given invalid attributes
      it 'renders the new template' do
        post :create, params: { news_article: invalid_attributes}
        expect(response).to render_template(:new)
      end
    end
  end

  # The third group of tests is for the 'show' action in the controller
  describe 'GET #show' do
    let(:news_article) { create(:news_article) }
  
    # This test checks if the 'show' action renders the correct template
    it 'renders the show template' do
      get :show, params: { id: news_article.id }
      expect(response).to render_template(:show)
    end
  
    # This test checks if the 'show' action assigns the requested news_article to @news_article
    it 'assigns the requested news_article to @news_article' do
      get :show, params: { id: news_article.id }
      expect(assigns(:news_article)).to eq(news_article)
    end
  end
  
   # The fourth group of tests is for the 'index' action in the controller
   describe 'GET #index' do
    # This test checks if the 'index' action renders the correct template
    it 'renders the index template' do
      get :index
      expect(response).to render_template(:index)
    end
  
    # This test checks if the 'index' action assigns all news_articles to @news_articles
    it 'assigns all news_articles to @news_articles' do
      news_article1 = create(:news_article)
      news_article2 = create(:news_article)
      get :index
      expect(assigns(:news_articles)).to match_array([news_article1, news_article2])
    end
  end
  
  # The fifth group of tests is for the 'destroy' action in the controller
  describe 'DELETE #destroy' do
    let!(:news_article) { create(:news_article) }
  
    # This test checks if the 'destroy' action deletes the news_article
    it 'deletes the news_article' do
      expect {
        delete :destroy, params: { id: news_article.id }
      }.to change(NewsArticle, :count).by(-1)
    end

    # This test checks if the 'destroy' action redirects to the news_articles index after deletion
    it 'redirects to the news_articles index' do
      delete :destroy, params: { id: news_article.id }
      expect(response).to redirect_to(news_articles_path)
    end
  end  
end