module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      combine: {
        files: {
          'css/main.min.css': ['css/main.css']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/*.js', 'js/services/*.js']
    },

    watch: {

      css:{
        files: 'less/**/*.less',
        tasks:['less', 'cssmin']
      },

      scripts: {
        files: ['**/*.js', 'js/services/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },

    less: {
      development: {
        files: {
          "css/main.css": "less/main.less"
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'watch']);
};