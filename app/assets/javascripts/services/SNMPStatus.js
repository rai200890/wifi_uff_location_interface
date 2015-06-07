function SNMPStatus($resource){
    return $resource('/api/aps/:apId/snmp_status.json',{apId: '@id'},
        {show: {method: 'GET', isArray: true}});
}