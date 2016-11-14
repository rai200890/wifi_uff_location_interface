angular.module('wifiUffLocation').service("Ap", ["$http", "API_URL", function($http, API_URL) {
    var self = this;

    self.get = function(id) {
        var url = API_URL + "/api/aps/" + id + ".json";
        return $http({
            method: "get",
            url: url
        });
    };

    self.query = function(department_id) {
        var url = API_URL + "/api/aps.json";
        if (department_id) {
            url += "?department_id=" + department_id;
        }
        return $http({
            method: "get",
            url: url
        });
    };

}]);
