class Api::ApsController < ApplicationController
  protect_from_forgery with: :null_session
  respond_to :json

  def index
    @aps = Ap.includes(location:{floor:{building: :campus}})
               .includes(:ap_model)
               .includes(:ap_status)
               .includes(:control_region)
  end

  def show
    @ap = Ap.find(params[:id])
  end

  def update
    @ap = Ap.find(params[:id])
    @ap = @ap.update_attributes(ap_params)
    respond_with @ap
  end

  private

  def ap_params
    params.require(:ap).permit(:latitude, :longitude)
  end

end