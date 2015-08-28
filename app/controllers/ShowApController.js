function ShowApController($scope, $stateParams, Ap, SNMPStatus, $state, leafletBoundsHelpers){

    $scope.hasLocation = false;

    $scope.tiles = {
        url: "http://localhost:3000/api/tiles.png?z={z}&x={x}&y={y}",
        options:{
            center: [0,0],
            maxZoom: 1,
            minZoom: 1,
            continuousWorld: false,
            // this option disables loading tiles outside of the world bounds.
            maxBounds: [[0,0],[0,256]],
            noWrap: true,
            attribution: '<strong>Custom Map</strong>'
        }
    };


    angular.extend($scope, {
        markers : {}
    });

    $scope.defaults = {
        zoomControl: false,

        crs: 'EPSG3857'
        //crs: 'Simple'
    };

    $scope.events = {
        map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
        },
        markers: {
            enable: ['click']
        }
    }

    $scope.$on('leafletDirectiveMap.click', function(event, args){
        var latlng = args.leafletEvent.latlng;
        console.log('Lat: ' + latlng.lat + '<br>Lng: ' + latlng.lng);

        if (!$scope.hasLocation) {
            $scope.markers[$scope.ap.name] = {
                lat: latlng.lat,
                lng: latlng.lng,
                message: $scope.ap.name + " - " + $scope.ap.syslocation,
                focus: true,
                draggable: true,
                icon: {}
            }
        }
    });

    $scope.$on('leafletDirectiveMarker.dragend', function(event, args){
        var name = $scope.ap.name;
        $scope.ap.latitude = args.model.lat;
        $scope.ap.longitude = args.model.lng;
    });

    $scope.saveLocation = function(){
        Ap.update({apId: $scope.ap.id}, {
            ap: {
                latitude: $scope.ap.latitude,
                longitude: $scope.ap.longitude,
            }
        },function(data){
            console.log("Location updated with success");
        });
    };

    $scope.reloadSNMPStatus = function(){
        $scope.loading = true;
        SNMPStatus.get({apId: $stateParams.ap_id}, function(data){
            $scope.snmp_status = data;
            $scope.loading = false;
        }, function(){
            $scope.loading = false;
        });
    };

    $scope.restoreLocation = function() {
        //MARRETADA para resolver problema do angular-leaflet com markers
        $state.go($state.current, $stateParams, {reload: true});
    };

    $scope.snmp_status = null;
    $scope.loading = true;

    var mapSize = {height: 352, width:  1253}



    Ap.get({apId: $stateParams.ap_id}, function(data){
        $scope.ap = data;

        $scope.hasLocation = data.latitude && data.longitude;

        if ($scope.hasLocation) {

            $scope.center = {
                lat: data.latitude,
                lng: data.longitude,
                zoom: 1
            }

            $scope.markers[data.name] = {
                lat: data.latitude,
                lng: data.longitude,
                message: data.name + " - " + data.syslocation,
                focus: true,
                draggable: true,
                icon: {}
            }
        }

        SNMPStatus.get({apId: $stateParams.ap_id}, function(data){
            $scope.snmp_status = data;
            $scope.loading = false;
        }, function(){
            $scope.loading = false;
        });

    });

};