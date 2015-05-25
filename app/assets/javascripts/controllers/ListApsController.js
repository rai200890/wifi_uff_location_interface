function ListApsController($scope, Ap){
    $scope.aps = [];

    Ap.query(function(data){
        console.log(data.length);
        $scope.aps = data;
    });
    $scope.displayedAps = [].concat($scope.aps);
};