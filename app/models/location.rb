class Location < ActiveRecord::Base
  belongs_to :floor

  delegate :name, to: :building, prefix: true, allow_nil: true
  delegate :campus_name, to: :building, allow_nil: true

  validates :name, uniqueness: { scope: :floor_id }
  validates :floor, presence: true
end