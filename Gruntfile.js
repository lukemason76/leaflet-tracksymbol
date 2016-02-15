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
        
        mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              captureFile: 'results.txt', // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
          }
        },

        env: {
          coverage: {
            APP_DIR_FOR_CODE_COVERAGE: '../coverage/instrument/lib/'
          }
        },

        instrument: {
          files: 'lib/*.js',
          options: {
            lazy: true,
            basePath: 'coverage/instrument/'
          }
        },

        storeCoverage: {
          options: {
            dir: 'coverage/reports'
          }
        },

        makeReport: {
          src: 'coverage/reports/**/*.json',
          options: {
            type: 'cobertura',
            dir: 'coverage/reports',
            print: 'detail'
          }
        },

        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright by <%= pkg.author.name %> <%= pkg.author.email %> */\n'
          },
          build: {
            src: '<%= pkg.name %>.js',
            dest: '<%= pkg.name %>.min.js'
          }
        },
        
        mochacli: {
          options: {
            reporter: "list",
            ui: "tdd"
          },
          all: ["test/*.js"]
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('coverage', ['jshint', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);
    grunt.registerTask('jenkins', ['jshint', 'env:coverage', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);
    grunt.registerTask('default', ['jshint', 'mochaTest', 'concat', 'yuidoc', 'uglify']);
};
