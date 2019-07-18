class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.string :restaurant, null: false
      t.string :booker, null: false
      t.date :date, null: false
      t.time :time, null: false
      t.timestamps
    end
    add_index :reservations, [:restaurant, :booker, :date], unique: true
    add_index :reservations, :booker
  end
end