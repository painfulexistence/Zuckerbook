class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_forgery_protection if: -> { request.format.json? }

  include PublicActivity::StoreController

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :configure_sign_up_params, if: :devise_controller?
  before_action :configure_account_update_params, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    if request.format.json?
      render json: { error: "Not authorized" }, status: :forbidden
    else
      redirect_back fallback_location: posts_path, notice: "Not authorized!"
    end
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :birthday])
  end
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :birthday])
  end
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar, :birthday])
  end
end
