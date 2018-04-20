class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include PublicActivity::StoreController

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :configure_sign_up_params, if: :devise_controller?
  before_action :configure_account_update_params, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    redirect_back fallback_location: posts_path, notice: "Not allowed to do that! No authorization."
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image, :birthday])
  end
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image, :birthday])
  end
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image, :birthday])
  end
end
