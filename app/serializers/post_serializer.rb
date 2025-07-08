class PostSerializer
	include JSONAPI::Serializer

  attributes :id, :body, :created_at, :updated_at, :public

  belongs_to :user, serializer: UserSerializer

  attribute :likes_count do |post|
    post.cached_votes_score
  end

  attribute :comments_count do |post|
    post.comments.size
  end
end
