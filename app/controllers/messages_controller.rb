class MessagesController < ApplicationController

  def index
    @messages = current_user.messages
  end


  def new
    @message = current_user.messages.new
  end

  def create
    @message = current_user.messages.build(message_params)
    if @message.save
      ActionCable.server.broadcast "room_channel", content: @message.content, username: @message.user.name
      puts "content: #{@message.content}, username: #{@message.user.name}"
    else
      render 'new'
    end
  end


  private
  def message_params
    params.require(:message).permit(:content)
  end
end
