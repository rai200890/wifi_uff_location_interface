class SnmpStatus
  include ActiveModel::Model

  attr_accessor :host, :community, :protocol, :port, :version, :mib_modules

  VERSIONS = [:SNMPv1, :SNMPv2c]

  def initialize params = {}
    @host = params[:host]
    @community = params[:community]
    @protocol = params[:protocol]
    @port = params[:port]
    @version = params[:version]
    @mib_modules = params[:mib_modules]
  end

  def get fields = ['sysDescr.0']
    SNMP::Manager.open(manager_options) do |manager|
      begin
        response = manager.get(fields)
      rescue Exception => e
        self.errors.add(:base, e.message)
        false
      end
    end
  end

  private

  def manager_options
    {host: host, community: community, version: version, port: port, mib_modules: mib_modules}
  end

end