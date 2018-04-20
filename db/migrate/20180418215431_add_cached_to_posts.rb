class AddCachedToPosts < ActiveRecord::Migration[5.1]
  def change
    change_table :posts do |t|
      t.integer :cached_votes_total, default: 0
      t.integer :cached_votes_score, default: 0
      t.integer :cached_votes_up, default: 0
      t.integer :cached_votes_down, default: 0
    end
    Post.find_each(&:update_cached_votes)
  end
end
