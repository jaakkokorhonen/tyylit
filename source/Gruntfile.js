/*
 * Gruntfile.js for http://finnair-ui-proto.frantic.com/patternlab/public/
 */
module.exports = function( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {


			plugin_js: {
				files: [
					'js/modernizr.js'
				],
				tasks: ['uglify:plugin_js_min', 'shell:generate']
			},

			js: {
				files: ['js/main.js'],
				tasks: ['uglify:main_js_min', 'shell:generate']
			},

			sass: {
				files: [
					'css/style.scss',
					'css/scss/base/*.scss',
					'css/scss/generic/*.scss',
					'css/scss/objects/*.scss'
				],
				tasks: ['sass', 'shell:generate'],
				options: {
					livereload: false,
				}
			},

			html: {
				files: [
					'_patterns/**/*.mustache'
					//'source/assets/fonts/*',
					//'source/assets/images/*'

				],
				tasks: ['shell:generate']
			}

		},

		sass: {

			css: {
				options: {
					trace: false,
					style: 'compressed' // nested, expanded, compact, compressed
				},
				files : {
					'css/style.css': 'css/style.scss'
				}
			}

		},

		uglify: {
			plugin_js_min: {
				options: {
					mangle: true,
					preserveComments: false,
					compress: {
						global_defs: {
							'DEBUG': false
						},
						drop_debugger: true
					}
				},
				files: {
					'js/plugins.min.js': 'js/modernizr.js'
					//'source/assets/js/basic-functions.min.js': 'source/assets/js/basic-functions.js'
				}
			},
			main_js_min: {
				options: {
					mangle: true,
					preserveComments: false,
					compress: {
						global_defs: {
							'DEBUG': false
						},
						drop_debugger: true
					}
				},
				files: {
					'js/main.min.js': 'js/main.js'
					//'source/assets/js/basic-functions.min.js': 'source/assets/js/basic-functions.js'
				}
			}
		},

		shell: {
			generate: {
				command: 'php ../core/builder.php -g',
				options: {
					failOnError: false,
					stdout: true,
					execOptions: {
						cwd: '.'
					}
				}
			}
		}

	});

	// Dynamically load Npm Tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Task lists
	grunt.registerTask('default', ["sass", "uglify", "shell", "watch"]);

};