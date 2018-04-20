class User < ApplicationRecord
  rolify
  resourcify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :friendships, dependent: :destroy
  acts_as_followable
  acts_as_follower

  mount_uploader :image, ImageUploader

  include PublicActivity::Model
  tracked

  after_create :set_role

  private
  def set_role
    self.add_role(:newbie) if self.roles.blank?
  end

end
