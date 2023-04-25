class ProductsController < ApplicationController
  def index
    # Get all the products from the database
    @products = Product.all
  end

  def show
    # Get the product with the given id from the database
    @product = Product.find(params[:id])
  end

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
      redirect_to @product # This is equivalent to product_path(@product) or product_path @product
    else
      # Otherwise, render the new product form again
      render :new
    end
  end

  def destroy
    # Find the product with the given id and delete it
    @product = Product.find(params[:id])
    @product.destroy
    # Redirect to the products index page
    redirect_to products_path
  end

  private

  def product_params
    # Returns a sanitized hash of the params with nothing extra
    params.require(:product).permit(:title, :description, :price)
  end
end
