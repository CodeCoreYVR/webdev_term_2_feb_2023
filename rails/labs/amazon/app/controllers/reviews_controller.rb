class ReviewsController < ApplicationController
  def create
    # Find the product with the given id
    @product = Product.find(params[:product_id])
    # Create a new review with the given params
    @review = @product.reviews.create(review_params)
    # Get all the reviews for the product in descending order
    @reviews = @product.reviews.order(created_at: :desc)

    # If the review is successfully saved to the database
    if @review.save
      redirect_to @product, notice: "Review created successfully"
    else
      # Otherwise, render the product show page again with the error messages
      flash[:alert] = "Review not created"
      # render 'products/show' causes rails to think that the form is being submitted to product_review_path instead of product_reviews_path
      # This is because the form_for helper method will automatically submit the form to the path of the object if it is a new record
      # To fix this, we need to explicitly tell the form_for helper method to submit the form to the product_reviews_path
      # and we need to tell the form to use the POST method instead of the default GET method
      render 'products/show'
    end
  end

  private
  
  # Method to get the review params from the form and only permit the rating and body attributes
  def review_params
    params.require(:review).permit(:rating, :body)
  end
end
