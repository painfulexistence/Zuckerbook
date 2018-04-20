class FriendshipsController < ApplicationController
  before_action :authenticate_user!
  check_authorization

  def create
    @friendship = current_user.friendships.build(friend_id: params[:friend_id])
    authorize! :create, @friendship

    if @friendship.save
      flash[:notice] = "Successfully sending your request"
      redirect_back fallback_location: posts_path
      @friend = User.find(params[:friend_id])
      current_user.create_activity key: "friendship.create", owner: current_user, recipient: @friend
    else
      render 'new'
    end
  end

  def destroy
    @friendship = current_user.friendships.find(params[:id])
    authorize! :destroy, @friendship

    @friend = User.find(@friendship.friend_id)
    # the friendship would be destroy so set friend earlier is necessary
    @friendship.destroy
    flash[:notice] = "Successfully unfriend"
    redirect_back fallback_location: posts_path
    # also do not call friendship here coz it is deleted
    current_user.create_activity key: "friendship.create", owner: current_user, recipient: @friend
  end

end
