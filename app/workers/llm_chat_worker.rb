class LlmChatWorker
  include Sidekiq::Worker

  def perform(message_id)
		message = Message.find_by(id: message_id)
		return if message.nil?

		chat = RubyLLM.chat(model: "llama2-uncensored:latest", provider: :openai, assume_model_exists: true)
		response = ""
		chat.ask(message.content) do |chunk|
			next if chunk.content.nil?
			response << chunk.content
		end

		ActionCable.server.broadcast 'public_room', { content: response, user: { id: 0, name: "Bot" } }
  end
end