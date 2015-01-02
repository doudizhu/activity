class LoginController < ApplicationController
  #skip_before_filter :verify_authenticity_token, :only => [:process_phone_login ]
  skip_before_filter :verify_authenticity_token, :only => [:process_login]

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
    #p '.................................'
    #puts params[:user]
    #p params[:user][:password_confirmation]
    #puts "================>" + params[:from];
    if @user && @user.authenticate(params[:user][:password])
      if params[:from] == 'phone'
        #puts "------------->" + params[:from]
        respond_to do |format|
          format.json {render :json => "success"}
        end
        return;
      end
      if @user.login_type == 'user'
        session[:login_user] = @user.name
        redirect_to :welcome1
      else
        session[:login_user] = 'admin'
        redirect_to :admin
      end
    else
      #puts "-=-=-=-=-=>" + params[:from]
      if params[:from] == 'phone'
        #puts "-=-=-=-=-=>" + params[:from]
        respond_to do |format|
          format.json {render :json => "none"}
        end
        return
      end
      flash.now[:error] = '用户名不存在或密码错误'
      render :login
    end
  end

  def quit
    puts session[:login_user]
    session[:login_user] = ''
    redirect_to :root
  end

  def home_page
    if session[:login_user] == 'admin'

      redirect_to :admin
    else
      redirect_to :root
    end
  end

  def forgot1
  end

  def forgot_pw1
    if params[:user][:name] == ''
      flash.now[:notice] = '帐号不能为空'
      render :forgot1
    else
      user = User.find_by_name(params[:user][:name])
      if user
        session[:forgot_pw_user_name] = params[:user][:name]
        redirect_to :forgot2
      else
        render :forgot1
      end
    end


    def forgot2
      @forgot_pw_question = User.find_by_name(session[:forgot_pw_user_name])[:forgot_pw_question]

    end

    def forgot_pw2
      @forgot_pw_question = User.find_by_name(session[:forgot_pw_user_name])[:forgot_pw_question]
      if @forgot_pw_question == params[:user][:forgot_pw_answer]
        redirect_to :forgot3
      else
        flash.now[:notice]='忘记密码答案错误'
        render :forgot2
      end
    end

    def forgot3

    end

    def change_password
      user = User.find_by_name(session[:forgot_pw_user_name])
      if params[:user][:password] == '' || params[:user][:confirmation] == ''
        flash.now[:notice]='输入不能为空'
        render :forgot3
      else
        #p '.................................'
        #puts params[:user][:password]
        #p params[:user][:password_confirmation]
        if params[:user][:password] != params[:user][:password_confirmation]
          flash.now[:notice]='两次密码输入不一致'
          render :forgot3
        else
          session[:name]= user.name
          user.password = params[:user][:password]
          user.password_confirmation = params[:user][:password_confirmation]
          user.save
          redirect_to :welcome1
        end
      end
    end
  end
end