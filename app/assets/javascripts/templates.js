angular.module('wifiUffLocation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('aps/index.html',
    "<h1 class=\"text-center\">Aps</h1>\n" +
    "<!--<div ui-view=\"new@aps\"></div>-->\n" +
    "<div ui-view=\"list@aps\"></div>"
  );


  $templateCache.put('aps/list.html',
    "<table class=\"table table-hover table-striped\">\n" +
    "    <thead>\n" +
    "    <th>ID</th>\n" +
    "    <th>Name</th>\n" +
    "    <th>IP</th>\n" +
    "    <th>Campus</th>\n" +
    "    <th>Building</th>\n" +
    "    <th>Location</th>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"ap in aps\">\n" +
    "        <td>{{ap.id}}</td>\n" +
    "        <td>{{ap.name}}</td>\n" +
    "        <td>{{ap.ip}}</td>\n" +
    "        <td>{{ap.campus_name}}</td>\n" +
    "        <td>{{ap.building_name}}</td>\n" +
    "        <td>{{ap.location_name}}</td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('aps/new.html',
    "<h1>New</h1>"
  );


  $templateCache.put('aps/show.html',
    ""
  );


  $templateCache.put('home.html',
    "<nav class=\"navbar navbar-default\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a class=\"navbar-brand\" href=\"#\">Wifi-Uff Location</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "            <ul class=\"nav navbar-nav\">\n" +
    "                <li><a ui-sref=\".aps\">APs</a></li>\n" +
    "                <li><a ui-sref=\".locations\">Locations</a></li>\n" +
    "                <!--<li class=\"dropdown\">-->\n" +
    "                    <!--<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>-->\n" +
    "                    <!--<ul class=\"dropdown-menu\" role=\"menu\">-->\n" +
    "                        <!--<li><a href=\"#\">Action</a></li>-->\n" +
    "                        <!--<li><a href=\"#\">Another action</a></li>-->\n" +
    "                        <!--<li><a href=\"#\">Something else here</a></li>-->\n" +
    "                        <!--<li class=\"divider\"></li>-->\n" +
    "                        <!--<li><a href=\"#\">Separated link</a></li>-->\n" +
    "                        <!--<li class=\"divider\"></li>-->\n" +
    "                        <!--<li><a href=\"#\">One more separated link</a></li>-->\n" +
    "                    <!--</ul>-->\n" +
    "                <!--</li>-->\n" +
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
    ""
  );

}]);
