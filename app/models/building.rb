class Building < ActiveRecord::Base
  belongs_to :campus
  has_many :locations
  validates :name, presence: true, uniqueness: true
end
