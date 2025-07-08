class User < ApplicationRecord
  rolify
  resourcify
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :messages

	# as followable
  has_many :passive_follows, class_name: "Follow", foreign_key: :followable_id, dependent: :destroy
  has_many :followers, through: :passive_follows, source: :follower, source_type: "User"

	# as follower
	has_many :active_follows, class_name: "Follow", foreign_key: :follower_id, dependent: :destroy
  has_many :followees, through: :active_follows, source: :followable, source_type: "User"

  has_one_attached :avatar

  include PublicActivity::Model
  tracked

  after_create :set_role

	def following?(other)
  	followees.include?(other)
	end

  def follow(other)
    return if self == other || following?(other)
    active_follows.create(followable: other, follower: self)
  end

  def unfollow(other)
    active_follows.find_by(followable: other)&.destroy
  end

  def followers_count
    followers.count
  end

  def following_count
    followees.count
  end

	private
  def set_role
    add_role(:newbie) if roles.blank?
  end
end
