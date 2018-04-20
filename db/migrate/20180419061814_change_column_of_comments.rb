class ChangeColumnOfComments < ActiveRecord::Migration[5.1]
  def change
    change_column :comments, :content, :text, null: false
  end
end
