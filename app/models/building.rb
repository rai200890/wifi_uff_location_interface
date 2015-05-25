class Building < ActiveRecord::Base
  belongs_to :campus
  has_many :locations

  delegate :name, to: :campus, prefix: true, allow_nil: true

  validates :name, presence: true, uniqueness: { scope: :campus_id }
  validates :campus, presence: true
end
