angular.module('wifiUffLocation').
    controller('ListApsController', ['$scope', 'Ap', function ListApsController($scope, Ap){
        $scope.aps = [];

        Ap.query(function(data){
            $scope.aps = data;
        });
        $scope.displayedAps = [].concat($scope.aps);
    }]);