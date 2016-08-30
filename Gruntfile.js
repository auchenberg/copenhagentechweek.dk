// Gruntfile used to serve project when jekyll doesn't work for some reason

'use strict'

var SERVER_PORT = 4000;

module.exports = function (grunt) {
  // show time at the end
  require('time-grunt')(grunt);
  // load all tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dist: {
        options: {
          middleware: function (connect) {
            var endings = [
              'html',
              'js',
              'svg',
              'css',
              'png',
              'woff',
              'woff2',
              'tff',
              'gif'
            ];
            var rewrite = '!';
            for (var i = 0; i < endings.length; i++) {
              rewrite += '\\.' + endings[i];
              if(i < endings.length - 1) {
                rewrite += '|';
              }
            }
            rewrite += '$ /index.html [L]';

            return [
              require('connect-modrewrite')([rewrite]),
              require('serve-static')('_site')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    return grunt.task.run([
      'connect:dist:keepalive'
    ])
  });
};
