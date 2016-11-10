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
    "<div class=\"row\">\n" +
    "  <h2 class=\"text-center\">Aps</h2>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"table-responsive\">\n" +
    "    <table st-table=\"displayedAps\" st-safe-src=\"aps\" class=\"table table-hover table-striped\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <th colspan=\"7\">\n" +
    "            <input st-search=\"\" type=\"search\" class=\"form-control\" placeholder=\"Busque...\" />\n" +
    "          </th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <th st-sort='name'>Name</th>\n" +
    "          <th st-sort=\"ip\">IP</th>\n" +
    "          <th st-sort='campus_name'>Campus</th>\n" +
    "          <th st-sort='department_name'>Building</th>\n" +
    "          <th>Location</th>\n" +
    "          <th st-sort='validated'>Validated</th>\n" +
    "          <th>Options</th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"ap in displayedAps\">\n" +
    "          <td>{{ap.name}}</td>\n" +
    "          <td>{{ap.ip}}</td>\n" +
    "          <td tooltip-append-to-body=\"true\" tooltip=\"{{ap.location.department_name + ',' + ap.location.name}}\">{{ap.location.campus_name}}</td>\n" +
    "          <td>{{ap.location.department_name}}</td>\n" +
    "          <td>{{ap.location.name}}</td>\n" +
    "          <td>\n" +
    "            <span class=\"label label-success\" ng-if='ap.validated'><i class=\"fa fa-thumbs-o-up\"></i></span>\n" +
    "            <span class=\"label label-danger\" ng-if='!ap.validated'><i class=\"fa fa-thumbs-o-down\"></i></span>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <button class=\"btn btn-default\" ui-sref=\"root.department_list({department_id: ap.location.department_id})\"><i class=\"fa fa-search-plus\"></i></button>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('departments/index.html',
    "<div class=\"row\">\n" +
    "  <h2 class=\"text-center\">Locations</h2>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <form class=\"form-horizontal\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>Department</label>\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"department\" uib-typeahead=\"d.name for d in typeaheadDepartment($viewValue)\" typeahead-on-select=\"typeaheadSelected($item)\" class=\"form-control\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div ng-show=\"departmentID && !hasMap && !loading \" ng-include=\"'map/upload.html'\"></div>\n" +
    "<div ng-show=\"departmentID && (loading || hasMap)\" ng-include=\"'map/show.html'\"></div>\n"
  );


  $templateCache.put('home.html',
    "<nav class=\"navbar navbar-default\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a class=\"navbar-brand\" ui-sref=\".aps.list\">Wifi-Uff Location</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li><a ui-sref=\".ap_list\">APs</a></li>\n" +
    "                <li><a ui-sref=\".department_list\">Departments</a></li>\n" +
    "                <li><a ui-sref=\".importer\">Importer</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "<div class=\"container-fluid\">\n" +
    "  <ui-view></ui-view>\n" +
    "</div>\n" +
    "<footer class=\"container\">\n" +
    "    <h5 class=\"text-center\">Footer</h5>\n" +
    "</footer>\n"
  );


  $templateCache.put('importer/new.html',
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


  $templateCache.put('login.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"panel panel-primary\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h3 class=\"panel-title\">Login</h3>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\">\n" +
    "                <div class=\"container-fluid\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <form novalidate name=\"login\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label for=\"username\">Username</label>\n" +
    "                                <input ng-model=\"ctrl.credentials.username\" ng-required=\"true\" name=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Username\">\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label for=\"password\">Password</label>\n" +
    "                                <input ng-model=\"ctrl.credentials.password\" ng-required=\"true\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n" +
    "                            </div>\n" +
    "                            <button ng-click=\"ctrl.login()\" ng-disabled=\"ctrl.loading\" type=\"submit\" class=\"btn btn-primary\">Login <span ng-show=\"ctrl.loading\" class=\"glyphicon glyphicon-repeat fast-right-spinner\"></span></button>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('map/show.html',
    "<div class=\"row\">\n" +
    "<h3>Map</h3>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"loading\">\n" +
    "  <h2 class=\"text-center\">Loading<i class=\"fa fa-spinner fa-5 fa-spin\"></i></h2>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"!loading && hasMap\">\n" +
    "  <leaflet id=\"map\" center=\"center\" layers=\"layers\" markers=\"markers\" event-broadcast=\"events\" legend=\"legend\" defaults=\"defaults\" width=\"100%\" height=\"500px\"></leaflet>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"!loading && hasMap\">\n" +
    "    <div class=\"btn-group\" role=\"group\">\n" +
    "     <button type=\"button\" ng-click=\"restoreLocations()\" class=\"btn btn-default\">Restore</button>\n" +
    "     <button type=\"button\" ng-click=\"saveLocations()\" class=\"btn btn-primary\">Save</button>\n" +
    "   </div>\n" +
    "</div>\n"
  );


  $templateCache.put('map/upload.html',
    ""
  );

}]);
