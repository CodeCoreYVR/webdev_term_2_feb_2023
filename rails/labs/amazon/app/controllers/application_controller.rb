class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def formatted_names(user)    
    user.first_name = user.first_name.downcase.split(' ').map { |word| word.capitalize }.join(' ')
    user.last_name = user.last_name.downcase.split(' ').map { |word| word.capitalize }.join(' ')
    user
  end
end
