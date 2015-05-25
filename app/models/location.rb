class Location < ActiveRecord::Base
  belongs_to :building

  delegate :name, to: :building, prefix: true, allow_nil: true
  delegate :campus_name, to: :building, allow_nil: true

  validates :name, uniqueness: { scope: :building_id }
  validates :building, presence: true
end