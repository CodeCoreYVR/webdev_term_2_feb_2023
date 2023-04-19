# ******************** To Run ********************
* $ bundle i
* $ npm i
  or
  * $ yarn install
  or
  * $ brew install yarn
* $ rails db:create
* $ rails db:migrate
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

# ********************** End *********************

# ********************* Labs *********************

# [Lab] Set up the Amazon Application

Set up a Rails application for `Amazon`. We will use this application to practice many of the Rails concepts in the upcoming weeks.

So make sure to do the following:
  1. Start the Rails Amazon application without tests and using Postgresql
  2. Run your application and make sure to get the welcome page from Rails


# [Lab] Build a home and about pages

Build 'home' and 'about' pages for your Amazon application that just display simple text. Build 'nav bar' to link to both pages. Include a link to the 'contact us' page in the 'nav bar'.
