function ShowApController($scope, $stateParams, Ap, leafletBoundsHelpers, leafletData){

    $scope.hasLocation = false;

    $scope.tiles = {
        url: "http://localhost:3000/images/tiles/{z}/{x}/{y}.png",
        options:{
            maxZoom: 2,
            minZoom: 1,
            continuousWorld: false,
            // this option disables loading tiles outside of the world bounds.
            noWrap: true,
            attribution: '<strong>Custom Map</strong>'
        }
    };

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