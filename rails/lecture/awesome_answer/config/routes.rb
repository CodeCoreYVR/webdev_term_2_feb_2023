Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get('/welcome', {to: 'welcome#index'})
  get('/goodbye', {to: 'welcome#goodbye', as: :tata})
  get('/form_example', {to: 'welcome#form_example'})
  # get('/question/:id') # dynamic id's will replace type number or param in url

  # Question routes
  get "/questions/new" => "questions#new", as: :new_question
  post "/questions" => "questions#create", as: :questions #questions_path (_path is postfix)
end
