class TileBuilder
  include ActiveModel::Model

  attr_accessor :path

  def initialize params
    self.path = "#{Rails.root}/public/images/mariomundos/#{params[:z]}/#{params[:x]}/#{params[:y]}.png"
  end

  def build
    if File.exists?(path)
      true
    else
      self.errors.add(:base, 'Tile not found')
      false
    end
  end
end