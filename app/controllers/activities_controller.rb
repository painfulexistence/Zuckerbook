class ActivitiesController < ApplicationController
  check_authorization
  before_action :authenticate_user!
  before_action :set_activity

  def index
    @activities = @activities_model.includes(:owner, :recipient).order("created_at DESC")
    authorize! :index, @activities_model
  end

  def show
    @activities = @activities_model.where(owner_id: params[:id]).includes(:owner, :recipient).order("created_at DESC")
    authorize! :index, @activities_model
  end

  private
  def set_activity
    @activities_model = PublicActivity::Activity
  end
end
