json.array!(@snmp_status.response) do |item|
  json.oid item.name.to_a.join(".")
  json.name item.name.to_s
  json.value item.value.to_s
end