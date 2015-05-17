class ApModel < ActiveRecord::Base
  has_many :aps
  validates :name, presence: true, uniqueness: true
end
