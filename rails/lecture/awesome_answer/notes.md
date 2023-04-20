
* The Model name should be singular, and the table should be plural
-Model    | Table
----------------
-Question | questions
-Product  | products


* rails db:migrate and rails db:rollback

```
rails db:migrate:status

database: awesome_answer_development

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20230419152434  Create questions

PS E:\Codecore Files\web diploma\webdev_term_2_feb_2023\rails\lecture\awesome_answer> rails db:rollback
== 20230419152434 CreateQuestions: reverting ==================================
-- drop_table(:questions)
   -> 0.0250s
database: awesome_answer_development

 Status   Migration ID    Migration Name
--------------------------------------------------
  down    20230419152434  Create questions

PS E:\Codecore Files\web diploma\webdev_term_2_feb_2023\rails\lecture\awesome_answer> rails db:migrate
== 20230419152434 CreateQuestions: migrating ==================================
-- create_table(:questions)
   -> 0.0298s
== 20230419152434 CreateQuestions: migrated (0.0320s) =========================
```

* Create question in db
```
 q1.persisted?
=> false
[8] pry(main)> q1.save
  TRANSACTION (1.1ms)  BEGIN
  Question Create (2.6ms)  INSERT INTO "questions" ("title", "body", "created_at", "updated_at", "view_count") VALUES ($1, $2, $3, $4, $5) RETURNING "id"  [["title", "My first Question"], ["body", "Body of my first Question"], ["created_at", "2023-04-19 16:24:32.792622"], ["updated_at", "2023-04-19 16:24:32.792622"], ["view_count", nil]]
  TRANSACTION (1.1ms)  COMMIT
```

* .create ==> .new(setting attributes) + .save

* meta_programming: define_method("find_by" + column_name) => implement the method body for column_name

* Exercise: Question.where("title ILIKE ?", "%el%").order("created_at DESC").limit(10)

* Exercise 2: Question.order("view_count DESC").where("created_at >= ?", Date.today - 3.days).limit(10)


* validates :title, uniqueness: {scope: :body}

* validates :view_count, numerciality: {greater_than_or_equal_to: 0}

* Custom validation:
<b>question.rb</b>
```
validate :no_monkey

    private
    # custom validation method
    def no_monkey
        if body && body.downcase.include?("monkey")
            self.errors.add(:body, "must not contain monkey")
        end
    end
```
rails console:

```
[2] pry(main)> q
=> #<Question:0x000001aaf19d36c0 id: nil, title: nil, body: nil, created_at: nil, updated_at: nil, view_count: nil>
[3] pry(main)> q.title = "tt"
=> "tt"
[4] pry(main)> q.body = "body"
=> "body"
[5] pry(main)> q.body = "Hi monkey"
=> "Hi monkey"
[6] pry(main)> q.valid?
  Question Exists? (3.3ms)  SELECT 1 AS one FROM "questions" WHERE "questions"."title" = $1 LIMIT $2  [["title", "tt"], ["LIMIT", 1]]
=> false
[7] pry(main)> q.errors.full_messages
=> ["Title needs to be unique!", "Body must not contain monkey"]
```

* .save does not throw error message, where .save! method does

```
[9] pry(main)> q.save
  TRANSACTION (0.2ms)  BEGIN
  Question Exists? (0.5ms)  SELECT 1 AS one FROM "questions" WHERE "questions"."title" = $1 LIMIT $2  [["title", "tt"], ["LIMIT", 1]]
  TRANSACTION (0.5ms)  ROLLBACK
=> false
[10] pry(main)> q.save!
  TRANSACTION (0.3ms)  BEGIN
  Question Exists? (0.6ms)  SELECT 1 AS one FROM "questions" WHERE "questions"."title" = $1 LIMIT $2  [["title", "tt"], ["LIMIT", 1]]
  TRANSACTION (0.4ms)  ROLLBACK
ActiveRecord::RecordInvalid: Validation failed: Title needs to be unique!, Body must not contain monkey
from C:/Ruby31-x64/lib/ruby/gems/3.1.0/gems/activerecord-7.0.4.3/lib/active_record/validations.rb:80:in `raise_validation_error'
[11] pry(main)>
```

* write a custom validation that won't allow title in the body

```
# question.rb
 validate :no_title_in_body
def no_title_in_body
        if body&.downcase.include?(title.downcase)
            self.errors.add(:body, "must not include title of question")
        end
    end
```

------------------
------------------

```
[1] pry(main)> q = Question.new
=> #<Question:0x0000022af12772e8 id: nil, title: nil, body: nil, created_at: nil, updated_at: nil, view_count: nil>
[2] pry(main)> q.title = "Morning"
=> "Morning"
[3] pry(main)> q.body = "Good morning"
=> "Good morning"
[4] pry(main)> q.valid?
  Question Exists? (2.6ms)  SELECT 1 AS one FROM "questions" WHERE "questions"."title" = $1 LIMIT $2  [["title", "Morning"], ["LIMIT", 1]]
=> false
[5] pry(main)> q.errors.full_messages
=> ["Body must not include title of question"]
```

* Stages or, Life cycle events
```
# life cycle events
    before_save {
        # before saving it to db capitalize the title
        self.title = title.capitalize
    }
```
---------------
```
[1] pry(main)> q = Question.new
=> #<Question:0x000001ee7c4be2d8 id: nil, title: nil, body: nil, created_at: nil, updated_at: nil, view_count: nil>
[2] pry(main)> q.title = "a title"
=> "a title"
[3] pry(main)> q.body = "a body"
=> "a body"
[4] pry(main)> q.save
  TRANSACTION (0.3ms)  BEGIN
  Question Exists? (3.7ms)  SELECT 1 AS one FROM "questions" WHERE "questions"."title" = $1 LIMIT $2  [["title", "a title"], ["LIMIT", 1]]
  Question Create (10.6ms)  INSERT INTO "questions" ("title", "body", "created_at", "updated_at", "view_count") VALUES ($1, $2, $3, $4, $5) RETURNING "id"  
[["title", "A title"], ["body", "a body"], ["created_at", "2023-04-20 06:42:06.945436"], ["updated_at", "2023-04-20 06:42:06.945436"], ["view_count", nil]] 
  TRANSACTION (2.2ms)  COMMIT
=> true
[5] pry(main)> q
=> #<Question:0x000001ee7c4be2d8
 id: 215,
 title: "A title",
 body: "a body",
```

* Scope in question.rb
```

    # Scope: Scopes are class methods for Model
    # scope(:name_of_method, ->{lambda})
    scope(:recent_ten, ->{ order("created_at desc").limit(10) })
    # The above is equivalent to:
    # def self.recent_ten
    #     order("created_at desc").limit(10)
    # end
```
* Scope in console
```
[1] pry(main)> Question.recent_ten
=>   Question Load (4.5ms)  SELECT "questions".* FROM "questions" ORDER BY created_at desc LIMIT $1  [["LIMIT", 10]]
[#<Question:0x000001f70fa75c08
  id: 215,
  title: "A title",
  body: "a body",
  created_at: Thu, 20 Apr 2023 06:42:06.945436000 UTC +00:00,
  updated_at: Thu, 20 Apr 2023 06:42:06.945436000 UTC +00:00,
  view_count: nil>,
 #<Question:0x000001f70fe4e460
  id: 214,
  title: "tt",
  body: "monkey",
  created_at: Wed, 19 Apr 2023 19:18:03.829896000 UTC +00:00,
  updated_at: Wed, 19 Apr 2023 19:18:03.829896000 UTC +00:00,
  view_count: nil>,
 #<Question:0x000001f70fe4e320
  id: 213,
  title: "adsfsdfdsf",
  body: "333333333333333333333333333333333333333333333333333333fffff",
  created_at: Wed, 19 Apr 2023 19:04:02.315751000 UTC +00:00,
  updated_at: Wed, 19 Apr 2023 19:04:02.315751000 UTC +00:00,
  view_count: nil>,
 #<Question:0x000001f70fe4e230
  id: 212,
  title: "New title",

<page break> --- Press enter to continue ( q<enter> to break ) --- <page break>
```

* A search method for Question model that do wildcard search on title and body

```
#question.rb

    def self.search(keyword)
        where('title ILIKE ? or body ILIKE ?', "%"+keyword+"%", "%"+keyword+"%")
    end

```
* In console
```
[1] pry(main)> Question.search("rails")
=>   Question Load (8.1ms)  SELECT "questions".* FROM "questions" WHERE (title ILIKE '%rails%' or body ILIKE '%rails%')
[#<Question:0x0000028d030df718
  id: 216,
  title: "Rails question",
  body: "some body",
  created_at: Thu, 20 Apr 2023 06:59:58.786566000 UTC +00:00,
  updated_at: Thu, 20 Apr 2023 06:59:58.786566000 UTC +00:00,
  view_count: nil>,
 #<Question:0x0000028d03324988
  id: 217,
  title: "A question",
  body: "rails body",
  created_at: Thu, 20 Apr 2023 07:00:21.421645000 UTC +00:00,
  updated_at: Thu, 20 Apr 2023 07:00:21.421645000 UTC +00:00,
  view_count: nil>]
```