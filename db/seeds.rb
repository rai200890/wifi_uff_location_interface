require 'roo'

xlsx = Roo::Spreadsheet.open('./Controle.xlsx')
sheet = xlsx.sheet('Tabela')
fields = {name: "AP ", wan_mac_address: "MAC / WAN (ETH0)", wlan_mac_address: "WLAN (ETIQUETA)", campus: "CAMPUS",
          building: "DEPARTAMENTO", location: "LOCAL", switch_ip: "SWITCH", port: "PORTA", socket: "TOMADA",
          panel_port: "P.PANEL", ap_status: "STATUS", ip: "IP DOS APS", comments: "COMENTARIOS", validated: "VALIDADO",
          syslocation: "SYSLOCATION", latitude: "LATITUDE", longitude: "LONGITUDE",
          height: "ALTURA", control_region:"REGIÃO DE CONTROLE SCIFI", ap_model: "MODELO DO AP"}


sheet.each(fields) do |hash|
  unless hash[:name] == "AP "

    attributes = hash.select{|key, value| !value.in? ['-','?']}
    attributes[:validated] = attributes[:validated] == 'OK' ? true : nil

    campus = Campus.where(name: attributes[:campus]).first_or_create
    building = Building.where(name: attributes[:building], campus_id: campus.id).first_or_create
    location = Location.where(name: attributes[:location]).first_or_create
    ap_model = ApModel.where(name: attributes[:ap_model]).first_or_create
    ap_status = ApStatus.where(name: attributes[:ap_status]).first_or_create
    control_region = ControlRegion.where(name: attributes[:control_region]).first_or_create

    attributes.delete_if{|key, value| key.in?([:campus, :building, :location, :ap_status, :ap_model,:control_region])}

    ap = Ap.where(attributes.merge({
                                       location: location,
                                       ap_model: ap_model,
                                       ap_status: ap_status,
                                       control_region: control_region
                                   })).first_or_create
  end
end