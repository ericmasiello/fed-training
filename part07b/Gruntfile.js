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
		},
        watch: {
            css: {
                files: ['css/**/*.css', '!css/*.min.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            }
        }
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['cssmin']);
};