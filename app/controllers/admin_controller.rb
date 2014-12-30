class AdminController < ApplicationController
  require 'will_paginate/array'
  def manager_index
    #@user = User.all
    #session[:success]=''
    #@user = User.where(:login_type => 'user')
    #p '------------------------------------'

    #@pages_user = @user.paginate :page => params[:page], :per_page => 10
    #@pages_user = @user.paginate(page: params[:page], per_page: 10)
    #p '------------------------------------'
    #p  @pages_user
    #puts '-------------------'

    @pages_user = realign_user_list.paginate(page: params[:page], per_page: 10)
    #@pages_user = realign_user_list

  end
  def add_user
    @user=User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      session[:login_user] = @user.name
      redirect_to :welcome1
    else
      render :add_user
    end
  end

  def del_user
    User.find_by_id(params[:id]).delete
    redirect_to :admin
  end
  def realign_user_list
    temp_users = User.where(:login_type => 'user')
    users=[]
    temp_users.each do |user|
      u={}
      u[:id]=user.id
      u[:index]=users.length+1
      u[:name]=user.name
      users.push(u)
    end
    puts  users
    users
  end

  def to_user_password
    session[:change_pw_user_id] = params[:id]
    redirect_to :change_password
  end

  def modify_password
    @change_pw_user_name = User.find_by_id(session[:change_pw_user_id]).name

    #session[:change_pw_user_id]=nil
  end

  def change_password
    @change_pw_user_name = User.find_by_id(session[:change_pw_user_id]).name
    user = User.find_by_id(session[:change_pw_user_id])
    if params[:user][:password] == '' || params[:user][:confirmation] == ''
      flash.now[:notice]='输入不能为空'
      render :modify_password
    else
      if params[:user][:password] != params[:user][:password_confirmation]
        flash.now[:notice]='两次密码输入不一致'
        render :modify_password
      else
        session[:name]= user.name
        user.password = params[:user][:password]
        user.password_confirmation = params[:user][:password_confirmation]
        user.save

        session[:change_pw_user_id]=nil
        redirect_to :admin
      end
    end
  end

end