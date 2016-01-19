angular.module('wifiUffLocation').service("Floor", function Building($http, API_URL){

   var self = this;

   self.get = function(id) {
    var url = API_URL+"/api/floors/"+ id +".json";
    return $http({
      method: "get",
      url: url
    });
  };

});
