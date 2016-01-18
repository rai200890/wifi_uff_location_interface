angular.module('wifiUffLocation').controller("SearchController",
function SearchController($scope, $stateParams, Ap, Floor, $state, $stateParams, leafletData, API_URL, $location){
    angular.extend($scope, {
    hasMap: false,
    loading: false,
    floorId: $stateParams.floor_id || 1,
    layers: {
      baselayers: {
        map: {}
      }
    },
    markers: {},
    center: {
        lat: 0,
        lng: 0,
        zoom: 0
    },
    defaults: {
        maxZoom: 1,
        minZoom: -2,
        zoomControl: true,
        crs: 'Simple'
    },
    events: {
        map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
        },
        markers: {
            enable: ['click','drag'],
            logic: 'emit'
        }
    }});

    $scope.saveLocations = function(){

    };

    $scope.restoreLocations = function(){

    };

    if ($scope.floorId){

      $scope.loading = true;

      Floor.get({floorId: $scope.floorId}, function(floor){
       var name = floor.campus_name + ", " + floor.building_name + ", " + floor.number + "º ANDAR"

       console.log(floor);

       if (floor.map_url) {
        var bounds = L.latLngBounds(floor.map_bounds);//workaround
        leafletData.getMap("map").then(function (map){
            map.setMaxBounds(bounds);
        });

        $scope.layers.baselayers.map = {
               name: name,
               type: 'imageOverlay',
               url: floor.map_url,
               bounds: bounds,
               layerParams: {
                 showOnSelector: false,
                 noWrap: true,
                 attribution: name
               }
        };

        Ap.query({floor_id: $scope.floorId}, function(aps){

          var markers = aps.map(function(ap,index){
              return {
                lat: ap.latitude,
                lng: ap.longitude,
                message: ap.name + " - " + ap.syslocation,
                focus: true,
                draggable: true,
                icon: {
                  iconUrl:  "http://" + $location.host() + ":" + $location.port() + "/images/default_icon.png",
                  iconSize: [25, 41], // size of the icon
                }
          }});

          $scope.markers = markers;
          $scope.loading = false;

        });

        $scope.hasMap = true;

      }
      });
    }
});
