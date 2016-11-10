'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          './node_modules/**/**.*',
          './app/controllers/**.js',
          './app/services/**.js',
          './app/**.js',
          './app/views/**.html',
          './app/views/**/**.html'
        ],
        tasks: ['build:development'],
        options: {
          spawn: true,
          livereload: true
        }
      }
    },
    ngtemplates: {
      wifiUffLocation: { /*Nome do módulo da applicação*/
        prefix: "/",
        src: ['./app/views/**/**.html', './app/views/home.html', './app/views/login.html', './app/views/alerts.html'],
        dest: './dist/templates.js',
        options: {
          url: function(url) {
            return url.replace('./app/views/', '');
          }
        }
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      development: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/bootstrap/dist/js/bootstrap.min.js",
          "node_modules/leaflet/dist/leaflet.js",
          "node_modules/leaflet-label/dist/leaflet.label.js",
          "node_modules/angular/angular.min.js",
          "node_modules/angular-simple-logger/dist/angular-simple-logger.min.js",
          "node_modules/ui-leaflet/dist/ui-leaflet.min.js",
          "node_modules/angular-smart-table/dist/smart-table.min.js",
          "node_modules/angular-resource/angular-resource.min.js",
          "node_modules/angular-route/angular-route.min.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
          "node_modules/angular-resource/angular-resource.min.js",
          "node_modules/angular-ui-router/release/angular-ui-router.min.js",
          "node_modules/angular-file-upload/dist/angular-file-upload.min.js",
          "node_modules/angular-jwt/dist/angular-jwt.js",
          "node_modules/angular-local-storage/dist/angular-local-storage.js",
          'app/app.js',
          'config/development.js',
          'app/services/**.js',
          'app/controllers/**.js',
          'dist/templates.js'
        ],
        dest: 'dist/app.js'
      },
      production: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/bootstrap/dist/js/bootstrap.min.js",
          "node_modules/leaflet/dist/leaflet.js",
          "node_modules/angular/angular.min.js",
          "node_modules/angular-simple-logger/dist/angular-simple-logger.min.js",
          "node_modules/ui-leaflet/dist/ui-leaflet.min.js",
          "node_modules/leaflet-label/dist/leaflet.label.js",
          "node_modules/angular-smart-table/dist/smart-table.min.js",
          "node_modules/angular-resource/angular-resource.min.js",
          "node_modules/angular-route/angular-route.min.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
          "node_modules/angular-resource/angular-resource.min.js",
          "node_modules/angular-ui-router/release/angular-ui-router.min.js",
          "node_modules/angular-file-upload/dist/angular-file-upload.min.js",
          "node_modules/angular-jwt/dist/angular-jwt.js",
          "node_modules/angular-local-storage/dist/angular-local-storage.js",
          'app/app.js',
          'config/production.js',
          'app/services/**.js',
          'app/controllers/**.js',
          'dist/templates.js'
        ],
        dest: './dist/app.js'
      }
    },
    concat_css: {
      all: {
        src: [
          "node_modules/bootstrap/dist/css/bootstrap.min.css",
          "node_modules/angular-bootstrap/dist/ui-bootstrap-csp.css",
          "node_modules/font-awesome/css/font-awesome.min.css",
          "node_modules/leaflet/dist/leaflet.css",
          "node_modules/leaflet-label/dist/leaflet.label.css",
          "styles/main.css"
        ],
        dest: "./dist/app.css"
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['./images/**', './fonts/**'],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['./app/index.html'],
          dest: 'dist/'
        }],
      },
    },
    expressrunner: {
      options: {
        script: './server.js',
        debug: 'app*'
      }
    }
  });

  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-runner');

  grunt.registerTask('build:production', ['bundle assets in production'], ['ngtemplates', 'concat:production', 'concat_css', 'copy']);
  grunt.registerTask('build:development', ['bundle assets in development'], ['ngtemplates', 'concat:development', 'concat_css', 'copy']);
  grunt.registerTask('run', ['run server in development'], ['build:development', 'expressrunner']);
};
