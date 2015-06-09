syslocation = @snmp_status.response[0]
channel = @snmp_status.response[1]
power = @snmp_status.response[2]
json.syslocation do |item|
  item.oid syslocation.name.to_a.join(".")
  item.name syslocation.name.to_s
  item.value syslocation.value
end
json.channel do |item|
  item.oid channel.name.to_a.join(".")
  item.name channel.name.to_s
  item.value channel.value
end
json.power do |item|
  item.oid power.name.to_a.join(".")
  item.name power.name.to_s
  item.value power.value
end
