class AddCachedVotesForToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :cached_votes_for, :integer, default: 0
  end
end
