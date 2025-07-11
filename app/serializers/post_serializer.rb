class PostSerializer
	include JSONAPI::Serializer

  attributes :id, :body, :created_at, :updated_at, :public

  belongs_to :user, serializer: UserSerializer
  has_many :comments, serializer: CommentSerializer

  attribute :likes_count do |post|
    post.cached_votes_score
  end

  attribute :comment_count do |post|
    post.comments.size
  end
end
