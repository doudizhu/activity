class LoginController < ApplicationController
  def login
    #redirect_to 'login/login'
  end

  def regist
    @user=User.new
  end

  def welcome1
    @user = session[:login_user]
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      session[:login_user] = @user.name
      redirect_to :welcome1
    else

      render :regist
    end
  end

  def process_login
    @user = User.find_by_name(params[:user][:name])

    if @user && @user.authenticate(params[:user][:password])
      if @user.login_type == 'user'
        session[:login_user] = @user.name
        redirect_to :welcome1
      else
        redirect_to :admin
      end
    else
      flash.now[:error] = '用户名不存在或密码错误'
      render :login
    end
  end

  def forgot1

  end
  def forgot2

  end
  def forgot3

  end


end