Elasticsearch::Model.client = Elasticsearch::Client.new url: ENV['BONSAI_URL']
puts "initializer is running"
