angular.module('wifiUffLocation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('aps/index.html',
    "<div ui-view=\"\"></div>"
  );


  $templateCache.put('aps/list.html',
    "<h2 class=\"text-center\">Aps</h2>\n" +
    "<table st-table=\"displayedAps\" st-safe-src=\"aps\" class=\"table table-hover table-striped\">\n" +
    "    <thead>\n" +
    "    <th st-sort='name'>Name</th>\n" +
    "    <th st-sort=\"ip\">IP</th>\n" +
    "    <th st-sort='campus_name'>Campus</th>\n" +
    "    <th st-sort='building_name'>Building</th>\n" +
    "    <th>Location</th>\n" +
    "    <th st-sort='validated'>Validated</th>\n" +
    "    <th>Options</th>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"ap in displayedAps\">\n" +
    "        <td>{{ap.name}}</td>\n" +
    "        <td>{{ap.ip}}</td>\n" +
    "        <td tooltip-append-to-body=\"true\" tooltip=\"{{ap.building_name + ',' + ap.location_name}}\" >{{ap.campus_name}}</td>\n" +
    "        <td>{{ap.building_name}}</td>\n" +
    "        <td>{{ap.location_name}}</td>\n" +
    "        <td>\n" +
    "            <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "            <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-default\" ui-sref=\"root.aps.show({ap_id: ap.id})\"><i class=\"fa fa-search-plus\"></i></button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('aps/new.html',
    "<h1>New</h1>"
  );


  $templateCache.put('aps/show.html',
    "<fieldset>\n" +
    "    <legend>Ap Info</legend>\n" +
    "    <dl class=\"dl-horizontal\">\n" +
    "        <dt>ID</dt>\n" +
    "        <dd>{{ap.id}}</dd>\n" +
    "        <dt>Name</dt>\n" +
    "        <dd>{{ap.name}}</dd>\n" +
    "        <dt>IP</dt>\n" +
    "        <dd>{{ap.ip}}</dd>\n" +
    "        <dt>Switch IP</dt>\n" +
    "        <dd>{{ap.switch_ip || '-'}}</dd>\n" +
    "        <dt>Campus</dt>\n" +
    "        <dd>{{ap.campus_name}}</dd>\n" +
    "        <dt>Building</dt>\n" +
    "        <dd>{{ap.building_name}}</dd>\n" +
    "        <dt>Location</dt>\n" +
    "        <dd>{{ap.location_name || '-'}}</dd>\n" +
    "        <dt>Validated</dt>\n" +
    "        <dd>\n" +
    "            <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "            <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "        </dd>\n" +
    "        <dts>Status</dts>\n" +
    "        <dd>{{ap.ap_status.name || '-'}}</dd>\n" +
    "        <dt>Model</dt>\n" +
    "        <dd>{{ap.ap_model.name || '-'}}</dd>\n" +
    "        <dt>Control Region</dt>\n" +
    "        <dd>{{ap.control_region.name || '-'}}</dd>\n" +
    "        <dt>Latitude</dt>\n" +
    "        <dd>{{ap.latitude || '-'}}</dd>\n" +
    "        <dt>Longitude</dt>\n" +
    "        <dd>{{ap.longitude || '-'}}</dd>\n" +
    "    </dl>\n" +
    "</fieldset>\n" +
    "\n" +
    "<fieldset>\n" +
    "    <legend>SNMP Status</legend>\n" +
    "</fieldset>\n" +
    "\n" +
    "<fieldset>\n" +
    "    <legend>Map</legend>\n" +
    "<leaflet ng-if=\"hasLocation\" center=\"center\" tiles=\"tiles\" markers=\"markers\" defaults=\"defaults\"  width=\"400px\" height=\"260px\"></leaflet>\n" +
    "</fieldset>"
  );


  $templateCache.put('home.html',
    "<nav class=\"navbar navbar-default\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a class=\"navbar-brand\" ui-sref=\".aps.list\">Wifi-Uff Location</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li><a ui-sref=\".aps.list\">APs</a></li>\n" +
    "                <li><a ui-sref=\".locations\">Locations</a></li>\n" +
    "                <li><a ui-sref=\".snmp_status\">SNMP Status</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "<footer>\n" +
    "    <h5 class=\"text-center\">Footer</h5>\n" +
    "</footer>\n"
  );


  $templateCache.put('locations/index.html',
    "<h2 class=\"text-center\">Locations</h2>"
  );


  $templateCache.put('snmp_status/show.html',
    "<h2 class=\"text-center\">SNMP Status</h2>\n" +
    "<div class=\"form-inline\">\n" +
    "   <input class=\"form-control\" name=\"search\" type=\"text\" />\n" +
    "</div>"
  );

}]);
