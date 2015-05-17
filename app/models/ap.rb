class Ap < ActiveRecord::Base
  belongs_to :location
  belongs_to :ap_model
  belongs_to :ap_status
  belongs_to :control_region
  validates :name, presence: true, uniqueness: true
end
