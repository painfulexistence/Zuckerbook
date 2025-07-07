class PostSerializer
	include JSONAPI::Serializer

  attributes :id, :body, :created_at, :updated_at

  belongs_to :user

  attribute :likes_count do |post|
    post.get_likes.size
  end

  attribute :comments_count do |post|
    post.comments.count
  end
end
