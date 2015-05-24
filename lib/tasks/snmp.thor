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
  'snmpwalk -m ALL -v 1 -c public 192.168.1.174:9002'

  desc "get", "communicates with a network entity using SNMP GET requests"
  #versions: [:SNMPv1, :SNMPv2c]
  def get
    defaults = {host: 'localhost', community: 'public', version: :SNMPv2c, port: 162}

    SNMP::Manager.open(host: options[:host], community: 'public',
                       version: :SNMPv1, port: 9002,
                       mib_modules: ['RFC1213-MIB']) do |manager|
      #response = manager.get(["sysName.0", "sysDescr.0", 'sysLocation.0', 'ifSpeed.0'])
      response = manager.get(['RFC1213-MIB::sysDescr.0'])
      response.each_varbind do |vb|
        puts "NAME: #{vb.name.to_s}, VALUE: #{vb.value.to_s}, ASN1_TYPE: #{vb.value.asn1_type}"
      end
    end
  end

  method_option :host, :aliases => "-h", :desc => "Specify a host"
  desc "walk", "retrieve a subtree of management values using SNMP GETNEXT requests"
  def walk
    SNMP::Manager.open(host: options[:host], community: 'public') do |manager|
      manager.walk("ifSpeed") { |vb| puts vb }
    end
  end
end