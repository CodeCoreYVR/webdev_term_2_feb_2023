class NewsArticlesController < ApplicationController
  before_action :find_news_article, only: [:show, :destroy, :edit, :update]
  before_action :require_login, only: [:new, :create]

  def index
    @news_articles = NewsArticle.all.order(published_at: :desc)
  end

  def new
    @news_article = NewsArticle.new
  end

  def create
    @news_article = current_user.news_articles.build(news_article_params)

    if @news_article.save
      redirect_to @news_article, notice: 'News Article was successfully created.'
    else
      p "ERRORS: #{@news_article.errors.full_messages}"
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def destroy
    @news_article.destroy
    redirect_to news_articles_path, notice: 'News Article was successfully destroyed.'
  end

  def edit
  end

  def update
    if @news_article.update(news_article_params)
      redirect_to @news_article, notice: 'News Article was successfully updated.'
    else
      p "ERRORS: #{@news_article.errors.full_messages}"
      # unprocessable_entity is a status code for when the server understands the request but cannot process the instructions
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def news_article_params
    params.require(:news_article).permit(:title, :description, :published_at, :view_count)
  end

  def find_news_article
    @news_article = NewsArticle.find(params[:id])
  end
end