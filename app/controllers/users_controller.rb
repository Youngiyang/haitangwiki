class UsersController < ApplicationController
  def signout
  end

  def login

  end

  def create_login_session
    user = User.find_by_mobile(:mobile)
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
    else
      redirect_to :login
    end
  end
end
