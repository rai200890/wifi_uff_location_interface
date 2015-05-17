#encoding: utf-8
require 'byebug'
require 'roo'
require 'thor/rails'

class Aps < Thor
  include Thor::Rails
  desc "update", "update aps from spreadsheet"
  def update(spreadsheet)
    xlsx = Roo::Excelx.new(spreadsheet)

    sheet = xlsx.sheet('Tabela')

    fields = {name: "AP ", wan_mac_address: "MAC / WAN (ETH0)", wlan_mac_address: "WLAN (ETIQUETA)",
              campus: "CAMPUS", building: "DEPARTAMENTO", location: "LOCAL", switch_ip: "SWITCH",
              port: "PORTA", socket: "TOMADA", panel_port: "P.PANEL", ap_status: "STATUS",
              ip: "IP DOS APS", comments: "COMENTARIOS", validated: "VALIDADO",
              syslocation: "SYSLOCATION", latitude: "LATITUDE", longitude: "LONGITUDE",
              height: "ALTURA", control_region:"REGIÃO DE CONTROLE SCIFI", ap_model: "MODELO DO AP"}

    rows = sheet.parse(fields)
    rows.slice!(0)

    rows.each do |hash|
      attributes = parse_attributes hash

      campus = Campus.where(name: attributes[:campus]).first_or_create
      building = Building.where(name: attributes[:building], campus_id: campus.id).first_or_create
      location = Location.where(name: attributes[:location]).first_or_create
      ap_model = ApModel.where(name: attributes[:ap_model]).first_or_create
      ap_status = ApStatus.where(name: attributes[:ap_status]).first_or_create
      control_region = ControlRegion.where(name: attributes[:control_region]).first_or_create

      attributes = remove_associations attributes

      ap = Ap.where(attributes.merge({
                                         location: location,
                                         ap_model: ap_model,
                                         ap_status: ap_status,
                                         control_region: control_region
                                     })).first_or_create
    end
  end

  private

  def parse_attributes attributes
    attributes.select{|key, value| !['-','?'].include?(value)}
    attributes[:validated] = attributes[:validated] == 'OK' ? true : nil
    attributes
  end

  def remove_associations attributes
    attributes.select{|key, value| !key.in?([:campus, :building, :location, :ap_status, :ap_model,:control_region])}
  end

end