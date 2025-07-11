class Api::V1::MessagesController < Api::V1::ApiController
  def create
    @message = current_user.messages.build(message_params)
		authorize! :create, @message
    if @message.save
			user = @message.user
			ActionCable.server.broadcast 'public_room', { content: @message.content, user: { id: user.id, name: user.name } }
			if params[:ai_mentioned]
				# context = params.permit(context: [:id, :text, :sender]).to_h.dig(:context)
				LlmChatWorker.perform_async(@message.id)
			end
			head :ok
    else
      head :unprocessable_entity
    end
  end

  private
  def message_params
    params.require(:message).permit(:content)
  end
end
