class Reservation < ApplicationRecord
  validates :restaurant, :booker, :date, :time, presence: true
  validates :booker, uniqueness: {scope: [:restaurant, :date]}
end
