class NewsArticlesController < ApplicationController
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

  private

  def news_article_params
    params.require(:news_article).permit(:title, :description, :published_at, :view_count)
  end
end