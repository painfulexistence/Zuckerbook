class Api::V1::MessagesController < Api::V1::ApiController
  def create
    @message = current_user.messages.new(message_params)
		authorize! :create, @message
    if @message.save
      ActionCable.server.broadcast 'public_room', { content: @message.content, username: @message.user.name }
			if @message.content.starts_with?("@AI")
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
