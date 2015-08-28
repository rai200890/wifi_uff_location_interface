angular.module('wifiUffLocation').
    factory('SNMPStatus', ['$resource', function SNMPStatus($resource){
        return $resource('http://localhost:3000/api/aps/:apId/snmp_status.json',{apId: '@id'},
            {show: {method: 'GET', isArray: true}});
    }]);