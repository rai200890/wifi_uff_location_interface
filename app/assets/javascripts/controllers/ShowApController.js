function ShowApController($scope, $stateParams, Ap){

    $scope.center = {lat: 0, lng: 0,  zoom: 1};

    $scope.hasLocation = false;

    $scope.tiles = {
        url: "/api/tiles.png?x={x}&y={y}&z={z}",
        options: {
            maxZoom: 3,
            minZoom: 1,
            attribution: '<strong>Custom Map</strong>'
        }
    };

    $scope.markers = {};

    $scope.defaults = {
        zoom: 2
    };

    Ap.get({apId: $stateParams.ap_id}, function(data){
        $scope.ap = data;

        $scope.hasLocation = data.latitude && data.longitude;

        if ($scope.hasLocation) {

            $scope.center['lat'] = data.latitude;
            $scope.center['lng'] = data.longitude;

            $scope.markers[data.name] = {
                lat: data.latitude,
                lng: data.longitude,
                message: data.name + " - " + data.syslocation,
                focus: false,
                icon: {}
            }
        }

    });

}