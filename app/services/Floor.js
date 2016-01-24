angular.module('wifiUffLocation').service("Floor", function($http, API_URL){

   var self = this;

   self.get = function(id) {
    var url = API_URL+"/api/floors/"+ id +".json";
    return $http({
      method: "get",
      url: url
    });
  };

  self.query = function(building_id){
    return $http({
      method: "get",
      url: API_URL + "/api/floors.json?building_id="+ building_id
    });
  };


});
