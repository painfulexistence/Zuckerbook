class AddCachedVotesForToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :cached_votes_for, :integer, default: 0
  end
end
