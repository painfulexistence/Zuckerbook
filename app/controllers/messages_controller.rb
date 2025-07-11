class MessagesController < ApplicationController
	before_action :authenticate_user!

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
			user = @message.user
      ActionCable.server.broadcast 'public_room', { content: @message.content, user: { id: user.id, name: user.name } }
			if params[:ai_mentioned]
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
