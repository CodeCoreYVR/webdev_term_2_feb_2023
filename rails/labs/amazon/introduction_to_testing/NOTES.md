### To Run Test From Project Root Dir
* $ ruby ./introduction_to_testing/<file to test>
### Circle Class
* Gemfile
  * add:
    * group :test do
        gem 'minitest'
      end
* $ bundle i
* $ code ./introduction_to_testing/circle.rb
  * add:
    * Define a Circle class
    * create a getter method for :radius
    * initialize radius
    * method for diameter
* $ code ./introduction_to_testing/circle_test.rb
  * add:
    * require minitest/autorun and ./circle.rb
    * create CircleTest class and inherit from Minitest::Test
    * create test method test_diameter and add tets for circle diameter
* $ ruby ./introduction_to_testing/circle_test.rb
  * make sure all tests pass