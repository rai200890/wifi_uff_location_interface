angular.module('wifiUffLocation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('alerts.html',
    "<div uib-alert ng-repeat=\"item in bmItems\" ng-class=\"'alert-' + item.type\" close=\"close($index)\">\n" +
    "    <div class=\"row\">\n" +
    "        <p ng-repeat=\"message in item.messages\" class=\"text-center\">{{message}}</p>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('aps/index.html',
    "<div class=\"panel panel-primary\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h2 class=\"panel-title\">Aps</h2>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"table-responsive\">\n" +
    "        <table st-table=\"displayedAps\" st-safe-src=\"aps\" class=\"table table-hover table-striped\">\n" +
    "          <thead>\n" +
    "            <tr>\n" +
    "              <th colspan=\"7\">\n" +
    "                <form class=\"form-horizontal\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <div class=\"col-xs-12\">\n" +
    "                      <input st-search=\"\" type=\"search\" class=\"form-control\" placeholder=\"Search...\" />\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "              </th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "              <th st-sort='name'>Name</th>\n" +
    "              <th st-sort=\"ip\">IP</th>\n" +
    "              <th st-sort='campus_name'>Campus</th>\n" +
    "              <th st-sort='department_name'>Department</th>\n" +
    "              <th>Location</th>\n" +
    "              <th st-sort='validated'>Validated</th>\n" +
    "              <th>Options</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "\n" +
    "            <tr ng-repeat=\"ap in displayedAps\">\n" +
    "              <td>{{ap.name}}</td>\n" +
    "              <td>{{ap.ip}}</td>\n" +
    "              <td tooltip-append-to-body=\"true\" tooltip=\"{{ap.location.department_name + ',' + ap.location.name}}\">{{ap.location.campus_name}}</td>\n" +
    "              <td>{{ap.location.department_name}}</td>\n" +
    "              <td>{{ap.location.name}}</td>\n" +
    "              <td>\n" +
    "                <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "                <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "              </td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn-default\" ui-sref=\"root.department_list({department_id: ap.location.department_id})\"><i class=\"fa fa-search-plus\"></i></button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('departments/index.html',
    "<div class=\"panel panel-primary\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h2 class=\"panel-title\">Department</h2>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <form class=\"form-horizontal\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"department\" class=\"col-xs-2 control-label\">Department</label>\n" +
    "            <div class=\"col-xs-9\">\n" +
    "              <input name=\"department\" type=\"text\" class=\"form-control\" ng-model=\"ctrl.department\" uib-typeahead=\"d.name for d in ctrl.typeaheadDepartment($viewValue)\" typeahead-on-select=\"ctrl.typeaheadSelected($item)\" class=\"form-control\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <div ng-show=\"ctrl.departmentID && !ctrl.hasMap && !ctrl.loading \" ng-include=\"'map/upload.html'\"></div>\n" +
    "      <div ng-show=\"ctrl.departmentID && (ctrl.loading || ctrl.hasMap)\" ng-include=\"'map/show.html'\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('home.html',
    "<nav class=\"navbar navbar-default\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <a class=\"navbar-brand\" ui-sref=\".aps.list\">Wifi-Uff Location</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li><a ui-sref=\".ap_list\">APs</a></li>\n" +
    "        <li><a ui-sref=\".department_list\">Departments</a></li>\n" +
    "        <li><a ui-sref=\".importer\">Importer</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "<ui-view></ui-view>\n" +
    "<footer class=\"container\">\n" +
    "</footer>\n"
  );


  $templateCache.put('importer/new.html',
    "<div class=\"panel panel-primary\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h2 class=\"panel-title\">Database Importer</h2>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "          <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <form name=\"upload\" class=\"form-horizontal\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"file\" class=\"control-label col-xs-2\">Upload spreadsheet</label>\n" +
    "            <div class=\"col-xs-9\">\n" +
    "              <input name=\"file\" type=\"file\" nv-file-select uploader=\"ctrl.uploader\" class=\"form-control\" options=\"\" />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <button ng-disabled=\"ctrl.uploader.queue.length == 0\" ng-click=\"ctrl.upload()\" type=\"submit\" class=\"btn btn-primary\" ng-if=\"!ctrl.uploading\"> Send </button>\n" +
    "            <button ng-click=\"ctrl.upload()\" type=\"submit\" class=\"btn btn-primary\" ng-if=\"ctrl.uploading\" disabled>Sending <i class=\"fa fa-spinner fa-spin\"></i></button>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('login.html',
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"panel panel-primary\">\n" +
    "      <div class=\"panel-heading\">\n" +
    "        <h3 class=\"panel-title\">Login</h3>\n" +
    "      </div>\n" +
    "      <div class=\"panel-body\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "          <div class=\"row\">\n" +
    "            <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <form novalidate name=\"login\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"username\">Username</label>\n" +
    "                <input ng-model=\"ctrl.credentials.username\" ng-required=\"true\" name=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Username\">\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"password\">Password</label>\n" +
    "                <input ng-model=\"ctrl.credentials.password\" ng-required=\"true\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n" +
    "              </div>\n" +
    "              <button ng-click=\"ctrl.login()\" ng-disabled=\"ctrl.loading\" type=\"submit\" class=\"btn btn-primary\">Login <span ng-show=\"ctrl.loading\" class=\"glyphicon glyphicon-repeat fast-right-spinner\"></span></button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('map/show.html',
    "<div class=\"row\" ng-if=\"ctrl.loading\">\n" +
    "  <h2 class=\"text-center\">Loading<i class=\"fa fa-spinner fa-5 fa-spin\"></i></h2>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"!ctrl.loading && ctrl.hasMap\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div class=\"panel panel-primary\" ng-if=\"ctrl.selectedAp\">\n" +
    "      <div class=\"panel-heading\">\n" +
    "        <h3 class=\"panel-title\">Ap Details</h3>\n" +
    "      </div>\n" +
    "      <div class=\"panel-body\">\n" +
    "        <dl name=\"apDetails\" class=\"dl-horizontal\">\n" +
    "          <dt>Name</dt>\n" +
    "          <dd>{{ctrl.selectedAp.name}}</dd>\n" +
    "          <dt>IP</dt>\n" +
    "          <dd>{{ctrl.selectedAp.ip}}</dd>\n" +
    "          <dt>Validated</dt>\n" +
    "          <dd>{{ctrl.selectedAp.validated}}</dd>\n" +
    "          <dt>Real latitude</dt>\n" +
    "          <dd>{{ctrl.selectedAp.real_latitude}}</dd>\n" +
    "          <dt>Real longitude</dt>\n" +
    "          <dd>{{ctrl.selectedAp.real_longitude}}</dd>\n" +
    "          <dt>Map latitude</dt>\n" +
    "          <dd>{{ctrl.selectedAp.map_latitude}}</dd>\n" +
    "          <dt>Map longitude</dt>\n" +
    "          <dd>{{ctrl.selectedAp.map_longitude}}</dd>\n" +
    "        </dl>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-8\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"panel panel-primary\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "          <h3 class=\"panel-title\">Unmarked Aps</h3>\n" +
    "        </div>\n" +
    "        <div class=\"panel-body\">\n" +
    "          <select ng-options=\"ap.name for ap in ctrl.aps track by ap.id\">\n" +
    "          </select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <leaflet id=\"map\" center=\"ctrl.center\" layers=\"ctrl.layers\" markers=\"ctrl.markers\" event-broadcast=\"ctrl.events\" legend=\"ctrl.legend\" defaults=\"ctrl.defaults\" width=\"100%\" height=\"500px\"></leaflet>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"btn-group\" role=\"group\">\n" +
    "        <button type=\"button\" ng-click=\"ctrl.restoreLocations()\" class=\"btn btn-default\">Restore</button>\n" +
    "        <button type=\"button\" ng-click=\"ctrl.saveLocations()\" class=\"btn btn-primary\">Save</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('map/upload.html',
    "<div class=\"row\">\n" +
    "    <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <form class=\"form-horizontal\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"file\" class=\"control-label col-xs-2\">Upload</label>\n" +
    "      <div class=\"col-xs-9\">\n" +
    "        <input name=\"file\" type=\"file\" nv-file-select uploader=\"ctrl.uploader\" class=\"form-control\" options=\"\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button ng-click=\"ctrl.upload()\" type=\"submit\" class=\"btn btn-primary\" ng-if=\"!ctrl.uploading\"> Send </button>\n" +
    "      <button type=\"submit\" class=\"btn btn-primary\" ng-if=\"ctrl.uploading\" disabled>Sending <i class=\"fa fa-spinner fa-spin\"></i></button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );

}]);
