class ActivitiesController < ApplicationController
  check_authorization
  before_action :authenticate_user!
  before_action :set_activity, only: [:log, :index, :show]

  def log
    @activities = @activities_model.where(owner_id: current_user.id).includes(:owner, :recipient).limit(20).order("created_at DESC")
    authorize! :log, @activities_model
  end

  def index
    @activities = @activities_model.includes(:owner, :recipient).order("created_at DESC")
    authorize! :index, @activities_model
  end

  def show

    @activities = @activities_model.where(owner_id: params[:id]).includes(:owner, :recipient).order("created_at DESC")
    authorize! :show, @activities_model

    # @activities = @activities_model.where(owner_id: params[:id]).includes(:owner, :recipient).order("created_at DESC")
    # if params[:id] == current_user.id
    #   authorize! :show, @activities.first
    # else
    #   authorize! :index, @activities_model
    # end

  end

  private
  def set_activity
    @activities_model = PublicActivity::Activity
  end

end
