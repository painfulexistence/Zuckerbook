class HomeController < ApplicationController
  def index
    if user_signed_in?
      redirect_to posts_path
    else
      @posts = Post.includes(:user).where(public: true).order('updated_at DESC')
    end
  end
end
