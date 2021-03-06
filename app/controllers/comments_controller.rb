class CommentsController < ApplicationController
  before_action :authenticate_user!
  check_authorization

  def create

    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user
    authorize! :create, @comment

    if @comment.save
      redirect_back fallback_location: posts_path
      @comment.create_activity key: "comment.create", owner: current_user, recipient: @post
    else
      flash[:error] = "Some erorrs occur, try again later!"
    end

  end

  def update
    authorize! :update, @comment
  end

  def destroy
    authorize! :destroy, @comment
  end

  private
  def comment_params
    params.permit(:content)
  end
end
