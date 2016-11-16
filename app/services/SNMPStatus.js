angular.module('wifiUffLocation').service("SNMPStatus", ["$http", "API_URL", function($http, API_URL) {
  var self = this;

  self.get = function(id) {
    var url = API_URL + "/aps/" + id + "/snmp_status.json";
    return $http({
      method: "get",
      url: url
    });
  };

}]);
