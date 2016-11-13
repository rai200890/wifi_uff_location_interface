angular.module('wifiUffLocation').controller("MapViewController", ["$scope", "$stateParams", "$state",
    "leafletData", "API_URL", "Ap", "Department", "Marker", "SNMPStatus", "Auth",
    function($scope, $stateParams, $state, leafletData, API_URL, Ap, Department, Marker, SNMPStatus, Auth) {
        var ctrl = this;
        ctrl.alerts = [];
        ctrl.layers = {
            baselayers: {},
            overlays: {}
        };
        ctrl.markers = {};
        ctrl.center = {
            lat: 0,
            lng: 0,
            zoom: -3
        };
        ctrl.defaults = {
            maxZoom: 1,
            minZoom: -3,
            zoomControl: true,
            crs: 'Simple',
            legend: {
                legendData: null
            }
        };
        ctrl.events = {
            map: {
                enable: ['click', 'drag', 'blur', 'touchstart', 'mouseover'],
                logic: 'emit'
            },
            marker: {
                enable: ['click', 'drag', 'mouseover'],
                logic: 'emit'
            }
        };
        ctrl.legend = {};

        ctrl.typeaheadNoResults = false;
        ctrl.selectedAp = null;
        ctrl.unmarkedAps = [];
        ctrl.unmarkedAp = null;


        ctrl.saveLocations = function() {

        };

        ctrl.restoreLocations = function() {

        };

        ctrl.loadMap = function(departmentID) {
            Department.get(departmentID).success(function(department) {
                ctrl.legend = {
                    colors: ['#008000', '#800080', '#FF0000', '#0000FF'],
                    labels: ['Canal 1', 'Canal 6', 'Canal 11', 'Outros'],
                    legendData: null
                };

                var name = department.name + ", " + department.campus_name;

                var bounds = L.latLngBounds(department.map_bounds); //workaround

                ctrl.layers.baselayers.map = {
                    name: name,
                    type: 'imageOverlay',
                    url: department.map_url,
                    bounds: bounds,
                    layerParams: {
                        showOnSelector: false,
                        noWrap: true,
                        attribution: name
                    }
                };

                Ap.query(department.id).success(function(aps) {
                    aps.forEach(function(ap) {
                        if (ap.map_latitude == null && ap.map_longitude == null) {
                            ctrl.unmarkedAps.push(ap);
                        } else {
                            ctrl.addMarker(ap);
                        };
                    });
                });
            });
        };

        ctrl.addMarker = function(ap) {
            var message = "<p>" + ap.name + " , " + ap.location.name + "</p>";
            var marker = {
                lat: 0,
                lng: 0,
                layer: ap.name,
                label: {
                    message: message,
                    options: {
                        direction: "auto",
                        noHide: true
                    }
                },
                focus: true,
                draggable: true
            };

            ctrl.layers.overlays[ap.name] = {
                name: ap.name,
                type: 'group',
                visible: true
            };

            SNMPStatus.get(ap.id).success(function(data) {
                ctrl.markers[ap.id] = marker;
                ctrl.markers[ap.id].icon = Marker.getIcon(data.channel.value, data.power.value);
            }).error(function() {
                ctrl.markers[ap.id] = marker;
            });

            var index = ctrl.unmarkedAps.indexOf(ap);
            ctrl.unmarkedAps.splice(index, 1);
        };

        ctrl.loadMap($stateParams.department_id);

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args) {
            Ap.get(args.modelName).success(function(ap) {
                ap.map_latitude = args.model.lat;
                ap.map_longitude = args.model.lng;
                ctrl.selectedAp = ap;
            });
        });
    }
]);
