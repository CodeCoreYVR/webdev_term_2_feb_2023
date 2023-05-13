class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :user_liked_review  

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def formatted_names(user)    
    user.first_name = user.first_name.titleize
    user.last_name = user.last_name.titleize
    user
  end

  def require_login
    unless current_user
      flash[:error] = "You must be logged in to create a product or review."
      redirect_to new_session_path
    end
  end

  # If user has already liked the review, return true else return false
  # def user_liked_review?(review)
  #   current_user.find_like(review)
  # end  
  def user_liked_review(review)
    current_user.likes.find_by(review_id: review.id)
  end
end
