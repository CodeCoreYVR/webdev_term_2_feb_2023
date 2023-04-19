
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