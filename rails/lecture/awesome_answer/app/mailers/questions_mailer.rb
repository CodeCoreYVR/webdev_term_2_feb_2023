class QuestionsMailer < ApplicationMailer

    def send_monthly_report(questions)
      @question = questions
      @admin    = "admin@email.com"
      mail(to: @admin, subject: "Most liked questions of last month")
    end
  
end