class CommentSerializer
	include JSONAPI::Serializer

	attributes :id, :content, :created_at, :updated_at, :post_id

	belongs_to :user, serializer: UserSerializer
end