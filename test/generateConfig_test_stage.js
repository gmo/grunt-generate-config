'use strict';

var grunt = require('grunt');

exports.generateConfig = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	stage: function(test) {
		test.expect(2);

		var actual = grunt.file.read('test/node/config.js');
		var expected = grunt.file.read('test/expected/node/stage.config.js');
		test.equal(actual, expected, 'stage.config.js');

		actual = grunt.file.read('test/www/config.ini');
		expected = grunt.file.read('test/expected/www/stage.config.ini');
		test.equal(actual, expected, 'stage.config.ini');

		test.done();
	}
};
