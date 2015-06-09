class SnmpStatus
  include ActiveModel::Model

  attr_accessor :host, :community, :port, :version, :mib_modules, :fields, :response

  #SOURCE CODE: https://github.com/hallidave/ruby-snmp/blob/master/lib/snmp/manager.rb

  #UCD-SNMP-MIB::extOutput.30 - CHANNEL - 1.3.6.1.4.1.2021.8.1.101.30
  #UCD-SNMP-MIB::extOutput.31 - POWER - 1.3.6.1.4.1.2021.8.1.101.31

  def initialize params = {}
    @host = params[:host] || 'localhost'
    @community = params[:community] || 'public'
    @port = params[:port] || 161
    @version = params[:version].try(:to_sym) || :SNMPv2c
    @mib_modules = params[:mib_modules] || ["SNMPv2-SMI", "SNMPv2-MIB", "IF-MIB", "IP-MIB", "TCP-MIB", "UDP-MIB"]
    @fields = params[:fields] || ['sysLocation.0', '1.3.6.1.4.1.2021.8.1.101.30', '1.3.6.1.4.1.2021.8.1.101.31']
  end

  def self.get params = {}
    snmp_status = SnmpStatus.new params
    SNMP::Manager.open(snmp_status.manager_options) do |manager|
      begin
        response = manager.get(snmp_status.fields).varbind_list
        snmp_status.response = response
      rescue Exception => e
        snmp_status.errors.add(:base, e.message)
      end
    end
    snmp_status
  end

  def manager_options
    {host: host, community: community, version: version, port: port, mib_modules: mib_modules}
  end

end