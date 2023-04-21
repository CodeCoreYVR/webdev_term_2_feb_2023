# ******************** To Run ********************
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
# ******************* To Create ******************
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
# Active Record
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
# ********************** End *********************

# ********************* Labs *********************

# [Lab] Set up the Amazon Application

Set up a Rails application for `Amazon`. We will use this application to practice many of the Rails concepts in the upcoming weeks.

So make sure to do the following:
  1. Start the Rails Amazon application without tests and using Postgresql
  2. Run your application and make sure to get the welcome page from Rails


# [Lab] Build a home and about pages

Build 'home' and 'about' pages for your Amazon application that just display simple text. Build 'nav bar' to link to both pages. Include a link to the 'contact us' page in the 'nav bar'.


# [Lab] Build a contact us page

Build a 'contact us' page for your Amazon application that has a name, email and text area fields. When the user submits, it should just show a "Thank you  for contacting us!" message.


# [Lab] Product model

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


# [Lab] Product model modification

Generate a migration to change the type of the price field from Integer to Float. Then run the migration.


# [Exercise] Product model custom methods

Add a custom methods called search to the product model to search for a product with its title or description if it contains a specific word. For instance you should be able to do:
Product.search("car")

Which should return all the products that have the word car in it's title or description (case insensitive).

[Challenge]: Show the products that contain the searched word in their title before the ones that contain the searched word only in the description. For instance, if a product contains the word car in its title, it should before a product that only contains the word car only in the description.

