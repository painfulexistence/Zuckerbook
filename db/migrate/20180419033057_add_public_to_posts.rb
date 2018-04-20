class AddPublicToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :public, :boolean, default: false, null: false
  end
end
