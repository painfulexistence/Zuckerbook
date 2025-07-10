Searchkick.client = Elasticsearch::Client.new(
  url: ENV.fetch("ELASTICSEARCH_URL", 'http://localhost:9200'),
  api_key: ENV["ELASTIC_API_KEY"],
  timeout: 30
)
