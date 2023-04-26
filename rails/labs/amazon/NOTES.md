## ******************** To Run ********************
* $ bundle i
* $ npm i
  or
  * $ yarn install
  or
  * $ brew install yarn
* $ rails db:create
* $ rails db:migrate
* $ rails db:seed
* $ rails s
  or
  * $ rails server
* Open browser and navigate to:
  * localhost:3000/
## ******************* To Create ******************
* $ rails new amazon -T -d postgresql --skip-git
* $ cd amazon
* $ bundle i
  or
  * $ bundle install
* $ code .gitignore
  * added files and directories to ignore when committing and pushing to github. These files and directories are easily generated after cloning by using the commands under the "To Run" section above.
* $ rails s
  * open browser and check if localhost:3000 displays rails welcome page
* $ rails g controller staticPages
* ./config/routes.rb
  * add route for GET home
* ./app/controllers/static_pages_controller.rb
  * add home method
* ./app/views/layouts/application.html.erb
  * add nav bar and link_to home
* $ code app/views/static_pages/home.html.erb
  * add welcome message
* ./config/routes.rb
  * add route for GET about
* ./app/controllers/static_pages_controller.rb
  * add about method
* ./app/views/layouts/application.html.erb
  * add link_to about
* $ code app/views/static_pages/about.html.erb
  * add about content
* ./app/views/layouts/application.html.erb
  * add link_to contact_us 
  <!-- this will throw an error as there is no route or view page for contact_us yet -->
* ./config/routes.rb
  * add route for GET contact_us
* ./app/controllers/static_pages_controller.rb
  * add contact_us method
* $ code app/views/static_pages/contact_us.html.erb
  * add contact_us content and form
* ./config/routes.rb
  * add route for POST contact_us
* ./app/controllers/static_pages_controller.rb
  * add logic in contact_us method so you can know in your view page if the form has been submitted or not
* ./app/views/static_pages/contact_us.html.erb
  * add if statement to display message instead if form has already been submitted
  * add data: { turbo: false } to form so turbo-rails won't cause a conflict when rendering the same page.
* Gemfile
  * add:
    * gem 'bootstrap', '~> 5.3.0.alpha3'
    * gem 'jquery-rails'
* bundle i
* ./app/assets/stylesheets/application.css
  * rename to application.scss
  * add:  
    * @import "bootstrap";
    * @import "custom"; 
* $ code app/assets/stylesheets/custom.css
  * add desired css
* $ mkdir app/assets/javascript
* $ code app/assets/javascript/application.js
  * add:
    * //= require jquery3
    * //= require popper
    * //= require bootstrap
* added bootstrap classes to:
  * ./app/views/static_pages/
      application.html.erb
      home.html.erb
      about.html.erb
      contact_us.html.erb
### Active Record
* $ rails generate model Product title:string description:text price:integer
* $ rails db:migrate
* $ rails console
  * > product = Product.create(title: "Product Title", description: "Product Description", price: 100)
  * > Product.find(product.id)
  * > product.update(title: "New Product Title")
  * > product.update(title: "New Product Title")
  * > product.destroy
  * > exit
* ./db/seeds
  * add:
    * Product.destroy_all
    * loop to create x number of products using faker for names
    * print to terminal number of products
* $ rails db:seed
  * <rails db:reset> does the following:
    * rails db:drop
    * rails db:create
    * rails db:migrate
    * rails db:seed
* $ rails console
  * > Product.count
  * > Product.all
  * > exit
* $ rails generate migration ChangePriceToFloatInProducts
* ./db/migrate/...date_numbers..._chang_price_to_float_in_products.rb
  * add:
    * change_column :products, :price, :float
* $ rails db:migrate
* ./app/models/product.rb
  * add validations to model
* $ rails c
  or
  * $ rails console
  then
  * check if validations are working:
    * p = Product.create("description" => "shouldn\'t work because title isn't present", "price" => 2)
    * p = Product.create("title" => "shouldn\'t work because description isn't present", "price" => 2)
    * p = Product.create("title" => "Shouldn\'t work because description is less than 10 characters", "description" => "nine char" "price" => 2)
    * p = Product.create("title" => "should work fine", "description" => "should work fine", "price" => 2)
    * exit
* ./app/models/product.rb
  * add callback methods
  * call the methods before product saves
* rails c
  * check if callback methods are working correctly by creating products and see if the callback methods altered the content before validation.
  * exit
* ./app/models/product.rb
  * add Class method
* rails c
  * check if Class method works
    * $ Product.search('de')
### CRUD
* ./config/routes.rb
  * add GET route for new action
* $ rails g controller products
* ./app/controllers/products_controller.rb
  * add new method
  * create new instance of Product
* $ code ./app/views/products/new.html.erb
  * add form_to @product or product_new_path
  * add contents of form
* ./config/routes.rb
  * add POST route for create action
* ./app/controllers/products_controller.rb
  * add create method
  * add private product_params method
  * add rest of content
  * redirect_to products_path
* ./config/routes.rb
  * add GET route for index action
* ./app/controllers/products_controller.rb
  * add index method
  * create @products array
* $ code ./app/views/products/index.html.erb
  * loop through @products and and display
  * titles should be links to product_path
* ./config/routes.rb
  * add GET route for show action
* ./app/controllers/products_controller.rb
  * add show method
  * declare @product and find Product by params id
* $ code ./app/views/products/show.html.erb
  * display product title, description, and price
  * use number_by_currency to add $ and .00
* ./app/views/layouts/application.html.erb
  * add link for Products
  * add link for New
* ./config/routes.rb
  * add DELETE route for destroy action
* ./app/controllers/products_controller.rb
  * add destroy method
  * declare @product and find Product by params id
* ./app/views/products/show.html.erb
  * add button_to delete
  * include destroy_product_path and method: :delete
* ./config/routes.rb
  * add GET route for edit action
* ./app/controllers/products_controller.rb
  * add edit method
  * declare @product and find Product by params id
* ./app/views/products/show.html.erb
  * add link_to edit
  * include edit_product_path and/or @product
* $ code ./app/views/products/edit.html.erb
  * add content for edit form
  * send form to update_product_path and/or @product
* ./config/routes.rb
  * add PATCH route for update action
* ./app/controllers/products_controller/rb
  * add update method
  * declare @product and find Product by params id
  * if product updates redirect_to product_path
### One to Many
* $ rails generate model Review rating:integer body:text product:references
* ./config/routes.rb
  * switch from custom product routes to resources
  * add review resources within products for create action only
* ./app/models/product.rb
  * has_many :reviews, dependent: :destroy
* ./app/models/review.rb
  * belongs_to :product
  * add rating validations to only allow between 1-5
* $ rails g controller reviews
* ./app/controllers/reviews_controller.rb
  * add create method
  * declare @product and find Product by params :product_id
  * create a review_params private method to require review and permit only rating and body
  * declare @review and create a review with review_params
  * redirect_to product_path @product
* ./app/controllers/products_controller.rb
  * within show method declare @review and create new instance from Review
* ./app/views/products/show.html.erb
  * add review form to create new product review
  * use product_reviews_path(@product) or [@product, @review]
  * check if there are any @product.reviews
  * if so loop through them and display rating and body
* ./app/controllers/reviews_controller.rb
  * add if conditional for if review saves
  * if saves redirect_to @product or product_path @product
  * if not saves render products show page with error message
* ./app/controllers/reviews_controller.rb
  * add conditional. if @review.save then redirect_to @product
  * else render 'products/show'
  * for reviews to display in desc order add:
    * @reviews = @product.reviews.order(created_at: :desc)
* ./app/controllers/products_controller.rb
  * in show action add:
    * @reviews = @product.reviews.order(created_at: :desc) || []
  * since we're here, in index action add:
    * .order(created_at: :desc) to end of Product.all
* ./app/views/products/show.html.erb
  * change reviews conditional to be if @reviews exist || @reviews != []
  * in the review form we have to switch to using url instead of path helper and tell the form to use post method 
    * url: product_reviews_path(@product)
    * method: :post
* ./config/routes.rb
  * add , :destroy to reviews only: array
* ./app/controllers/reviews_controller.rb
  * add destroy action method
    * make define @product in the destroy action or as a custom before_action
    * declare @review and find review by params :id
    * destroy @review
    * redirect_to product_path(@product)
* ./app/views/products/show.html.erb
  * add link_to to each review
    * product_review_path(@product, review)
    * method: :delete
* link_to uses javascript to submit requests using DELETE method. this is handled by rails UJS library. 
  newer versions of rails require you to explicitly include the UJS code.
  * if newer rails:
    * ./app/assets/javascripts/application.js
      * add: //= require rails-ujs
    * ./app/views/layouts/application.html.erb
      * add to head:
        * <%= csrf_meta_tags %>
        * <%= javascript_include_tag 'application' %>
## ********************** End *********************

## ********************* Labs *********************

### [Lab] Set up the Amazon Application

Set up a Rails application for `Amazon`. We will use this application to practice many of the Rails concepts in the upcoming weeks.

So make sure to do the following:
  1. Start the Rails Amazon application without tests and using Postgresql
  2. Run your application and make sure to get the welcome page from Rails


### [Lab] Build a home and about pages

Build 'home' and 'about' pages for your Amazon application that just display simple text. Build 'nav bar' to link to both pages. Include a link to the 'contact us' page in the 'nav bar'.


### [Lab] Build a contact us page

Build a 'contact us' page for your Amazon application that has a name, email and text area fields. When the user submits, it should just show a "Thank you  for contacting us!" message.


### [Lab] Product model

  Step 1
Generate a Product model for your Amazon application. Make sure it has the following attributes: title, description and price.
  - Title must be of type String
  - Description must be of type Text
  - Price must be of type Integer
Run the migration.
  Step 2
Open up the Rails console then create a product, then find it then update its title and then delete it.
  Step 3
Change your db/seeds.rb file to generate a 1000 products with Faker then run the seeds.


### [Lab] Product model modification

Generate a migration to change the type of the price field from Integer to Float. Then run the migration.


### [Exercise] Product model custom methods

Add a custom methods called search to the product model to search for a product with its title or description if it contains a specific word. For instance you should be able to do:
Product.search("car")

Which should return all the products that have the word car in it's title or description (case insensitive).

[Challenge]: Show the products that contain the searched word in their title before the ones that contain the searched word only in the description. For instance, if a product contains the word car in its title, it should before a product that only contains the word car only in the description.


### [Lab] Amazon: New and Create

This lab assumes that you have an Amazon application with a Product model that has the following attributes: title, description and price. Depending on the exercises you've followed, your application may have more. Feel free to incorporate the extra attributes in the following labs:

Implement the following actions for your Amazon application:
1. New Action
  url: /products/new: Shows a form to create a product that should have the attributes above.
2. Create Action
  url: /products: Handles creating a product based on the form submitted in the new page.


### [Lab] Amazon: Show and Index

Implement the following actions for your Amazon application:
1. Show Action
    url: /products/:id: Displays detail product information for a product having an id of :id.
2. Index Action
    url: /products: Displays the titles of all products in the database as links to their respective show pages.
3. Update the create action to redirect to the created product's show page upon successful creation.

Bonus:
1. Display the price formatted as a currency (with two decimal points and a dollar sign beforehand).


### [Lab] Amazon: Destroy

Implement the following action for your Amazon application:
1. Destroy Action
    url: /products/:id: Handle deleting a product having an id of :id then redirect to the Product index page upon successful deletion.


### [Lab] Amazon: Edit and Update

Implement the following actions for your Amazon application:
1. Edit Action
    url: /products/:id/edit: Shows a form pre-populated with data from a product having an id of :id.
2. Update Action
    url: /products/:id: Handles updating a product then redirects to its show page on a successful update.
3. Add a link in your Products show pages to their edit page.


### [Lab] Amazon: Creating reviews

Add reviews for products in your Amazon application as follows:
  1. Product has many reviews
  2. The form to create reviews should be on the product page much like a comment section in a post of a blog.
  3. The reviews associated to products should be shown on the respective product show.
  4. Every review has rating and body (for now just have the user enter a number for the value of rating, later you will learn how to display interactive stars with javascript)
  5. Validate that body is optional but the rating is required and must be a number between 1 and 5 inclusive.

Test your association in Rails console to make sure that it works.


### [Lab] Amazon: Reviews Controller Create

Start to build the reviews controller and implement the create action as follows:
  1. Reviews can be created from the product show page
  2. If the review is created successfully, redirect back to the product show page
  3. If the review is not created successfully, then show the product show page again with errors


### [Lab] Amazon: Reviews controller destroy

1. Implement the ability to delete reviews for products by having a delete link by each review.
3. After deleting a review the user should be redirected back to the product show page.

