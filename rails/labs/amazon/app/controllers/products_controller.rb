class ProductsController < ApplicationController
  # This will call the find_product method before the specified actions
  before_action :find_product, only: [:show, :edit, :update, :destroy]
  # This will call the find_user method before the specified actions
  before_action :find_user, only: [:create]
  # This will call the authenticate_user! method before the specified actions
  before_action :require_login, only: [:new, :create]

  def index
    # Get all the products from the database and order them by the created_at column in descending order
    @products = Product.all.order(created_at: :desc)
  end

  def show
    # # Get the product with the given id from the database
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product
    
    @review = Review.new
    @reviews = @product.reviews.order(created_at: :desc) || []
  end

  def new
    # Create a new product instance variable
    @product = Product.new
  end

  def create
    # Create a new product with the given params and assign it to the current user
    @product = @user.products.build(product_params)
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
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product

    @product.destroy
    # Redirect to the products index page
    redirect_to products_path
  end

  def edit
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product
  end

  def update
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product

    # Update the product with the given params
    if @product.update(product_params)
      redirect_to @product
    else
      render 'edit'
    end
  end

  private

  def product_params
    # Returns a sanitized hash of the params with nothing extra
    params.require(:product).permit(:title, :description, :price)
  end

  # Method to find the product with the given id. This is used as a before_action to avoid repeating code.
  # This method is called before the show, edit, update and destroy actions
  def find_product
    @product = Product.find(params[:id])
  end

  # Method to find the user with the given id. This is used as a before_action to avoid repeating code.
  def find_user
    if current_user
      @user = User.find(current_user.id)
    end
  end
end
