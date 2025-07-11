source 'https://rubygems.org'
ruby "3.4.4"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Rails framework
gem 'rails', '~> 8.0.2'

# Web server
gem 'puma', '~> 6.6'

# Asset pipeline
gem 'propshaft'
gem 'jsbundling-rails'
gem 'cssbundling-rails', '~> 1.1'

# Database
group :development, :test do
  gem 'sqlite3', '~> 2.7'
end

group :production do
  gem 'pg', '~> 1.5.0'
end

# Authentication & Authorization
gem 'devise'
gem "devise-jwt", "~> 0.12.1"
gem 'rolify'
gem 'cancancan', '~> 3.0'
gem 'jsonapi-serializer'

# Social features
gem 'acts_as_votable'
gem 'public_activity'

# File uploads
gem "image_processing", "~> 1.2"
gem 'cloudinary'

# Pagination
gem "kaminari", "~> 1.2"

# Background jobs
gem 'sidekiq'

# Redis for ActionCable, caching, and job queue
gem 'redis', '~> 5.0'

# LLM
gem "ruby_llm", "~> 1.3"

# GraphQL
gem "graphql", "~> 2.5"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Search features
# gem 'bonsai-elasticsearch-rails'
# gem 'elasticsearch-model', '= 0.1.9'
# gem 'elasticsearch-rails', '= 0.1.9'
gem "searchkick", "~> 5.5"
gem "elasticsearch", "~> 9.0"

# Development tools
group :development, :test do
  gem 'capybara', '~> 3.40'
  gem 'selenium-webdriver'
  gem 'brakeman', require: false
	gem 'graphiql-rails'
	gem 'rswag-ui'
	gem 'faker'
end

group :development do
  gem 'web-console', '>= 4.2.0'
  gem 'listen', '~> 3.9'
  gem 'spring'
  gem 'bullet'
  gem 'oink' # memory monitoring
  gem 'lolize', :require => 'lolize/auto'
  gem 'ruby_cowsay', '~> 0.1.2'
end