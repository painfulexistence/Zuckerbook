class SessionsController < Devise::SessionsController
  respond_to :html, :json

  def create
    super do |user|
      if user.persisted?
        update_trackable_fields(user)

        if request.format.json?
          render json: {
            status: { code: 200, message: 'Signed in successfully.' },
            data: {
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                sign_in_count: user.sign_in_count,
                current_sign_in_at: user.current_sign_in_at,
                last_sign_in_at: user.last_sign_in_at
              },
              token: request.env['warden-jwt_auth.token']
            }
          }
          return
        end
      end
    end
  end

  def destroy
    super do |user|
      if user
        user.update_column(:last_sign_in_at, user.current_sign_in_at) if user.current_sign_in_at

        if request.format.json?
          render json: {
            status: { code: 200, message: 'Signed out successfully.' }
          }
          return
        end
      end
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
