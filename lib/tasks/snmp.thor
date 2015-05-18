#encoding: utf-8
require 'roo'
require 'snmp'
require 'thor/rails'
require 'byebug'
class Snmp < Thor
  include Thor::Rails
  method_option :host, :aliases => "-h", :desc => "Specify a host"

  'snmpget -c public -v 2c $d SNMPv2-MIB::sysLocation.0; /
   snmpget -c public -v 2c $d .1.3.6.1.4.1.2021.8.1.101.30 /
   snmpget -c public -v 2c $d .1.3.6.1.4.1.2021.8.1.101.31'

  desc "get", "communicates with a network entity using SNMP GET requests"
  def get
    SNMP::Manager.open(host: options[:host], community: 'public') do |manager|
      response = manager.get(["sysDescr.0", "sysName.0"])
      response.each_varbind do |vb|
        puts "#{vb.name.to_s}  #{vb.value.to_s}  #{vb.value.asn1_type}"
      end
    end
  end

  method_option :host, :aliases => "-h", :desc => "Specify a host"
  desc "walk", "retrieve a subtree of management values using SNMP GETNEXT requests"
  def walk
    SNMP::Manager.open(:host => "localhost") do |manager|
      manager.walk("ifSpeed") { |vb| puts vb }
    end
  end
end