class SearchReindexWorker
  include Sidekiq::Worker

  def perform
		Post.includes(:comments).reindex()
  end
end