class ProductsController < ApplicationController
  def new
    # Create a new product instance variable
    @product = Product.new
  end

  def create
    # Create a new product with the given params
    @product = Product.new(product_params)
    # If the product is successfully saved to the database
    if @product.save
      # Redirect to the products index page
      redirect_to products_path
    else
      # Otherwise, render the new product form again
      render :new
    end
  end

  private

  def product_params
    params.require(:product).permit(:title, :description, :price)
  end
end
