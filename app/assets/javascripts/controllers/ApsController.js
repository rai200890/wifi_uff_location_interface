function ApsController($scope, Ap){
    Ap.query(function(data){
        $scope.aps = data;
    });
};