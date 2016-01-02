function ShowApController($scope, $stateParams, Ap, SNMPStatus, $state, leafletBoundsHelpers, leafletData){
    $scope.hasLocation = false;

    $scope.tiles = {
        //http://localhost:3000/api/tiles.png?z=20&x=0&y=0
        url: "http://localhost:3000/api/tiles.png?z={z}&x={x}&y={y}",
        options:{
            //tms: true,
            center: [0,0],
            zoom: 20,
            maxZoom: 20,
            minZoom: 20,
            continuousWorld: true,
            // this option disables loading tiles outside of the world bounds.
            noWrap: true,
            attribution: '<strong>Custom Map</strong>'
        }
    };

    $scope.layers = {
        baselayers: {
            building: {
                name: 'Building',
                type: 'imageOverlay',
                url: 'http://localhost:3000/images/planta_ic_4_andar.png',
                bounds: [[-430,-2237], [430,2237]],
                layerParams: {
                    noWrap: true
                },
                attribution: '<strong>Custom Map</strong>'
            }
        }
    };

    angular.extend($scope, {
        markers : {}
    });

    $scope.center = {
        lat: 0,
        lng: 0,
        zoom: -3
    };

    $scope.defaults = {
        zoom: -3,
        maxZoom: 1,
        minZoom: -3,
        zoomControl: true,
        //crs: 'EPSG3857'
        crs: 'Simple'
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
      leafletData.getMap("map").then(function (map) {
             var x = args.model.lat;
             var y = args.model.lng;
             var point = L.point(x, y);
             var latLng = map.unproject(point, $scope.defaults.zoom);
            console.log(point);
            console.log(latLng);
            });

        $scope.ap.lat = args.model.lat;
        $scope.ap.lng = args.model.lng;
    });

    $scope.saveLocation = function(){

        Ap.update({apId: $scope.ap.id}, {
            ap: {
                latitude: $scope.ap.lat,
                longitude: $scope.ap.lng,
            }
        },function(data){
            console.log("Location updated with success");
        });
    };

    $scope.reloadSNMPStatus = function(){
        $scope.loading = true;
        SNMPStatus.get($stateParams.ap_id).success(function(data){
            $scope.snmp_status = data;
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
        });
    };

    $scope.restoreLocation = function() {
        //MARRETADA para resolver problema do angular-leaflet com markers
        $state.go($state.current, $stateParams, {reload: true});
    };

    $scope.snmp_status = null;
    $scope.loading = true;

    Ap.get({apId: $stateParams.ap_id}, function(data){
        $scope.ap = data;

        $scope.hasLocation = data.latitude && data.longitude;

        if ($scope.hasLocation) {

            leafletData.getMap("map").then(
                function (map) {
                    var latLng = L.latLng(data.latitude, data.longitude);
                    var point = map.project(latLng, $scope.defaults.zoom);

                    $scope.center = {
                        lat: point.x,
                        lng: point.y,
                        zoom: -3
                    };

                    $scope.ap.lat = point.x;
                    $scope.ap.lng = point.y;

                    $scope.markers[data.name] = {
                        lat: point.x,
                        lng: point.y,
                        message: data.name + " - " + data.syslocation,
                        focus: true,
                        draggable: true,
                        icon: {}
                    }
                });

        }

        SNMPStatus.get($stateParams.ap_id).success(function(data){
            $scope.snmp_status = data;
            $scope.loading = false;
        }).error(function(){
            $scope.loading = false;
        });

    });

};
