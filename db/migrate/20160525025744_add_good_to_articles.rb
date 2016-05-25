class AddGoodToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :good, :string
  end
end
