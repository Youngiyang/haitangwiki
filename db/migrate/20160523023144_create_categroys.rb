class CreateCategroys < ActiveRecord::Migration
  def change
    create_table :categroys do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
