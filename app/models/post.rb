# require 'elasticsearch/model'

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  acts_as_votable
  resourcify

  include PublicActivity::Model
  tracked
  # tracked owner: Proc.new{ |controller, model| controller.current_user }

	# include Elasticsearch::Model
  # include Elasticsearch::Model::Callbacks
	searchkick

	# searchable do
	# 	text :body
	# 	text :comments do
	# 			comments.map { |comment| comment.content }
	# 	end
	# 	integer :user_id
	# 	time :updated_at
	# 	time :created_at
	# 	# To reindex, run Post.includes(:comments).import(force: true) in the Rails console
	# end
	def search_data
    {
      body: body,
      comments: comments.map(&:content),
      user_id: user_id,
      updated_at: updated_at,
      created_at: created_at
    }
		# To reindex, run Post.includes(:comments).reindex() in the Rails console
	end
end
