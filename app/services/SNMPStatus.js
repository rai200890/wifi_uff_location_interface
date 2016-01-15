angular.module('wifiUffLocation').service("SNMPStatus", function($http,API_URL){
    var self = this;

    self.get = function(id) {
      var url = API_URL+"/api/aps/"+ id +"/snmp_status.json";
      console.log(url);
      return $http({
        method: "get",
        url: url
      });
    };

  });
