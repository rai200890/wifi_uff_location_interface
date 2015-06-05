function ShowApController($scope, $stateParams, Ap, leafletBoundsHelpers, leafletData){

    $scope.hasLocation = false;

    $scope.tiles = {
        url: "/api/tiles.png?x={x}&y={y}&z={z}",
        options:{
            maxZoom: 2,
            minZoom: 0,
            continuousWorld: false,
            // this option disables loading tiles outside of the world bounds.
            noWrap: true,
            attribution: '<strong>Custom Map</strong>'
        }
    };

    $scope.maxBounds = {
        northEast: {
            lat: 51.51280224425956,
            lng: 0
        },
        southWest: {
            lat: 51.50211782162702,
            lng: 20
        }
    }

    $scope.center = {
        autoDiscover: true
    }

    $scope.markers = {};

    $scope.defaults = {
        zoom: 1
    };

    Ap.get({apId: $stateParams.ap_id}, function(data){
        $scope.ap = data;

        $scope.hasLocation = data.latitude && data.longitude;

        if ($scope.hasLocation) {

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