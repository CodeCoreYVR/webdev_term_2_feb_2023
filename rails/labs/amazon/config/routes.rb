Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#home"

  # Defines the "about", "contact_us" and "home" routes which 
  # can use home_path, about_path and contact_us_path helpers
  get '/home', to: 'static_pages#home'
  get '/about', to: 'static_pages#about'
  get '/contact_us', to: 'static_pages#contact_us'
  post '/contact_us', to: 'static_pages#contact_us'

  # ***** The following routes are not needed because we are using the resources :products line below *****
  # Defines the "products" routes
  # get '/products/new', to: 'products#new', as: "new_product" # new_product_path
  # post '/products', to: 'products#create', as: "products" # products_path
  # get '/products', to: 'products#index' # products_path
  # get '/products/:id', to: 'products#show', as: 'product' # product_path
  # delete '/products/:id', to: 'products#destroy', as: 'destroy_product' # destroy_product_path
  # get '/products/:id/edit', to: 'products#edit', as: 'edit_product' # edit_product_path
  # patch '/products/:id', to: 'products#update', as: 'update_product' # update_product_path
  # ******* The above routes are not needed because we are using the resources :products line below *******

  # Route for admin panel
  get 'admin/panel', to: 'admins#panel'

  # Routes for user authentication
  # Defines the "signup" and "login" routes
  resources :users, only: [:new, :create, :edit, :update]
  # Defines the "login" and "logout" routes
  resources :sessions, only: [:new, :create, :destroy]

  # Routes for news articles
  resources :news_articles, only: [:new, :create, :index, :show, :destroy]

  # Routes for products and reviews
  # Defines the "reviews" routes i.e. "/products/:id
  resources :products do
    # Defines the "reviews" routes nested under "products" i.e. "/products/:product_id/reviews"
    resources :reviews, only: [:create, :destroy] do
      member do
        put 'hide', to: 'reviews#hide'
        put 'unhide', to: 'reviews#unhide'
      end
    end
  end
  # path helpers generated by the resources :products and resources :reviews lines:
  # products_path                       # returns the path to the index action of the ProductsController.
  # product_path(@product)              # returns the path to the show action of the ProductsController for the given @product object.
  # DELETE product_path(@product)       # generates a DELETE request to the destroy action of the ProductsController for the given @product object. This path helper is generated by passing the method: :delete option to the button_to helper.
  # new_product_path                    # returns the path to the new action of the ProductsController.
  # edit_product_path(id)               # returns the path to the edit action of the ProductsController for the product with the given id.
  # product_reviews_path(product_id)    # returns the path to the create action of the ReviewsController for the product with the given product_id. This path helper is nested, meaning that it requires a product_id parameter to be passed in order to generate the correct URL.
  # new_product_review_path(product_id) # returns the path to the new action of the ReviewsController for the product with the given product_id. This path helper is also nested and requires a product_id parameter to be passed in order to generate the correct URL. Note that since we specified only: [:create] in the resources :reviews line, this is the only path helper generated for the ReviewsController.
end
