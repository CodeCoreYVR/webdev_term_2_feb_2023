class QuestionsController < ApplicationController
    
    def new
        @question = Question.new
    end

    def create
        question_params = params.require(:question).permit(:title, :body)
        @question = Question.new question_params

        if @question.save
            redirect_to question_path(@question)
        else
            render :new # it will go to 'def new' method
        end
    end

    def show
        @question = Question.find(params[:id])
        @answer = Answer.new
    end

    def index
        @questions = Question.order("created_at desc")
    end

    def edit
        @question = Question.find(params[:id])
    end

    def update
        question_params = params.require(:question).permit(:title, :body)
        @question = Question.find params[:id]
        
        if @question.update (question_params)
            redirect_to question_path(@question)
        else
            render :edit # it will go to 'def edit' method
        end
    end    

    def destroy
        question = Question.find params[:id]
        question.destroy
        redirect_to questions_path
    end
end
