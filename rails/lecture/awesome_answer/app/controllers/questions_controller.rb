class QuestionsController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    def new
        @question = Question.new
    end

    def create
        question_params = params.require(:question).permit(:title, :body)
        @question = Question.new question_params
        @question.user = current_user

        if @question.save
            redirect_to question_path(@question)
        else
            render :new
        end
    end

    def show
        @question = Question.find(params[:id])
        @answer = Answer.new
        @like = @question.likes.find_by(user: current_user)
    end

    def index
        @questions = Question.order("created_at desc")
    end

    def edit
        @question = Question.find(params[:id])
        if can?(:edit, @question) == false
            redirect_to root_path, alert: "Unauthoized user!"
        end
    end

    def update
        question_params = params.require(:question).permit(:title, :body)
        @question = Question.find params[:id]
        
        if can?(:edit, @question) == false
            redirect_to root_path, alert: "Unauthoized user!"
        elsif @question.update (question_params)
            redirect_to question_path(@question)
        else
            render :edit
        end
    end    

    def destroy
        question = Question.find params[:id]
        
        if can?(:delete, question) == false
            redirect_to root_path, alert: "Unauthorized user!"
        else
            question.destroy
            redirect_to questions_path
        end
    end

    #This controller will be used to show all the questions liked by the current user:
    def liked
       @questions = current_user.liked_questions 
    end
end
