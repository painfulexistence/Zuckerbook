class RoomsController < ApplicationController
  def index
    @messages = Message.all
  end
end
