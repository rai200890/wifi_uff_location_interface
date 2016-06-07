angular.module('wifiUffLocation').service("Building", function($http, API_URL){
    var self = this;

      self.get = function(id) {
        var url = API_URL +'/api/buildings/'+ id +".json";
        return $http({
          method: "get",
          url: url
        });
      };

     self.query = function(name){
       return $http({
         method: "get",
         url: API_URL+"/api/buildings.json?building_or_campus_name="+ name
       });
     };

    self.typeahead = function (name) {
      return self.query(name).then(function(buildings) {
        return buildings.data.map(function(building) {
          return {id: building.id, name: building.name + "," + building.campus_name};
      });
    });
};

});
