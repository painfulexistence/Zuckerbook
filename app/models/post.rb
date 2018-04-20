class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  acts_as_votable
  resourcify

  include PublicActivity::Model
  tracked
  # tracked owner: Proc.new{ |controller, model| controller.current_user }

  searchable do
    text :body
    text :comments do
        comments.map { |comment| comment.content }
    end
    integer :user_id
    time :updated_at
    time :created_at
  end
end
