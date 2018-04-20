class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:front]
  before_action :set_post, only: [:show, :edit, :update, :destroy, :like]
  check_authorization
  skip_authorization_check only: [:front]

  def front
    @posts = Post.includes(:user).where(public: true).order("updated_at DESC")
  end

  def index
    authorize! :index, Post
=begin
    search = Post.search(include: [:user]) do
      fulltext params[:key]
      order_by(:updated_at, :desc)
      # by default sunspot will do pagination for us and :per_page = 30
      # paginate(page: 2, per_page: 15)
    end
    @posts = search.results

    # If do without sunspot:
    # @posts = Post.order("updated_at DESC").paginate(page: params[:page], per_page: 10)
=end
    if params[:key]
      @results = Post.search(params[:key])
      @posts = @results.records.includes(:user).order("updated_at DESC")
    else
      @posts = Post.includes(:user).order("updated_at DESC")
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
      @post.create_activity key: "post.create", owner: current_user, recipient: @post
    else
      render :new
    end
  end


  def update
    authorize! :update, @post
    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
      @post.create_activity key: "post.update", owner: current_user, recipient: @post
    else
      render :edit
    end
  end

  def destroy
    authorize! :destroy, @post
    @post.destroy
    redirect_to posts_path, notice: 'Post was successfully destroyed.'
    @post.create_activity key: "post.destroy", owner: current_user, recipient: @post
  end

  def like
    authorize! :like, @post
    @post.liked_by current_user
    redirect_back fallback_location: posts_path
    @post.create_activity key: "post.like", owner: current_user, recipient: @post
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
