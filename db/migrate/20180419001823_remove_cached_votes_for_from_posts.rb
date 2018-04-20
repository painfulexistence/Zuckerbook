class RemoveCachedVotesForFromPosts < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :cached_votes_for, :integer
  end
end
