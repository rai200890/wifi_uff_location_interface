'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: [
                    'node_modules/**/**.*',
                    'app/controllers/**.js',
                    'app/services/**.js',
                    'app/**.js',
                    'views/**.html',
                    'views/**/**.html'
                ],
                tasks: ['build'],
                options: {
                    spawn: true
                }
            }
        },
        ngtemplates:  {
            wifiUffLocation:        { /*Nome do módulo da applicação*/
                prefix: "/",
                src:      ['views/**/**.html', 'views/**.html'],
                dest:     'dist/templates.js',
                options:  {
                    url:    function(url) { return url.replace('views/', ''); }
                }
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            all: {
                src: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.min.js",
                    "node_modules/leaflet/dist/leaflet.js",
                    "node_modules/angular/angular.min.js",
                    "node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min.js",
                    "node_modules/angular-smart-table/dist/smart-table.min.js",
                    "node_modules/angular-resource/angular-resource.min.js",
                    "node_modules/angular-route/angular-route.min.js",
                    "node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js",
                    "node_modules/angular-resource/angular-resource.min.js",
                    "node_modules/angular-ui-router/release/angular-ui-router.min.js",
                    'app/app.js',
                    'app/services/**.js',
                    'app/controllers/**.js',
                    'dist/templates.js'
                ],
                dest: 'dist/built.js'
            },
        },
        concat_css: {
            options: {

            },
            all: {
                src: [
                    "node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "node_modules/angular-bootstrap/ui-bootstrap.min.css",
                    "node_modules/angular-bootstrap/ui-bootstrap-tpls.min.css",
                    "node_modules/font-awesome/css/font-awesome.min.css",
                    "node_modules/leaflet/dist/leaflet.css"
                ],
                dest: "dist/styles.css"
            }
        },
        connect: {
            server: {
                options: {
		keepalive: true,
                    /* Support `$locationProvider.html5Mode(true);`
                     * Requires grunt 0.9.0 or higher
                     * Otherwise you will see this error:
                     *   Running "connect:livereload" (connect) task
                     *   Warning: Cannot call method 'push' of undefined Use --force to continue.
                     */
                    middleware: function(connect, options, middlewares) {
                        var modRewrite = require('connect-modrewrite');

                        // enable Angular's HTML5 mode
                        middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.woff|\\.woff2|\\.ttf$ /index.html [L]']));

                        return middlewares;
                    }
                }
            }
        },
        browserify: {
            js: {
                // A single entry point for our app
                src: 'app/app.js',
                // Compile to a single file to add a script tag for in your HTML
                dest: 'dist/built.js',
            },
        },
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('build', ['bundle assets'] ,['ngtemplates', 'concat', 'concat_css']);

};
