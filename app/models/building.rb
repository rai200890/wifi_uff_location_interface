class Building < ActiveRecord::Base
  belongs_to :campus
  has_many :floors

  validates :name, presence: true, uniqueness: { scope: :campus_id }
  validates :campus, presence: true
end
