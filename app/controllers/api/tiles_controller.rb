class Api::TilesController < ApplicationController

  respond_to :png
  def index
    path = "#{Rails.root}/public/images/tiles/#{tiles_params[:z]}/#{tiles_params[:x]}/#{tiles_params[:y]}.png"
    file = File.read(path)

    respond_with @user do |format|
      format.png do
        send_file path, type: 'image/png', disposition: 'inline'
      end
    end
  end

  def tiles_params
    params.permit(:x, :y, :z)
  end

end