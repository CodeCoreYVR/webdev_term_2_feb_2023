Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#home"

  # Defines the "about", "contact_us" and "home" routes which 
  # can use home_path, about_path and contact_us_path helpers
  get '/home', to: 'static_pages#home'
  get '/about', to: 'static_pages#about'
  get '/contact_us', to: 'static_pages#contact_us'
  post '/contact_us', to: 'static_pages#contact_us'

  # Defines the "products" routes
  get '/products/new', to: 'products#new', as: "new_product" # new_product_path
  post '/products', to: 'products#create', as: "products" # products_path
  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show', as: 'product' # product_path

end
