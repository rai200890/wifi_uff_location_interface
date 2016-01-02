function ShowApController($scope, $stateParams, Ap, SNMPStatus, $state, leafletBoundsHelpers, leafletData){
    var imageBounds = [[-430,-2237], [430,2237]],
    maxBounds = leafletBoundsHelpers.createBoundsFromArray(imageBounds);

    angular.extend($scope, {
    hasLocation: false,
    layers: {
        baselayers: {
            building: {
                name: 'Building',
                type: 'imageOverlay',
                url: 'http://localhost:3000/images/planta_ic_4_andar.png',
                bounds: imageBounds,
                layerParams: {
                    noWrap: true
                },
                attribution: '<strong>Custom Map</strong>'
            }
        }
    },
   markers: {},
   maxBounds: maxBounds,
   center: {
        lat: 0,
        lng: 0,
        zoom: 0
    },
    defaults: {
        maxZoom: 1,//ele se perde com um zoom maior, talvez bounds deva ser dinâmico
        minZoom: -2,
        zoomControl: true,
        crs: 'Simple'
    },events: {
        map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
        },
        markers: {
            enable: ['click']
        }
    }});

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
             var latLng = map.unproject(point, $scope.center.zoom);
             $scope.ap.latitude = latLng.lat;
             $scope.ap.longitude = latLng.lng;
            });

        $scope.ap.lat = args.model.lat;
        $scope.ap.lng = args.model.lng;

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
                    var point = map.project(latLng, $scope.center.zoom);

                    $scope.center.lat = point.x;
                    $scope.center.lng = point.y;

                    $scope.ap.lat = point.x;
                    $scope.ap.lng = point.y;

                    $scope.markers[data.name] = {
                        lat: $scope.ap.lat,
                        lng: $scope.ap.lng,
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
