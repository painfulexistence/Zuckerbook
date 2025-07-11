module Api
  module Auth
    class SessionsController < Devise::SessionsController
      respond_to :json
      skip_before_action :verify_signed_out_user, only: [:destroy]

      def create
        super do |user|
          if user.persisted?
            update_trackable_fields(user)

            render json: {
              status: { code: 200, message: 'Signed in successfully.' },
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
              status: { code: 401, message: "Invalid email or password." }
            }, status: :unauthorized
            return
          end
        end
      end

      def destroy
        if current_user
          current_user.update_column(:last_sign_in_at, current_user.current_sign_in_at) if current_user.current_sign_in_at
          super do |user|
            render json: {
              status: { code: 200, message: 'Signed out successfully.' }
            }
            return
          end
        else
          render json: {
            status: { code: 200, message: 'Already signed out.' }
          }
          return
        end
      end

      private

      def update_trackable_fields(user)
        user.update_columns(
          sign_in_count: user.sign_in_count + 1,
          current_sign_in_at: Time.current,
          last_sign_in_at: user.current_sign_in_at || Time.current,
          current_sign_in_ip: request.remote_ip,
          last_sign_in_ip: user.current_sign_in_ip || request.remote_ip
        )
      end
    end
  end
end
