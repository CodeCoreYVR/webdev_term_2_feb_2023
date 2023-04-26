class ReviewsController < ApplicationController
  def create
    @product = Product.find(params[:product_id])
    p "******************** Review Controller ********************"
    p "@product: #{@product.title}"
    p "params: #{params}"
    @review = @product.reviews.create(review_params)
    p "@review: #{@review}"
    p "*************************** End ***************************"
    redirect_to product_path(@product)
  end

  private
  
    def review_params
      params.require(:review).permit(:rating, :body)
  end
end
