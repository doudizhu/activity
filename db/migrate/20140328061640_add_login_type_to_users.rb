class AddLoginTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :login_type, :string, :default => 'user'
  end
end
