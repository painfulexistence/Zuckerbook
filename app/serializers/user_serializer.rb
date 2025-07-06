class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :name, :birthday, :created_at, :updated_at,
             :sign_in_count, :current_sign_in_at, :last_sign_in_at,
             :current_sign_in_ip, :last_sign_in_ip

  attribute :avatar_url do |user|
    if user.avatar.attached?
      Rails.application.routes.url_helpers.rails_blob_url(user.avatar)
    else
      nil
    end
  end
end
