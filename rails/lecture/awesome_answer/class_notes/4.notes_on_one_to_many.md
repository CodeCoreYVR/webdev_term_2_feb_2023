1. Generate the model
```
rails g model answer body:text question:references
```
It generates questions_controller and associated codes for the controller
```
 invoke  active_record
      create    db/migrate/20230425160526_create_answers.rb
      create    app/models/answer.rb
```
2. Rails generator autometically adds a `belongs_to` statement in the `Answer` model. This will help us later work with associated records. Then, we set up the association from the `Question` model:
```
    class Question < ApplicationRecord
        /* all existing code before that*/

        has_many :answers, dependent: :destroy

         /* all existing code after that*/
    end

```
3. Run the migratetion `rails db:migrate`, so `schema.db` file will be now following
```
ActiveRecord::Schema[7.0].define(version: 2023_04_25_160526) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.text "body"
    t.bigint "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "view_count"
    t.index ["title"], name: "index_questions_on_title"
  end

  add_foreign_key "answers", "questions"
end

```

4. Once we set up the association, we can create associated records
```
Loading development environment (Rails 7.0.4.3)
[1] pry(main)> q = Question.find 10
  Question Load (0.5ms)  SELECT "questions".* FROM "questions" WHERE "questions"."id" = $1 LIMIT $2  [["id", 10], ["LIMIT", 1]]
=> #<Question:0x00000001295fff08
 id: 10,
 title:
  "Chuck norris does not use exceptions when programming. he has not been able to identify any of his code that is not exceptional.",
 body: "The SDD hard drive is down, connect the multi-byte firewall so we can bypass the USB driver!",
 created_at: Thu, 06 Oct 2022 00:00:00.000000000 UTC +00:00,
 updated_at: Wed, 07 Sep 2022 00:00:00.000000000 UTC +00:00,
 view_count: 9407>
[2] pry(main)> a = Answer.new(body: 'My Awesome Answer')
=> #<Answer:0x000000012977b878 id: nil, body: "My Awesome Answer", question_id: nil, created_at: nil, updated_at: nil>
[3] pry(main)> a.question = q
=> #<Question:0x00000001295fff08
 id: 10,
 title:
  "Chuck norris does not use exceptions when programming. he has not been able to identify any of his code that is not exceptional.",
 body: "The SDD hard drive is down, connect the multi-byte firewall so we can bypass the USB driver!",
 created_at: Thu, 06 Oct 2022 00:00:00.000000000 UTC +00:00,
 updated_at: Wed, 07 Sep 2022 00:00:00.000000000 UTC +00:00,
 view_count: 9407>
[4] pry(main)> a
=> #<Answer:0x000000012977b878 id: nil, body: "My Awesome Answer", question_id: 10, created_at: nil, updated_at: nil>
[5] pry(main)> a.save
 TRANSACTION (0.2ms)  BEGIN
  Answer Create (1.8ms)  INSERT INTO "answers" ("body", "question_id", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["body", "My Awesome Answer"], ["question_id", 10], ["created_at", "2023-04-25 16:22:02.629121"], ["updated_at", "2023-04-25 16:22:02.629121"]]
  TRANSACTION (0.4ms)  COMMIT
=> true
[6] pry(main)> q.answers.create(body: 'Another Awesome Answer')
  TRANSACTION (0.3ms)  BEGIN
  Answer Create (5.0ms)  INSERT INTO "answers" ("body", "question_id", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["body", "Another Awesome Answer"], ["question_id", 10], ["created_at", "2023-04-25 16:24:56.384356"], ["updated_at", "2023-04-25 16:24:56.384356"]]
  TRANSACTION (20.7ms)  COMMIT
=> #<Answer:0x000000010f19efa0
 id: 2,
 body: "Another Awesome Answer",
 question_id: 10,
 created_at: Tue, 25 Apr 2023 16:24:56.384356000 UTC +00:00,
 updated_at: Tue, 25 Apr 2023 16:24:56.384356000 UTC +00:00>
[7] pry(main)> q = Question.find 10
  Question Load (0.6ms)  SELECT "questions".* FROM "questions" WHERE "questions"."id" = $1 LIMIT $2  [["id", 10], ["LIMIT", 1]]
=> #<Question:0x000000010748fb40
 id: 10,
 title:
  "Chuck norris does not use exceptions when programming. he has not been able to identify any of his code that is not exceptional.",
 body: "The SDD hard drive is down, connect the multi-byte firewall so we can bypass the USB driver!",
 created_at: Thu, 06 Oct 2022 00:00:00.000000000 UTC +00:00,
 updated_at: Wed, 07 Sep 2022 00:00:00.000000000 UTC +00:00,
 view_count: 9407>
[8] pry(main)> q.answers
  Answer Load (0.7ms)  SELECT "answers".* FROM "answers" WHERE "answers"."question_id" = $1  [["question_id", 10]]
=> [#<Answer:0x00000001074ce958
  id: 1,
  body: "My Awesome Answer",
  question_id: 10,
  created_at: Tue, 25 Apr 2023 16:22:02.629121000 UTC +00:00,
  updated_at: Tue, 25 Apr 2023 16:22:02.629121000 UTC +00:00>,
 #<Answer:0x00000001074ce688
  id: 2,
  body: "Another Awesome Answer",
  question_id: 10,
  created_at: Tue, 25 Apr 2023 16:24:56.384356000 UTC +00:00,
  updated_at: Tue, 25 Apr 2023 16:24:56.384356000 UTC +00:00>]

```

5. Changed the seed file to generate some `Answer` for each `Question`
```
Question.destroy_all()
Answer.destroy_all()

200.times do
    q = Question.create(
        created_at: Faker::Date.backward(days: 365),
        title: Faker::ChuckNorris.fact,
        body: Faker::Hacker.say_something_smart,
        view_count: rand(10_000),
        updated_at: Faker::Date.backward(days: 365)
    )
    
    if q.valid?
        rand(1..5).times do
            Answer.create(body: Faker::Hacker.say_something_smart, question: q)
        end
    end
end


puts Cowsay.say("Generated #{Question.all.count}# questions", :Elephant)
puts Cowsay.say("Generated #{Answer.all.count}# answers", :Dragon)

```

6. After running the seed, we present all the `Answer`s correspond to each `Question` by adding this following code below in the `show.erb` file.
```
<% @question.answers.each do |answer| %>
    <div>
    <%= answer.body %>
    <small> Answered <%= time_ago_in_words(answer.created_at) %> </small>
    </div>
    <hr>
<% end %>

```

7. Add Comment Text for posing `Answer` by adding this following code below in the `show.erb` file
```
    <%= form_for [@question, @answer] do |f| %>
    <div>
        <%= f.label :body %>
        <%= f.text_area :body %>
    </div>
    <%= f.submit %>
    <% end %>
```

8. To create the the instance variable `@answer`, we are changing in the `show` action of `questions_controller`
```
def show
    @question = Question.find(params[:id])
    @answer = Answer.new
end

```

9. Skipping the steps to define all the routes manually and add the following lines to create all the necessary routes to do CRUD operation. For `answers`, we only want to have `create` and `destroy`. Therefore, we also specify. Moreover, for any CRUD operation in `answer`, we need `question_id`. As a result, we definde `resources :answers, only: [:create, :destroy]` inside the the block of `resources :questions`.

```
    resources :questions do 
        resources :answers, only: [:create, :destroy]
    end

```
10. Create the controller for `answers`
```
rails g controller answers
```
output 
```
create  app/controllers/answers_controller.rb
    invoke  erb
    create    app/views/answers
    invoke  helper
    create    app/helpers/answers_helper.rb
```

11. Define `create` action in the `answers_controller`
```
    def create
        @question = Question.find(params[:question_id])
        answer_params = params.require(:answer).permit(:body)
        @answer = Answer.new answer_params
        @answer.question = @question

        if @answer.save 
            redirect_to question_path(@question)
        else
            render '/question/show'
        end
    end

```

12. Define `destroy` action in the `answers_controller`
```
    def destroy
        @question = Question.find(params[:question_id])
        @answer = Answer.find(params[:id])
        @answer.destroy
        redirect_to question_path(@question)
    end
    
```

12. Add delete button along with each `answer`
```
## Keep unchanged everything before that
<% @question.answers.each do |answer| %>
    <div>
    <%= answer.body %>
    <small> Answered <%= time_ago_in_words(answer.created_at) %> </small>
    <%= button_to "Delete", [@question, answer], :method => :delete %>
    </div>
    <hr>
<% end %>

## Keep unchanged everything after that

```
