class Location < ActiveRecord::Base
  belongs_to :floor

  validates :name, uniqueness: { scope: :floor_id }
  validates :floor, presence: true
end