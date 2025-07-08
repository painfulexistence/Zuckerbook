class ActivitiesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_activity, only: [:log, :index, :show]
  check_authorization

  def log
    authorize! :log, @activities_model
    @activities = @activities_model.where(owner_id: current_user.id).includes(:owner, :recipient).limit(20).order("created_at DESC")
  end

  def index
    authorize! :index, @activities_model
    @activities = @activities_model.includes(:owner, :recipient).order("created_at DESC").limit(100)
  end

	def show
    authorize! :show, @activities_model
    @activities = @activities_model.where(owner_id: params[:id]).includes(:owner, :recipient).order("created_at DESC")
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
