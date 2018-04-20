class Comment < ApplicationRecord
  resourcify

  belongs_to :post, touch: true
  belongs_to :user

  include PublicActivity::Model
  tracked

end
