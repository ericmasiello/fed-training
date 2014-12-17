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
			all: ['js/*.js', 'js/controllers/*.js']
		},

		watch: {
			css: {
				files: 'css/**/*.css',
				tasks: ['cssmin'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['**/*.js', 'js/controllers/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['cssmin', 'jshint', 'watch']);
};