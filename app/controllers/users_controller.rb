class UsersController < ApplicationController

  def new
    @user = User.new
  end
  
  def signout
  end

  def login
  end

  def create
    user = User.new(user_params)
    verify_code = params[:user][:verify_code]
    if verify_code == session[:user][:verify_code]
      if user.save
        redirect_to root
      else
        render "new"
      end
    else
      render "new"
    end
  end

  def create_login_session
    user = User.find_by_mobile(:mobile)
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
    else
      redirect_to :login
    end
  end

    private
      def  user_params
        params.require(:user).permit(:mobile, :password, :is_admin)
      end
end
