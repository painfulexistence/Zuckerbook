module Api
  module V1
    class ApiController < ActionController::API
			before_action :authenticate_user!
			check_authorization

			respond_to :json

      rescue_from ActiveRecord::RecordNotFound, with: :not_found
      rescue_from CanCan::AccessDenied, with: :forbidden

      private

      def not_found
        render json: { error: 'Resource(s) not found' }, status: :not_found
      end

      def forbidden
        render json: { error: 'Access denied' }, status: :forbidden
      end

      def render_error(errors, status = :unprocessable_entity)
        render json: { errors: errors }, status: status
      end
    end
  end
end
