module Api
  module V1
    class ActivitiesController < Api::V1::ApiController
      before_action :set_activity_model, only: [:log, :index, :show]

			def log
				authorize! :log, @activity_model
				@activities = @activity_model
					.where(owner_id: current_user.id)
					.includes(:owner, :recipient)
					.limit(20)
					.order("created_at DESC")
				render json: ActivitySerializer.new(@activities).serializable_hash
			end

			def index
				authorize! :index, @activity_model
				@activities = @activity_model
					.includes(:owner, :recipient)
					.order("created_at DESC")
				render json: ActivitySerializer.new(@activities).serializable_hash
			end

			def show
				authorize! :show, @activity_model
				@activities = @activity_model
					.where(owner_id: params[:id])
					.includes(:owner, :recipient)
					.order("created_at DESC")
				# @activities = @activity_model.where(owner_id: params[:id]).includes(:owner, :recipient).order("created_at DESC")
				# if params[:id] == current_user.id
				#   authorize! :show, @activities.first
				# else
				#   authorize! :index, @activity_model
				# end
				render json: ActivitySerializer.new(@activities).serializable_hash
			end

      private

      def set_activity_model
        @activity_model = PublicActivity::Activity
      end
    end
  end
end


