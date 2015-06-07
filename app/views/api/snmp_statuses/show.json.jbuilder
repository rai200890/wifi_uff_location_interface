syslocation = @snmp_status.response[0]
channel = @snmp_status.response[1]
potency = @snmp_status.response[2]
json.syslocation do |item|
  item.oid syslocation.name.to_a.join(".")
  item.name syslocation.name
  item.value syslocation.value
end
json.channel do |item|
  item.oid channel.name.to_a.join(".")
  item.name channel.name
  item.value channel.value
end
json.potency do |item|
  item.oid potency.name.to_a.join(".")
  item.name potency.name
  item.value potency.value
end
