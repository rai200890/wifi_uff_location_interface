class Api::ApsController < ApplicationController
  respond_to :json

  def index
    @aps = Ap.includes(location:{building: :campus})
               .includes(:ap_model)
               .includes(:ap_status)
               .includes(:control_region)
  end

  def show
    @ap = Ap.find(params[:id])
  end
end