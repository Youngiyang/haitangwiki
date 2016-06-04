class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :mood
      t.string :spell
      t.text :mean
      t.text :example
      t.integer :categroy_id
      t.timestamps null: false
    end
  end
end
