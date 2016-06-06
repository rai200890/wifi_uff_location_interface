angular.module('wifiUffLocation').service("Department", function($http, API_URL){
    var self = this;

      self.get = function(id) {
        var url = API_URL +'/api/departments/'+ id +".json";
        return $http({
          method: "get",
          url: url
        });
      };

     self.query = function(name){
       return $http({
         method: "get",
         url: API_URL+"/api/departments.json?building_or_campus_name="+ name
       });
     };

    self.typeahead = function (name) {
      return self.query(name).then(function(departments) {
        return departments.data.map(function(department) {
          return {id: department.id, name: department.name + "," + department.campus_name};
      });
    });
};

});
