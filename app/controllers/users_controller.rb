class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :follow, :unfollow, :block, :ban]
  check_authorization


  def index
    authorize! :index, User
    @users = User.all
  end

  def show
    authorize! :show, @user
    @posts = @user.posts.order("updated_at DESC")
  end

  def follow
    authorize! :follow, @user
    current_user.follow(@user)
    redirect_back fallback_location: user_profile_path(@user)
    current_user.create_activity key: "user.follow", owner: current_user, recipient: @user
  end

  def unfollow
    authorize! :unfollow, @user
    current_user.unfollow(@user)
    redirect_back fallback_location: user_profile_path(@user)
    current_user.create_activity key: "user.unfollow", owner: current_user, recipient: @user
  end

  def block
    # unfinished
    @user.block(@user)
  end

  def ban
    authorize! :ban, @user
    @user.banned = true
    if @user.save
      flash[:notice] = "User #{@user.name} was banned."
      current_user.create_activity key: "user.ban", owner: current_user, recipient: @user
    end
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :birthday, :image)
  end
end
