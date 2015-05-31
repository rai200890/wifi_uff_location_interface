function ShowApController($scope, $stateParams, Ap){
    Ap.get({apId: $stateParams.ap_id}, function(data){
        $scope.ap = data;
    });
}