class AddIndexPostsOnUpdatedAt < ActiveRecord::Migration[8.0]
	def change
    add_index :posts, [:user_id, :created_at], order: { created_at: :desc }
    add_index :posts, [:created_at], order: { created_at: :desc }
	end
end
