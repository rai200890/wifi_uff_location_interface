// client/Gruntfile.js

// Generated on 2014-07-18 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // Load grunt tasks automatically

    // Define the configuration for all the tasks
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['app/assets/templates/**/**.html', 'app/assets/templates/**.html'],
                tasks: ['ngtemplates'],
                options: {
                    spawn: true
                }
            }
        },
        ngtemplates:  {
            wifiUffLocation:        { /*Nome do módulo da applicação*/
                prefix: "/",
                src:      ['app/assets/templates/**/**.html', 'app/assets/templates/**.html'],
                dest:     'app/assets/javascripts/templates.js',
                options:  {
                    url:    function(url) { return url.replace('app/assets/templates/', ''); }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
};