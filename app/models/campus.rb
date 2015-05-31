class Campus < ActiveRecord::Base
  has_many :buildings
  validates :name, presence: true, uniqueness: true
end
