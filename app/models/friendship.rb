class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: "User"

  include PublicActivity::Model
  tracked

end
