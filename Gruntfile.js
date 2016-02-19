/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
		url: '<%= pkg.homepage %>',
                options: {
		    exclude: 'build,dist,doc',
                    paths: ['./lib'],
                    outdir: 'doc/'
                }
            }
        },

        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: ['lib/tracksymbol.js'],
            dest: 'leaflet-tracksymbol.js',
          },
        },

        jshint: {
            all: ['lib/*.js']
        },
    
	qunit: {
            all: ['test/*.html']
        },
        
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright by <%= pkg.author.name %> <%= pkg.author.email %> */\n'
          },
          build: {
            src: '<%= pkg.name %>.js',
            dest: '<%= pkg.name %>.min.js'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('jenkins', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'yuidoc', 'uglify']);
};
