class NewsArticlesController < ApplicationController
  before_action :find_news_article, only: [:show, :destroy]

  def index
    @news_articles = NewsArticle.all.order(published_at: :desc)
  end

  def new
    @news_article = NewsArticle.new
  end

  def create
    @news_article = NewsArticle.new(news_article_params)

    if @news_article.save
      redirect_to new_news_article_path, notice: 'News Article was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
  end

  def destroy
    @news_article.destroy
    redirect_to news_articles_path, notice: 'News Article was successfully destroyed.'
  end

  private

  def news_article_params
    params.require(:news_article).permit(:title, :description, :published_at, :view_count)
  end

  def find_news_article
    @news_article = NewsArticle.find(params[:id])
  end
end