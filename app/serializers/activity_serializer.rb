class ActivitySerializer
  include JSONAPI::Serializer

  attributes :key, :created_at, :updated_at

  belongs_to :owner, serializer: UserSerializer
  belongs_to :recipient, serializer: UserSerializer, optional: true

  attribute :activity_type do |activity|
    activity.key
  end

  attribute :summary do |activity|
    case activity.key
    when 'post.create'
      "#{activity.owner.name} posted a new post"
    when 'post.like'
      "#{activity.owner.name} liked a post"
    when 'user.follow'
      "#{activity.owner.name} followed #{activity.recipient.name}"
    when 'user.unfollow'
      "#{activity.owner.name} unfollowed #{activity.recipient.name}"
    else
      activity.key
    end
  end
end
