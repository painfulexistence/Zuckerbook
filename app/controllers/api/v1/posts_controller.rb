module Api
  module V1
    class PostsController < Api::V1::ApiController
			# before_action :authenticate_user!
			before_action :set_post, only: %i[show update destroy like]

			# respond_to :json

      def index
				authorize! :index, Post
				#     search = Post.search(include: [:user]) do
				#       fulltext params[:key]
				#       order_by(:updated_at, :desc)
				#       # by default sunspot will do pagination for us and :per_page = 30
				#       # paginate(page: 2, per_page: 15)
				#     end
				#     @posts = search.results
				@posts = if params[:key]
					Post.search(params[:key], misspellings: false) # note that this returns a Searchkick::Relation object, not an ActiveRecord::Relation object
					.includes(:comments, user: :avatar_attachment)
					.order(created_at: :desc)
					.limit(100)
				else
					Post.includes(:comments, user: :avatar_attachment)
					.order(created_at: :desc)
					.limit(100)
				end
				# render json: @posts
				render json: PostSerializer.new(@posts, include: [:user]).serializable_hash
      end

      def show
				authorize! :show, @post
				# render json: @post
        render json: PostSerializer.new(@post, include: [:user]).serializable_hash
      end

      def create
        @post = Post.new(post_params)
        @post.user = current_user
				authorize! :create, @post

        if @post.save
          @post.create_activity key: 'post.create', owner: current_user, recipient: @post
					# render json: @post, status: :created
          render json: PostSerializer.new(@post).serializable_hash, status: :created
        else
          render_error(@post.errors.full_messages)
        end
      end

      def update
				authorize! :update, @post
        if @post.update(post_params)
          @post.create_activity key: 'post.update', owner: current_user, recipient: @post
					# render json: @post
          render json: PostSerializer.new(@post).serializable_hash
        else
          render_error(@post.errors.full_messages)
        end
      end

      def destroy
				authorize! :destroy, @post
				# @post.create_activity key: "post.destroy", owner: current_user, recipient: @post
				@post.destroy
        render json: { message: 'Post was successfully deleted.' }
      end

      def like
				authorize! :like, @post
        @post.liked_by current_user
        @post.create_activity key: 'post.like', owner: current_user, recipient: @post
        render json: { message: 'Post liked successfully' }
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
				# params.require(:post).permit(:body, :key, comments_attributes: [:content])
        params.require(:post).permit(:body)
      end
    end
  end
end