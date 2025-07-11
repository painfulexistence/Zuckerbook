class FixVotesTable < ActiveRecord::Migration[8.0]
  def change
    drop_table :votes, if_exists: true

    create_table :votes do |t|
      t.references :votable, polymorphic: true, null: false
      t.references :voter, polymorphic: true, null: false
      t.boolean :vote_flag
      t.string :vote_scope
      t.integer :vote_weight

      t.timestamps
    end

    add_index :votes, %i[voter_id voter_type vote_scope]
    add_index :votes, %i[votable_id votable_type vote_scope]
  end
end
