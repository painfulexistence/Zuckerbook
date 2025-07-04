class RoomChannel < ApplicationCable::Channel
  # default callbacks

  def subscribed
    stream_from 'room_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
  end
end
