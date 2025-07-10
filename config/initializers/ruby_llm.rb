RubyLLM.configure do |config|
  config.openai_api_base = ENV.fetch("OPENAI_API_BASE", "http://localhost:11434/v1")
	config.openai_api_key = ENV.fetch("OPENAI_API_KEY", "N/A")

	config.default_model = "llama2-uncensored"
end