class Api::SnmpStatusesController < ApplicationController
  respond_to :json

  def show
    ap = Ap.find(params[:ap_id])
    #snmp_status = SnmpStatus.new ap
    snmp_status = SnmpStatus.new
    respond_with snmp_status.get
  end

end