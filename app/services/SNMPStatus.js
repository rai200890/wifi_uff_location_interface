angular.
  module('wifiUffLocation').
  service("SNMPStatus", function($http){
    var self = this;

    self.get = function(id) {
      return $http({
        method: "get",
        url: "/api/aps/"+ id +"/snmp_status.json"
      });
    };

  });
