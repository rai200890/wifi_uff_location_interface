angular.module('wifiUffLocation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('aps/index.html',
    "<div ui-view=\"\"></div>"
  );


  $templateCache.put('aps/list.html',
    "<h2 class=\"text-center\">Aps</h2>\n" +
    "\n" +
    "<table st-table=\"displayedAps\" st-safe-src=\"aps\" class=\"table table-hover table-striped\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th colspan=\"7\"><input st-search=\"\" type=\"search\" class=\"form-control\" placeholder=\"Busque...\" /></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th st-sort='name'>Name</th>\n" +
    "        <th st-sort=\"ip\">IP</th>\n" +
    "        <th st-sort='campus_name'>Campus</th>\n" +
    "        <th st-sort='department_name'>Building</th>\n" +
    "        <th>Location</th>\n" +
    "        <th st-sort='validated'>Validated</th>\n" +
    "        <th>Options</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"ap in displayedAps\">\n" +
    "        <td>{{ap.name}}</td>\n" +
    "        <td>{{ap.ip}}</td>\n" +
    "        <td tooltip-append-to-body=\"true\" tooltip=\"{{ap.location.department_name + ',' + ap.location.name}}\" >{{ap.location.campus_name}}</td>\n" +
    "        <td>{{ap.location.department_name}}</td>\n" +
    "        <td>{{ap.location.name}}</td>\n" +
    "        <td>\n" +
    "            <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "            <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-default\" ui-sref=\"root.aps.show({ap_id: ap.id})\"><i class=\"fa fa-search-plus\"></i></button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n"
  );


  $templateCache.put('aps/show.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-6\">\n" +
    "        <fieldset>\n" +
    "            <legend>Info</legend>\n" +
    "            <dl class=\"dl-horizontal\">\n" +
    "                <dt>ID</dt>\n" +
    "                <dd>{{ap.id}}</dd>\n" +
    "                <dt>Name</dt>\n" +
    "                <dd>{{ap.name}}</dd>\n" +
    "                <dt>IP</dt>\n" +
    "                <dd>{{ap.ip}}</dd>\n" +
    "                <dt>Switch IP</dt>\n" +
    "                <dd>{{ap.switch_ip || '-'}}</dd>\n" +
    "                <dt>Campus</dt>\n" +
    "                <dd>{{ap.location.campus_name}}</dd>\n" +
    "                <dt>Building</dt>\n" +
    "                <dd>{{ap.location.building_name}}</dd>\n" +
    "                <dt>Floor</dt>\n" +
    "                <dd>{{ap.location.floor_number || '-'}}</dd>\n" +
    "                <dt>Location</dt>\n" +
    "                <dd>{{ap.location.name || '-'}}</dd>\n" +
    "                <dt>Validated</dt>\n" +
    "                <dd>\n" +
    "                    <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "                    <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "                </dd>\n" +
    "                <dt>Status</dt>\n" +
    "                <dd>{{ap.ap_status.name || '-'}}</dd>\n" +
    "                <dt>Model</dt>\n" +
    "                <dd>{{ap.ap_model.name || '-'}}</dd>\n" +
    "                <dt>Control Region</dt>\n" +
    "                <dd>{{ap.control_region.name || '-'}}</dd>\n" +
    "                <dt>Real Latitude</dt>\n" +
    "                <dd>{{ap.latitude}}</dd>\n" +
    "                <dt>Real Longitude</dt>\n" +
    "                <dd>{{ap.longitude}}</dd>\n" +
    "                <dt>Latitude</dt>\n" +
    "                <dd>{{ap.lat}}</dd>\n" +
    "                <dt>Longitude</dt>\n" +
    "                <dd>{{ap.lng}}</dd>\n" +
    "            </dl>\n" +
    "        </fieldset>\n" +
    "        <fieldset>\n" +
    "            <legend>SNMP Status  <button class=\"btn btn-primary btn-xs\" ng-click=\"reloadSNMPStatus()\"><i class=\"fa fa-refresh\"></i></button></legend>\n" +
    "            <dl ng-show=\"snmp_status && !loading\" class=\"dl-horizontal\">\n" +
    "                <dt>SysLocation</dt>\n" +
    "                <dd>{{snmp_status.syslocation.value}}</dd>\n" +
    "                <dt>Channel</dt>\n" +
    "                <dd>{{snmp_status.channel.value}}</dd>\n" +
    "                <dt>Power</dt>\n" +
    "                <dd>{{snmp_status.power.value}}</dd>\n" +
    "            </dl>\n" +
    "        </fieldset>\n" +
    "        <h4 class=\"text-center\" ng-show=\"loading\">Loading</h4>\n" +
    "        <h4 class=\"text-center\" ng-show=\"!snmp_status && !loading\">Unavaliable</h4>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-6\">\n" +
    "        <fieldset>\n" +
    "            <legend>Location</legend>\n" +
    "            <leaflet id=\"map\" ng-if=\"hasLocation\" center=\"center\" maxbounds=\"maxBounds\" layers=\"layers\" markers=\"markers\" defaults=\"defaults\"  width=\"600px\" height=\"400px\"></leaflet>\n" +
    "            <div class=\"btn-group\" role=\"group\">\n" +
    "                <button type=\"button\" ng-click=\"restoreLocation()\" class=\"btn btn-default\">Restore</button>\n" +
    "                <button type=\"button\" ng-click=\"saveLocation()\" class=\"btn btn-primary\">Save</button>\n" +
    "            </div>\n" +
    "            <label>Current Zoom Level: </label><span>{{center.zoom}}</span>\n" +
    "        </fieldset>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('db_uploader/index.html',
    "<h1 class=\"text-center\">Upload spreadsheet</h1>\n" +
    " <uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.message}}</uib-alert>\n" +
    "<form>\n" +
    "  <div class=\"form-group\">\n" +
    "    <input type=\"file\" nv-file-select uploader=\"uploader\" class=\"btn btn-default\" options=\"\"/>\n" +
    "  </div>\n" +
    "<button ng-click=\"upload()\" type=\"submit\" class=\"btn btn-primary\" ng-hide=\"loading\"> Send </button>\n" +
    "<button ng-click=\"upload()\" type=\"submit\" class=\"btn btn-primary\" ng-show=\"loading\" disabled>Sending <i class=\"fa fa-spinner fa-spin\" ></i></button>\n" +
    "</form>\n"
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
    "                <li><a ui-sref=\".search\">Search</a></li>\n" +
    "                <li><a ui-sref=\".db_uploader\">DBUploader</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "<div class=\"container\" ui-view></div>\n" +
    "<footer class=\"container\">\n" +
    "    <h5 class=\"text-center\">Footer</h5>\n" +
    "</footer>\n"
  );


  $templateCache.put('map/show.html',
    "<div class=\"row\">\n" +
    "<h3>Map</h3>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"loading\">\n" +
    "  <h2 class=\"text-center\">Loading<i class=\"fa fa-spinner fa-5 fa-spin\"></i></h2>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"!loading && hasMap\">\n" +
    "  <leaflet id=\"map\" center=\"center\" layers=\"layers\" markers=\"markers\" legend=\"legend\" defaults=\"defaults\" width=\"100%\" height=\"500px\"></leaflet>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"!loading && hasMap\">\n" +
    "    <div class=\"btn-group\" role=\"group\">\n" +
    "     <button type=\"button\" ng-click=\"restoreLocations()\" class=\"btn btn-default\">Restore</button>\n" +
    "     <button type=\"button\" ng-click=\"saveLocations()\" class=\"btn btn-primary\">Save</button>\n" +
    "   </div>\n" +
    "</div>\n"
  );


  $templateCache.put('map/upload.html',
    "<class=\"row\">\n" +
    "  <form class=\"form-horizontal\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>This floor has no map yet, please upload one</label>\n" +
    "        <input type=\"file\" nv-file-select uploader=\"uploader\" class=\"btn btn-default form-control\" options=\"\"/>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <button ng-click=\"upload()\" type=\"submit\" class=\"btn btn-primary\" ng-hide=\"uploading\"> Send </button>\n" +
    "        <button ng-click=\"upload()\" type=\"submit\" class=\"btn btn-primary\" ng-show=\"uploading\" disabled>Sending <i class=\"fa fa-spinner fa-spin\" ></i></button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "</div>\n"
  );


  $templateCache.put('search/index.html',
    "<div class=\"row\">\n" +
    "<h2 class=\"text-center\">Locations</h2>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "<form class=\"form-horizontal\">\n" +
    "  <div class=\"row\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label>Building: </label>\n" +
    "    <input type=\"text\" class=\"form-control\"\n" +
    "    ng-model=\"department\"\n" +
    "    uib-typeahead=\"d.name for d in typeaheadDepartment($viewValue)\"\n" +
    "    typeahead-on-select=\"typeaheadSelected($item)\"\n" +
    "     class=\"form-control\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "</form>\n" +
    "</div>\n" +
    "<div ng-show=\"departmentID && !hasMap && !loading \" ng-include=\"'map/upload.html'\"></div>\n" +
    "<div ng-show=\"departmentID && (loading || hasMap)\" ng-include=\"'map/show.html'\"></div>\n"
  );

}]);
