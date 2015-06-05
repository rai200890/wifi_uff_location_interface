json.array!(snmp_status.varbind_list) do |item|
  json.oid item.name
  json.name item.name.to_s
  json.description
end