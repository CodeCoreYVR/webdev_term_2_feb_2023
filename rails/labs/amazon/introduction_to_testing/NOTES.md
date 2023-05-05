### To Run Test From Project Root Dir
* $ ruby ./introduction_to_testing/<file to test>
### Circle Class
* Gemfile
  * add:
    * group :test do
        gem 'minitest'
      end
* $ bundle i
* $ mkdir ./introduction_to_testing/circle
* $ code ./introduction_to_testing/circle/circle.rb
  * add:
    * Define a Circle class
    * create a getter method for :radius
    * initialize radius
    * method for diameter
* $ code ./introduction_to_testing/circle/circle_test.rb
  * add:
    * require minitest/autorun and ./circle.rb
    * create CircleTest class and inherit from Minitest::Test
    * create test method test_diameter and add tets for circle diameter
* $ ruby ./introduction_to_testing/circle_test.rb
  * make sure test passes
* ./introduction_to_testing/circle.rb
  * add: area method
* ./introduction_to_testing/circle_test.rb
  * add: test method test_area and add test for circle area
* $ ruby ./introduction_to_testing/circle_test.rb
  * make sure all tests pass
* ./introduction_to_testing/circle.rb
  * add: perimeter method
* ./introduction_to_testing/circle_test.rb
  * add: test method test_perimeter and add test for circle perimeter
* $ ruby ./introduction_to_testing/circle_test.rb
  * make sure all tests pass
### Test Drive Dog Class
* $ mkdir ./introduction_to_testing/dog
* $ code ./introduction_to_testing/dog/dog.rb
  * add:
    * Define a Dog class
    * create a getter method for :bones
    * initialize @bones as an empty array
    * methods for give_bone, eat_bone, and bone_count
* $ code ./introduction_to_testing/dog/dog_test.rb
  * add:
    * require minitest/autorun and ./dog.rb
    * create DogTest class and inherit from Minitest::Test
    * create a getter method for :dog
    * create test method test_give_bone and add tests for give_bone
* $ ruby ./introduction_to_testing/dog/dog_test.rb
  * make sure test passes
* $ code ./introduction_to_testing/dog/dog_test.rb
  * add: test_method test_eat_bone and add tests for eat_bone
* $ ruby ./introduction_to_testing/dog/dog_test.rb
  * make sure all tests pass
* $ code ./introduction_to_testing/dog/dog_test.rb
  * add: test_method test_bone_count and add tests for bone_count
* $ ruby ./introduction_to_testing/dog/dog_test.rb
  * make sure all tests pass
# ****************************** END ******************************

### [Lab] Circle Class

Write a Circle class following TDD principles. Initialize the circle with a radius attribute. It should have the following 3 methods:
  1. diameter method that returns the diameter.
  2. area method that returns the area of the circle. Test with various circles that the area returned is correct.
  3. perimeter method that returns the length of circle's border (or perimeter). Test with various circles that the perimeter returned is correct.


### [Lab] Test Drive Dog Class

Build a Dog Class following TDD principles. It should have the following method:
  1. give_bone method that takes a string (as an argument) which describes the bone size (e.g. 'small', 'medium', 'large', etc) and returns the number of bones it currently owns. Test that the dog can take a maximum of 3 bones.
  2. eat_bone method that returns the last bone (string describing bone size) that was added. Test that the last bone was returned and that a bone was removed.
  3. bone_count method that returns the number of remaining bones the dog owns. Test that it returns the correct amount.





