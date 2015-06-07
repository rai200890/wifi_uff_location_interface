json.id @ap.id
json.name @ap.name
json.wan_mac_address @ap.wan_mac_address
json.wlan_mac_address @ap.wlan_mac_address
json.switch_ip @ap.switch_ip
json.port @ap.port
json.socket @ap.socket
json.panel_port @ap.panel_port
json.ip @ap.ip
json.comments @ap.comments
json.validated @ap.validated
json.syslocation @ap.syslocation
json.latitude @ap.latitude
json.longitude @ap.longitude
json.height @ap.height
json.location_id @ap.location_id
json.floor_number @ap.location.floor.number
json.location_name @ap.location.name
json.building_name @ap.location.floor.building.name
json.campus_name @ap.location.floor.building.campus.name
json.ap_model do
  json.id @ap.ap_model_id
  json.name @ap.ap_model_name
end
json.ap_status do
  json.ap_status_id @ap.ap_status_id
  json.name @ap.ap_status_name
end
json.control_region do
  json.control_region_id @ap.control_region_id
  json.name @ap.control_region_name
end