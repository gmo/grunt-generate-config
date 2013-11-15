/*
 * grunt-create-config
 * https://github.com/jason/grunt-create-config
 *
 * Copyright (c) 2013 Jason Gill
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		create_config: {
			options: {
				input: 'configValues.json',
				templates: [
					'test/www/config.template.ini',
					'test/node/config.template.js'
				]
			},

			dev: {},
			stage: {},
			production: {
				options: {
					input: '/some/other/dir/configValues.json'
				}
			}
		},

		// Unit tests.
		nodeunit: {
			dev: ['test/create_config_test_dev.js'],
			stage: ['test/create_config_test_stage.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['test-dev', 'test-stage']);
	grunt.registerTask('test-dev', ['create_config:dev', 'nodeunit:dev']);
	grunt.registerTask('test-stage', ['create_config:stage', 'nodeunit:stage']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

	var target = grunt.option('target') || 'dev';
	grunt.registerTask('build-config', ['create_config:' + target]);
};
