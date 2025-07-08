module Api
  module V1
    class UsersController < Api::V1::ApiController
			before_action :set_user, only: [:show, :follow, :unfollow, :block, :ban]

			def index
				authorize! :index, User
				@users = User.all.limit(100)
				# render json: @users
				render json: UserSerializer.new(@users).serializable_hash
			end

			def show
				authorize! :show, @user
				# @posts = @user.posts.order("updated_at DESC")
				# render json: @user
				render json: UserSerializer.new(@user, include: [:posts]).serializable_hash
			end

			def follow
				authorize! :follow, @user
				current_user.follow(@user)
				current_user.create_activity key: "user.follow", owner: current_user, recipient: @user
				render json: { message: "Successfully followed #{@user.name}" }
			end

			def unfollow
				authorize! :unfollow, @user
				current_user.unfollow(@user)
				current_user.create_activity key: "user.unfollow", owner: current_user, recipient: @user
				render json: { message: "Successfully unfollowed #{@user.name}" }
			end

			def block
				# TODO: unfinished?
				@user.block(@user)
				render json: { message: "User #{@user.name} was blocked." }
			end

			def ban
				authorize! :ban, @user
				@user.banned = true
				if @user.save
					current_user.create_activity key: "user.ban", owner: current_user, recipient: @user
					render json: { message: "User #{@user.name} was banned." }
				else
					render_error(@user.errors.full_messages)
				end
			end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:name, :email, :birthday, :avatar)
      end
    end
  end
end
