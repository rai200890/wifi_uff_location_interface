class Ap < ActiveRecord::Base
  belongs_to :location
  belongs_to :ap_model
  belongs_to :ap_status
  belongs_to :control_region
  validates :name, presence: true, uniqueness: true

  delegate :name, to: :location, prefix: true, allow_nil: true
  delegate :building_name, to: :location, allow_nil: true
  delegate :campus_name, to: :location, allow_nil: true

  delegate :name, to: :ap_model, prefix: true, allow_nil: true
  delegate :name, to: :ap_status, prefix: true, allow_nil: true
  delegate :name, to: :control_region, prefix: true, allow_nil: true
end
