#noinspection RubyArgCount
#require '../../app/models/activity'
class PhoneController < ApplicationController
  # To change this template use File | Settings | File Templates.
  skip_before_filter :verify_authenticity_token, :only => [:create_activity]
  def phone_login
    @user = session[:login_user]
    #@activity =Tctivity.new
  end

  def create_activity
    #puts '======================'+params[:activity]
    #puts '----------------------'+session[:login_user]
    @activity = Myactivity.new({user:session[:login_user], name:params[:activity], status:'init'})
    #@activity = Myactivity.new({user:'session[:login_user]', name:'params[:activity]', status:'init'})
    @activity.save
    respond_to do |format|
      format.json { render :json => "success" }
    end
  end

end