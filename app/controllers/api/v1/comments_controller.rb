module Api
  module V1
		class CommentsController < Api::V1::ApiController
			# before_action :authenticate_user!

			# respond_to :json

			def create
				@post = Post.find(params[:post_id])
				@comment = @post.comments.build(comment_params)
				@comment.user = current_user
				authorize! :create, @comment

				if @comment.save
					@comment.create_activity key: "comment.create", owner: current_user, recipient: @post
					render json: @comment, status: :created
				else
					render_error(@comment.errors.full_messages)
				end
			end

			def update
				authorize! :update, @comment
				if @comment.update(comment_params)
          # @comment.create_activity key: 'comment.update', owner: current_user, recipient: @post
          render json: @comment
				else
          render_error(@comment.errors.full_messages)
				end
			end

			def destroy
				authorize! :destroy, @comment
				@comment.destroy
				render json: { message: 'Comment was successfully deleted.' }
			end

			private
			def comment_params
				params.permit(:content)
			end
		end
  end
end
