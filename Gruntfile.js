'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          'node_modules/**/**.*',
          'app/directives/**.js',
          'app/controllers/**.js',
          'app/services/**.js',
          'app/**.js',
          'app/views/**.html',
          'app/views/**/**.html'
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
          "node_modules/jquery/dist/jquery.js",
          "node_modules/bootstrap/dist/js/bootstrap.js",
          "node_modules/leaflet/dist/leaflet.js",
          "node_modules/leaflet-label/dist/leaflet.label.js",
          "node_modules/angular/angular.js",
          "node_modules/angular-simple-logger/dist/angular-simple-logger.js",
          "node_modules/ui-leaflet/dist/ui-leaflet.js",
          "node_modules/angular-smart-table/dist/smart-table.js",
          "node_modules/angular-resource/angular-resource.js",
          "node_modules/angular-route/angular-route.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
          "node_modules/angular-ui-router/release/angular-ui-router.js",
          "node_modules/angular-file-upload/dist/angular-file-upload.js",
          "node_modules/angular-jwt/dist/angular-jwt.js",
          "node_modules/angular-local-storage/dist/angular-local-storage.js",
          "node_modules/ui-navbar/release/js/ui-navbar.js",
          'app/app.js',
          'config/development.js',
          'app/directives/**.js',
          'app/services/**.js',
          'app/controllers/**.js',
          'dist/templates.js'
        ],
        dest: 'dist/app.js'
      },
      production: {
        src: [
          "node_modules/jquery/dist/jquery.js",
          "node_modules/bootstrap/dist/js/bootstrap.js",
          "node_modules/leaflet/dist/leaflet.js",
          "node_modules/leaflet-label/dist/leaflet.label.js",
          "node_modules/angular/angular.js",
          "node_modules/angular-simple-logger/dist/angular-simple-logger.js",
          "node_modules/ui-leaflet/dist/ui-leaflet.js",
          "node_modules/angular-smart-table/dist/smart-table.js",
          "node_modules/angular-resource/angular-resource.js",
          "node_modules/angular-route/angular-route.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
          "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
          "node_modules/angular-ui-router/release/angular-ui-router.js",
          "node_modules/angular-file-upload/dist/angular-file-upload.js",
          "node_modules/angular-jwt/dist/angular-jwt.js",
          "node_modules/angular-local-storage/dist/angular-local-storage.js",
          "node_modules/ui-navbar/release/js/ui-navbar.js",
          'app/app.js',
          'config/production.js',
          'app/directives/**.js',
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
          "node_modules/bootstrap/dist/css/bootstrap.css",
          "node_modules/angular-bootstrap/dist/ui-bootstrap-csp.css",
          "node_modules/font-awesome/css/font-awesome.css",
          "node_modules/leaflet/dist/leaflet.css",
          "node_modules/leaflet-label/dist/leaflet.label.css",
          "node_modules/ui-navbar/release/css/ui-navbar.css",
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
          src: ['./app/index.html', "node_modules/bootstrap/dist/css/bootstrap.css.map", "node_modules/angular-file-upload/dist/angular-file-upload.js.map"],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ["./node_modules/bootstrap/dist/fonts/**"],
          dest: 'dist/fonts/'
        }, {
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ["./node_modules/font-awesome/fonts/**"],
          dest: 'dist/fonts/'
        }],
      },
    },
    expressrunner: {
      options: {
        script: './server.js',
        debug: 'app*'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      production: {
        files: {
          './dist/app.js': [
            "node_modules/jquery/dist/jquery.js",
            "node_modules/bootstrap/dist/js/bootstrap.js",
            "node_modules/leaflet/dist/leaflet.js",
            "node_modules/leaflet-label/dist/leaflet.label.js",
            "node_modules/angular/angular.js",
            "node_modules/angular-simple-logger/dist/angular-simple-logger.js",
            "node_modules/ui-leaflet/dist/ui-leaflet.js",
            "node_modules/angular-smart-table/dist/smart-table.js",
            "node_modules/angular-resource/angular-resource.js",
            "node_modules/angular-route/angular-route.js",
            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            "node_modules/angular-file-upload/dist/angular-file-upload.js",
            "node_modules/angular-jwt/dist/angular-jwt.js",
            "node_modules/angular-local-storage/dist/angular-local-storage.js",
            "node_modules/ui-navbar/release/js/ui-navbar.js",
            'app/app.js',
            'config/production.js',
            'app/directives/**.js',
            'app/services/**.js',
            'app/controllers/**.js',
            'dist/templates.js'
          ]
        }
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
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build:production', ['bundle assets in production'], ['ngtemplates', 'uglify:production', 'concat_css', 'copy']);
  grunt.registerTask('build:development', ['bundle assets in development'], ['ngtemplates', 'concat:development', 'concat_css', 'copy']);
  grunt.registerTask('run', ['run server in development'], ['build:development', 'expressrunner']);
};
