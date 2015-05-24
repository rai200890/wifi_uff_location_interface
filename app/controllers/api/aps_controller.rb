class Api::ApsController < ApplicationController

  def index
    @aps = Ap.includes(location:{building: :campus})
               .includes(:ap_model)
               .includes(:ap_status)
               .includes(:control_region)
  end
end