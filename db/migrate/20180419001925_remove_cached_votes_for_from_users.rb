class RemoveCachedVotesForFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :cached_votes_for, :integer
  end
end
