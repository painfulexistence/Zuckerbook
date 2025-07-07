module Api
  module V1
    class UsersController < Api::V1::ApiController
      before_action :set_user, only: %i[show update follow unfollow ban warn]

      def index
        @users = User.all
        # TODO: use user serializer
        render json: @users
      end

      def show
        # TODO: use user serializer
        render json: @user
      end

      def update
        if @user.update(user_params)
          # TODO: use user serializer
          render json: @user
        else
          render_error(@user.errors.full_messages)
        end
      end

      def follow
        current_user.follow(@user)
        current_user.create_activity key: 'user.follow', owner: current_user, recipient: @user
        render json: { message: "Successfully followed #{@user.name}" }
      end

      def unfollow
        current_user.unfollow(@user)
        current_user.create_activity key: 'user.unfollow', owner: current_user, recipient: @user
        render json: { message: "Successfully unfollowed #{@user.name}" }
      end

      def ban
        @user.banned = true
        if @user.save
          current_user.create_activity key: 'user.ban', owner: current_user, recipient: @user
          render json: { message: "User #{@user.name} was banned." }
        else
          render_error(@user.errors.full_messages)
        end
      end

      def warn
        current_user.create_activity key: 'user.warn', owner: current_user, recipient: @user
        render json: { message: "User #{@user.name} was warned." }
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:name, :email, :birthday)
      end
    end
  end
end
