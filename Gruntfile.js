module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'public/build/<%= pkg.name %>.min.css': ['src/css/*']
        }
      }
    },
    react: {
      convert: {
        files: [
          {
            expand: true,
            cwd: 'src/jsx/',
            src: ['*.jsx'],
            dest: 'src/js/',
            ext: '.js'
          }
        ]
      }
    },
    uglify: {
      js: {
        options: {
          sourceMap: true,
          sourceMapName: 'public/build/<%= pkg.name %>.map'
        },
        files: {
          'public/build/<%= pkg.name %>.min.js': ['src/js/*']
        }
      }
    },
    cachebreaker: {
      bust: {
        options: {
          match: ['flibbertigibbet.min.css', 'flibbertigibbet.min.js'],
        },
        files: {
          src: ['index.html']
        }
      }
    },
    watch: {
      files: ['src/**/*'],
      tasks: ['default']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks.
  grunt.registerTask('default', ['cssmin:combine', 'react:convert', 'uglify:js', 'cachebreaker:bust']);
};