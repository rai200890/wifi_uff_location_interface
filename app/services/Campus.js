angular.module('wifiUffLocation').service("Campus", ["$http", "API_URL", function($http, API_URL) {
  var self = this;

  self.query = function(campus_name) {
    return $http({
      method: "get",
      url: API_URL + "/api/campi.json?campus_name=" + campus_name
    });
  };

  self.typeahead = function(campus_name) {
    return self.query(campus_name).then(function(campi) {
      return campi.data.map(function(campus) {
        return {
          id: campus.id,
          name: campus.name
        }
      });
    });
  };

}]);
