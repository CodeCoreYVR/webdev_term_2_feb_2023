require 'rails_helper'

RSpec.describe NewsArticlesController, type: :controller do
  describe 'GET #new' do
    it 'renders the new template' do
      get :new
      expect(response).to render_template(:new)
    end

    it 'assigns a new instance of NewsArticle to @news_article' do
      get :new
      expect(assigns(:news_article)).to be_a_new(NewsArticle)
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      let (:valid_attributes) { attributes_for(:news_article) }

      it 'creates a new NewsArticle' do
        expect {
          post :create, params: { news_article: valid_attributes }
        }. to change(NewsArticle, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      let (:invalid_attributes) { attributes_for(:news_article, title: nil) }

      it 'does not create a new NewsArticle' do
        expect {
          post :create, params: { news_article: invalid_attributes  }
        }.to_not change(NewsArticle, :count)
      end

      it 'renders the new template' do
        post :create, params: { news_article: invalid_attributes}
        expect(response).to render_template(:new)
      end
    end
  end
end