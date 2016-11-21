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
    "      <h3 class=\"text-center\" ng-show=\"ctrl.loading\">Loading <i class=\"fa fa-spinner fa-spin\"></i></h3>\n" +
    "      <div class=\"table-responsive\" ng-hide=\"ctrl.loading\">\n" +
    "        <table st-table=\"ctrl.displayedAps\" st-safe-src=\"ctrl.aps\" class=\"table table-hover table-striped\">\n" +
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
    "            <tr ng-repeat=\"ap in ctrl.displayedAps\">\n" +
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
    "                <button class=\"btn btn-default\" ui-sref=\"root.departments.map({department_id: ap.location.department_id})\"><i class=\"fa fa-search-plus\"></i></button>\n" +
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
    "    <div class=\"panel-heading\">\n" +
    "        <h2 class=\"panel-title\">Department Map</h2>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"row\" ng-if=\"ctrl.loading\">\n" +
    "            <h3 class=\"text-center\">Loading<i class=\"fa fa-spinner fa-spin\"></i></h3>\n" +
    "          </div>\n" +
    "          <div class=\"row\" ng-if=\"!ctrl.loading\">\n" +
    "                <form class=\"form-horizontal\" autocomplete=\"off\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-md-12 col-xs-11\">\n" +
    "                            <input name=\"department\" type=\"text\" class=\"form-control\" ng-model=\"ctrl.department\" uib-typeahead=\"d as d.full_name for d in ctrl.typeaheadDepartment($viewValue)\" typeahead-on-select=\"ctrl.typeaheadSelected($item)\" typeahead-show-hint=\"false\" typeahead-wait-ms=\"500\" placeholder=\"Search by department name,abbreviation or campus\"\n" +
    "                                class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            <div class=\"row\" ng-if=\"!ctrl.loading\">\n" +
    "                <div class=\"container\">\n" +
    "                    <ui-view></ui-view>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('home.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\" ng-controller=\"MenuController as ctrl\">\n" +
    "  <div class=\"navbar-header\">\n" +
    "    <a class=\"navbar-brand\" ui-sref=\"root.aps\">Wifi-Uff-Location</a>\n" +
    "  </div>\n" +
    "  <div class=\"collapse navbar-collapse\" ng-class=\"!navCollapsed && 'in'\">\n" +
    "    <ul class=\"nav navbar-nav\">\n" +
    "      <li uib-dropdown=\"\">\n" +
    "        <a href=\"#\" uib-dropdown-toggle=\"\">\n" +
    "                        Aps<b class=\"caret\"></b>\n" +
    "                    </a>\n" +
    "        <tree tree=\"ctrl.aps_menu\"></tree>\n" +
    "      </li>\n" +
    "      <li uib-dropdown=\"\">\n" +
    "        <a href=\"#\" uib-dropdown-toggle=\"\">\n" +
    "                        Departments<b class=\"caret\"></b>\n" +
    "                    </a>\n" +
    "        <tree  tree=\"ctrl.departments_menu\"></tree>\n" +
    "      </li>\n" +
    "      <li uib-dropdown=\"\">\n" +
    "        <a href=\"#\" uib-dropdown-toggle=\"\">\n" +
    "                        Importer<b class=\"caret\"></b>\n" +
    "                    </a>\n" +
    "        <tree tree=\"ctrl.importer_menu\"></tree>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"nav navbar-nav navbar-right\">\n" +
    "      <li uib-dropdown=\"\">\n" +
    "        <a href=\"#\" uib-dropdown-toggle=\"\">\n" +
    "          <img gravatar-src=\"ctrl.current_user.email\" class=\"img-circle\" gravatar-size=\"25\"></span><b class=\"caret\"></b>\n" +
    "                    </a>\n" +
    "        <tree tree=\"ctrl.session_menu\"></tree>\n" +
    "      </li>\n" +
    "    </ul>\n" +
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
    "<div class=\"row\">\n" +
    "    <leaflet id=\"map\" center=\"ctrl.center\" layers=\"ctrl.layers\" markers=\"ctrl.markers\" event-broadcast=\"ctrl.events\" legend=\"ctrl.legend\" defaults=\"ctrl.defaults\" width=\"100%\" height=\"400px\"></leaflet>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <br/>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"btn-group\" role=\"group\">\n" +
    "    <button ng-if=\"!ctrl.editing\" type=\"button\" ui-sref=\"root.departments.upload_map({department_id: ctrl.department_id})\" uib-tooltip=\"Replace Map\" class=\"btn btn-warning\" tooltip-placement=\"top-left\"><i class=\"fa fa-cloud-upload\"></i></button>\n" +
    "    <button ng-if=\"!ctrl.editing\" type=\"button\" ng-click=\"ctrl.edit()\" class=\"btn btn-primary\" uib-tooltip=\"Change routers configuration in map\" tooltip-placement=\"top-left\"><i class=\"fa fa-pencil\"></i></button>\n" +
    "  </div>\n" +
    "    <form name=\"mark_aps\" class=\"form-inline\" ng-if=\"ctrl.editing\">\n" +
    "        <label class=\"text-success\" ng-hide=\"ctrl.unmarkedAps.length\"> 0 APs left to add, please verify before save </label>\n" +
    "        <select name=\"unmarked_ap\" ng-model=\"ctrl.unmarkedAp\" ng-required=\"true\" ng-show=\"ctrl.unmarkedAps.length > 0\" class=\"form-control\" ng-options=\"ap.name for ap in ctrl.unmarkedAps\">\n" +
    "          <option value=\"\" disabled=\"\">Add Ap to Map</option>\n" +
    "        </select>\n" +
    "        <button type=\"button\" ng-click=\"ctrl.addApToMap(ctrl.unmarkedAp)\" ng-disabled=\"mark_aps.$invalid\" ng-show=\"ctrl.unmarkedAps.length > 0\" class=\"btn btn-primary btn-small\" uib-tooltip=\"Add selected Ap to map\" tooltip-placement=\"top-left\"><i class=\"fa fa-plus\"></i></button>\n" +
    "        <div class=\"btn-group\" role=\"group\">\n" +
    "            <button type=\"button\" ng-click=\"ctrl.cancel()\" class=\"btn btn-small btn-danger\" uib-tooltip=\"Cancel\" tooltip-placement=\"top-left\"><i class=\"fa fa-times\"></i></button>\n" +
    "            <button type=\"button\" ng-click=\"ctrl.save()\" class=\"btn btn-small btn-success\" uib-tooltip=\"Save\" tooltip-placement=\"top-left\"><i class=\"fa fa-check\"></i></button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('map/upload.html',
    "<div class=\"row\">\n" +
    "  <bm-alerts bm-items=\"ctrl.alerts\"></bm-alerts>\n" +
    "</div>\n" +
    "<div class=\"row\" ng-if=\"ctrl.loading\">\n" +
    "  <h3 class=\"text-center\">Loading<i class=\"fa fa-spinner fa-spin\"></i></h3>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"container\" ng-if=\"!ctrl.loading\">\n" +
    "    <form name=\"upload_map\" class=\"form-horizontal\">\n" +
    "      <div class=\"form-group\" ng-class=\"{'has-error': ctrl.department.map_url == null, 'has-warning': ctrl.department.map_url}\">\n" +
    "        <label for=\"file\" class=\"control-label col-xs-2\">Upload</label>\n" +
    "        <div class=\"col-xs-10\">\n" +
    "          <input name=\"file\" type=\"file\" nv-file-select uploader=\"ctrl.uploader\" class=\"form-control\" options=\"\" />\n" +
    "          <span class=\"help-block\" ng-hide=\"ctrl.department.map_url\">This department has not map yet! Please upload one!</span>\n" +
    "          <span class=\"help-block\" ng-show=\"ctrl.department.map_url\">This department already has a map! Upload one to replace it!</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <button uib-tooltip=\"Cancel\" ng-show=\"ctrl.department.map_url\" class=\"btn btn-warning\" name=\"show_map\" ui-sref=\"root.departments.map({department_id: ctrl.department.id})\">Cancel</button>\n" +
    "        <button uib-tooltip=\"Upload a Map\" name=\"upload\" ng-disabled=\"ctrl.uploader.queue.length == 0\" ng-click=\"ctrl.upload()\" type=\"submit\" class=\"btn btn-primary\" ng-if=\"!ctrl.uploading\"> Send </button>\n" +
    "        <button type=\"submit\" class=\"btn btn-primary\" ng-if=\"ctrl.uploading\" disabled>Sending <i class=\"fa fa-spinner fa-spin\"></i></button>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
