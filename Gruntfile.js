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
                    'assets/**/**.*',
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
                    "app/assets/jquery/dist/jquery.min.js",
                    "app/assets/bootstrap/dist/js/bootstrap.min.js",
                    "app/assets/leaflet/dist/leaflet.js",
                    "app/assets/angular/angular.min.js",
                    "app/assets/angular-leaflet-directive/dist/angular-leaflet-directive.min.js",
                    "app/assets/angular-smart-table/dist/smart-table.min.js",
                    "app/assets/angular-resource/angular-resource.min.js",
                    "app/assets/angular-route/angular-route.min.js",
                    "app/assets/angular-bootstrap/ui-bootstrap-tpls.min.js",
                    "app/assets/angular-resource/angular-resource.min.js",
                    "app/assets/angular-ui-router/release/angular-ui-router.min.js",
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
                    "app/assets/bootstrap/dist/css/bootstrap.min.css",
                    "app/assets/angular-bootstrap/ui-bootstrap-csp.css",
                    "app/assets/font-awesome/css/font-awesome.min.css",
                    "app/assets/leaflet/dist/leaflet.css"
                ],
                dest: "dist/styles.css"
            },
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: {
                        path: '.',
                        options: {
                            index: 'index.html'
                        }
                    }
                    //, middleware: function(connect, options) {
                    //    return [function(req, res) {
                            //res.setHeader('content-type', 'text/html');
                            //require('fs').createReadStream('index.html').pipe(res);
                       // }];
                    //}
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('build', ['bundle assets'] ,['ngtemplates', 'concat', 'concat_css']);

};