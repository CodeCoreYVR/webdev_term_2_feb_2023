Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "welcome#index"

  get('/welcome', {to: 'welcome#index'})
  get('/goodbye', {to: 'welcome#goodbye', as: :tata})
  get('/form_example', {to: 'welcome#form_example'})
  # get('/question/:id') # dynamic id's will replace type number or param in url

  # Question routes
  # get "/questions/new" => "questions#new", as: :new_question # new_question_path
  # post "/questions" => "questions#create", as: :questions #questions_path (_path is postfix)
  # get "/questions/:id" => "questions#show", as: :question #question_path (_path is postfix)
  # get "/questions" => "questions#index"
  # get "/questions/:id/edit" => "questions#edit", as: :edit_question
  # patch "/questions/:id" => "questions#update"
  # delete "/questions/:id" => "questions#destroy", as: :delete_question

  resources :questions do 
    resources :answers, only: [:create, :destroy]
    resources :likes, shallow: true, only: [:create, :destroy]
  end

  # get 'sessions/new'
  # get 'sessions/create' # sessions
  # get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resource :sessions # it will implement all routes for the methods/actions in the sessions controller
  
  resources :users, only: [:new, :create]

end
