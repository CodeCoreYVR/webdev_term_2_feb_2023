class MostLikedLastMonthJob < ApplicationJob
  queue_as :default

  def perform(*args)
    @questions = Question.select("questions.id, count(questions.id) AS count").
                          joins(:likes).
                          group("questions.id").
                          order("count DESC").
                          where("questions.created_at >= ? AND questions.created_at <= ?",
                                Time.now.last_month.beginning_of_month,
                                Time.now.last_month.end_of_month).
                          limit(10)
    QuestionsMailer.send_monthly_report(@questions).deliver_now
  end
end
