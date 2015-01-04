class CreateMyactivities < ActiveRecord::Migration
  def change
    create_table :myactivities do |t|
      t.string :user
      t.string :name
      t.string :status

      t.timestamps
    end
  end
end
