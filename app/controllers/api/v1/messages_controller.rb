class Api::V1::MessagesController < Api::V1::ApiController
  def create
    @message = current_user.messages.new(message_params)
		authorize! :create, @message
    if @message.save
      ActionCable.server.broadcast 'room_channel', { content: @message.content, username: @message.user.name }
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
