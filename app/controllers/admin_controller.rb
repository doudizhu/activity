class AdminController < ApplicationController
  require 'will_paginate/array'
  def manager_index
    #@user = User.all
    session[:success]=''
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

end