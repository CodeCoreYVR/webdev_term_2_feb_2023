class QuestionsController < ApplicationController
    
    def new
        @question = Question.new
    end

    def create
        question_params = params.require(:question).permit(:title, :body)
        Question.create(question_params)
        # render text: "Question created successfully"
    end
end
