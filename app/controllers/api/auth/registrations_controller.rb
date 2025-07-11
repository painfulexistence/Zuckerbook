module Api
  module Auth
    class RegistrationsController < Devise::RegistrationsController
      respond_to :json
      before_action :configure_sign_up_params, only: [:create, :update]

      def create
        super do |user|
          if user.persisted?
            sign_in(user) # sign in automatically after registration
            render json: {
              status: { code: 200, message: 'Signed up successfully.' },
							# TODO: use UserSerializer
              data: {
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  avatar_url: user.avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(user.avatar) : ActionController::Base.helpers.asset_path('eye.jpg'),
                  sign_in_count: user.sign_in_count,
                  current_sign_in_at: user.current_sign_in_at,
                  last_sign_in_at: user.last_sign_in_at
                },
                token: request.env['warden-jwt_auth.token']
              }
            }
						return
          else
            render json: {
              status: { code: 422, message: "Sign up failed." },
              errors: user.errors.full_messages
            }, status: :unprocessable_entity
						return
          end
        end
      end

			def update
				super do |user|
					if user.persisted?
						render json: { status: { code: 200, message: 'Account updated successfully.' } }
						return
					else
						render json: {
							status: { code: 422, message: "Account update failed." },
							errors: user.errors.full_messages
						}, status: :unprocessable_entity
						return
					end
				end
			end

			def destroy
				super do |user|
					render json: { status: { code: 200, message: 'Account deleted successfully.' } }
					return
				end
			end

      private

      def configure_sign_up_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
      end
    end
  end
end
