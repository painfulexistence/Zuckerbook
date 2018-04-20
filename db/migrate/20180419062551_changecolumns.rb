class Changecolumns < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :body, :text, null: false
    change_column :users, :name, :string, null: false
  end
end
