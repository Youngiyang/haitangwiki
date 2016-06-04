class UsersController < ApplicationController
  skip_before_action :logged_in_user, only: [:login, :signup, :find]

  def find
  end

  def signup
  end

  def find_password
    verify = params[:verify_code]
    if verify == session[:verify_code]['code']
       user = User.find_by_mobile(params[:mobile])
       if user
          user.update(password: params[:password])
          log_in user
          if user.is_admin == true
            redirect_to admin_path
          else
            redirect_to root_path
          end
       else
        flash.now.notice = "账号不存在!"
        render :forget
      end

    else
      flash.now.notice = "验证码错误!"
      render :forget
    end
  end

  def create
    verify = params[:user][:verify_code]
    if verify == session[:verify_code]['code']
        user = User.new(user_params)
        if verify_rucaptcha?(user) && user.save
           log_in user
           flash.now.notice = "注册成功!"
           redirect_to welcome_index_path
        else
          flash.now.notice = "格式有误!"
          render :signup
        end
      else
        flash.now.notice = "验证码错误!"
        render :signup
    end
  end

  def signout
  end

  def login
  end

  def logout
    log_out if logged_in?
    redirect_to :root
  end


  def create_login_session
    user = User.find_by_mobile(params[:mobile])
    if user && user.authenticate(params[:password])
      log_in user
      params[:remember] == '1' ? remember(user) : forget(user)
      redirect_to root_path
    else
      flash.now.notice = "格式有误!"
      render :login
    end
  end

    private
      def  user_params
        params.require(:user).permit(:mobile, :password, :is_admin, :password_confirmation, :verify_code, :name)
      end


end
