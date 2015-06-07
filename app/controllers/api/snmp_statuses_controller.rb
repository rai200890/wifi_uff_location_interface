class Api::SnmpStatusesController < ApplicationController
  respond_to :json

  def show
    if params[:ap_id]
      ap = Ap.find(params[:ap_id])
      #@snmp_status = SnmpStatus.get host: ap.ip
      @snmp_status = SnmpStatus.get host: 'localhost'
    else
      @snmp_status = SnmpStatus.get snmp_status_params
    end
    if @snmp_status.errors.any?
      render json: @snmp_status.errors.full_messages, status: :not_found
    else
      respond_with @snmp_status
    end
  end

  private

  def snmp_status_params
    params.require(:host)
    params.require(:community)
    params.permit(:host, :community, :port, :version, :mib_modules, :fields)
  end
end