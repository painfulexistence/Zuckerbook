class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: %i[show edit update destroy like]
  check_authorization

  respond_to :html, :json

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
			.includes(
				user: :avatar_attachment,
				comments: { user: :avatar_attachment }
			)
			.order(created_at: :desc)
			.limit(100)
		else
			Post.includes(
				user: :avatar_attachment,
				comments: { user: :avatar_attachment }
			)
			.order(created_at: :desc)
			.limit(100)
		end

    respond_to do |format|
      format.html
      format.json { render json: @posts }
    end
  end

  def show
    authorize! :show, @post
  end

  def new
    @post = Post.new
    @post.user = current_user
    authorize! :new, @post
  end

  def edit
    authorize! :edit, @post
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    authorize! :create, @post

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
      @post.create_activity key: 'post.create', owner: current_user, recipient: @post
    else
      render :new
    end
  end

  def update
    authorize! :update, @post
    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
      @post.create_activity key: 'post.update', owner: current_user, recipient: @post
    else
      render :edit
    end
  end

  def destroy
    authorize! :destroy, @post
    # @post.create_activity key: "post.destroy", owner: current_user, recipient: @post
    @post.destroy
    redirect_to posts_path, notice: 'Post was successfully destroyed.'
  end

  def like
    authorize! :like, @post
    @post.liked_by current_user

    respond_to do |format|
      format.turbo_stream { redirect_back fallback_location: posts_path }
      format.html { redirect_back fallback_location: posts_path }
    end
    @post.create_activity key: 'post.like', owner: current_user, recipient: @post
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_params
    # if use nested attributes:
    # params.require(:post).permit(:body, :key, comments_attributes: [:content])
    params.require(:post).permit(:body)
  end
end
