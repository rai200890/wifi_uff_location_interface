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
            maxZoom: 3,
            minZoom: -3,
            zoomControl: true,
            crs: 'Simple',
            legend: {
                legendData: null
            }
        };
        ctrl.events = {
            map: {
                enable: ['click', 'drag', 'dragend', 'blur', 'touchstart', 'mouseover'],
                logic: 'emit'
            },
            marker: {
                enable: ['click', 'mouseover', 'drag', 'dragend'],
                logic: 'emit'
            }
        };
        ctrl.legend = {};
        ctrl.typeaheadNoResults = false;
        ctrl.selectedAp = null;
        ctrl.unmarkedAps = [];
        ctrl.unmarkedAp = null;

        ctrl.edit = function() {
            ctrl.legend = {};
            angular.forEach(ctrl.markers, function(marker, name) {
                marker.icon = null;
                marker.draggable = true;
            });
            ctrl.editing = true;
        };

        ctrl.save = function() {
            ctrl.editing = false;
            var aps = [];
            angular.forEach(ctrl.markers, function(marker, id) {
                aps.push({
                    id: id,
                    map_latitude: marker.lat,
                    map_longitude: marker.lng
                });
            });
            Department.put($stateParams.department_id, aps)
                .success(function() {
                    ctrl.alerts = [{
                        type: "success",
                        messages: ["Ap's new configuration saved successfully!"]
                    }];
                })
                .error(function(response) {
                    ctrl.alerts = [{
                        type: "danger",
                        messages: response.errors
                    }];
                }).finally(function() {
                    reloadAps($stateParams.department_id);
                });
        };

        ctrl.cancel = function() {
            ctrl.editing = false;
            reloadAps($stateParams.department_id);
        };

        ctrl.addApToMap = function(ap) {
            var marker = generateMarker(ap);
            marker.draggable = true;

            ctrl.layers.overlays[ap.name] = {
                name: ap.name,
                type: 'group',
                visible: true
            };
            ctrl.markers[ap.id] = marker;

            var index = ctrl.unmarkedAps.indexOf(ap);
            ctrl.unmarkedAps.splice(index, 1);
        };

        var loadMap = function(departmentID) {
            Department.get(departmentID).success(function(department) {
                var name = department.name + ", " + department.campus_name;
                var bounds = L.latLngBounds(department.map_bounds);
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
                reloadAps(departmentID);
            });
        };

        var reloadAps = function(departmentID) {
            ctrl.legend = {
                colors: ['#008000', '#800080', '#FF0000', '#0000FF'],
                labels: ['Channel 1', 'Channel 6', 'Channel 11', 'Other channels'],
                legendData: null
            };
            ctrl.unmarkedAps = [];
            ctrl.markers = {};
            ctrl.layers.overlays = {};
            Ap.query(departmentID).success(function(aps) {
                aps.forEach(function(ap) {
                    if (ap.map_latitude == null && ap.map_longitude == null) {
                        ctrl.unmarkedAps.push(ap);
                    } else {
                        loadSNMPInfo(ap);
                    };
                });
            });
        };

        var generateMarker = function(ap) {
            var message = "<p>" + ap.name + " , " + ap.location.name + "</p>";
            var marker = {
                lat: ap.map_latitude || 0,
                lng: ap.map_longitude || 0,
                layer: ap.name,
                label: {
                    message: message,
                    options: {
                        direction: "auto",
                        noHide: true
                    }
                },
                focus: true
            };
            return marker
        };

        var loadSNMPInfo = function(ap) {
            var marker = generateMarker(ap);
            marker.draggable = false;

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
        };

        var init = function() {
            loadMap($stateParams.department_id);
            $scope.$on('leafletDirectiveMarker.map.dragend', function(e, args) {
                ctrl.markers[args.modelName].lat = args.model.lat;
                ctrl.markers[args.modelName].lng = args.model.lng;
            });
        };
        init();
    }
]);
