class Api::SnmpStatusesController < ApplicationController
  respond_to :json

  def show
    ap = Ap.find(params[:ap_id])
    #@snmp_status = SnmpStatus.get host: ap.ip
    @snmp_status = SnmpStatus.get host: 'localhost'
    if @snmp_status.errors.any?
      render json: @snmp_status.errors.full_messages, status: :not_found
    else
      respond_with @snmp_status
    end
  end

  def search
    @snmp_status = SnmpStatus.get snmp_status_params
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

  def version

  end

end
