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
         url: API_URL+"/api/departments.json?department_or_campus_name="+ name
       });
     };

    self.typeahead = function (name) {
      return self.query(name).then(function(response) {
        var departments = response.data;
        return departments.map(function(department) {
          return {id: department.id, name: department.name + "," + department.campus_name};
      });
    });
};

});
