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

  # 	searchable do
  # 		text :body
  # 		text :comments do
  # 				comments.map { |comment| comment.content }
  # 		end
  # 		integer :user_id
  # 		time :updated_at
  # 		time :created_at
  # 	end

  # This function will be called by PostsController

  # 	def self.search(query)
  # 		__elasticsearch__.search(query) do
  # 			#########  DSL  ###########
  # 		end
  # 	end
end

# TODO: Elasticsearch
# Post.import(force: true)
