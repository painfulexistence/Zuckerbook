class MessagesController < ApplicationController
	before_action :authenticate_user!

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      ActionCable.server.broadcast 'room_channel', { content: @message.content, username: @message.user.name }
      puts "content: #{@message.content}, username: #{@message.user.name}"
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
