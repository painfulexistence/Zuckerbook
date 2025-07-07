class Api::V1::FriendshipsController < Api::V1::ApiController
  def create
    @friendship = current_user.friendships.build(friend_id: params[:friend_id])
    authorize! :create, @friendship

    if @friendship.save
      @friend = User.find(params[:friend_id])
      current_user.create_activity key: "friendship.create", owner: current_user, recipient: @friend
			render json: { message: "Successfully sending your request" }, status: :created
    else
      render json: { error: @friendship.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @friendship = current_user.friendships.find(params[:id])
    authorize! :destroy, @friendship

    @friend = User.find(@friendship.friend_id)
    @friendship.destroy
    current_user.create_activity key: "friendship.destroy", owner: current_user, recipient: @friend
    render json: { message: "Successfully unfriend" }, status: :ok
  end

end
