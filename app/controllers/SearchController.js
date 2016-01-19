angular.module('wifiUffLocation').controller("SearchController",
function SearchController($scope, $stateParams, Ap, Floor, $state, $stateParams,
   leafletData, API_URL, $location, FileUploader){

    $scope.hasMap = null;
    $scope.loading = false;
    $scope.uploading = false;
    $scope.floorId = $stateParams.floor_id;
    $scope.layers = {baselayers: {map: {}}};
    $scope.markers = {};
    $scope.center = {lat: 0, lng: 0, zoom: 0};
    $scope.defaults = {maxZoom: 1, minZoom: -2, zoomControl: true, crs: 'Simple'};
    $scope.events = {
        map: {
        //    enable: ['click', 'drag', 'blur', 'touchstart'],
        //    logic: 'emit'
        //}
        //,
        //markers: {
        //    enable: ['click','drag'],
        //    logic: 'emit'
        }
    };

    var uploader = $scope.uploader = new FileUploader({method: "PUT"});

    $scope.saveLocations = function(){

    };

    $scope.restoreLocations = function(){

    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.loading = false;
      $scope.success = "Map has been uploaded with success";
      $scope.loadMap();
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      $scope.loading = false;
      $scope.errors = response.errors;
    };

    $scope.upload = function(){
      $scope.loading = true;
      var file = uploader.queue[uploader.queue.length-1];
      file.url = API_URL + "/api/floors/"+ $scope.floorId +".json"
      uploader.uploadItem(file);
      uploader.addToQueue(file);
    };

    $scope.loadMap = function(){
        if ($scope.floorId){
          $scope.loading = true;
          Floor.get($scope.floorId).success(function(floor){
            var name = floor.campus_name + ", " + floor.building_name + ", " + floor.number + "º ANDAR"

            $scope.loading = false;

            if (floor.map_url) {
              $scope.hasMap = true;

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
                    iconUrl:  "https://wifi-uff-location.herokuapp.com/images/default_icon.png",
                    iconSize: [25, 41], // size of the icon
                  }
            }});
            $scope.markers = markers;
        });

        }}).error(function(){
          $scope.loading = false;
          $scope.hasMap = false;
        });
      }else{
        $scope.hasMap = false;
      }
    };
    $scope.loadMap();
});
