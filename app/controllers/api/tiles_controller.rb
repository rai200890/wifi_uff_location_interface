class Api::TilesController < ApplicationController

  respond_to :png

  def index
    path = "#{Rails.root}/public/images/tiles/blueprint/#{tiles_params[:z]}/#{tiles_params[:x]}/#{tiles_params[:y]}.png"
    respond_with do |format|
      format.png do
        if File.exists? path
          send_file path, type: 'image/png', disposition: 'inline'
        else
          render nothing: true, status: 404
        end
      end
    end
  end

  def tiles_params
    params.permit(:x, :y, :z)
  end

end