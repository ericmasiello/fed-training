module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		cssmin: {
			combine: {
				files: {
					'css/main.min.css': ['css/main.css']
				}
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['cssmin']);
};