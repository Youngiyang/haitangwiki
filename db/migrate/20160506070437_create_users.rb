class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :mobile, null: false
      t.string :verify_code, null: false
      t.string :password_digest, null: false
      t.boolean :is_admin, default: false
      t.timestamps null: false
    end
    add_index :users, :mobile, unique: true
  end
end
