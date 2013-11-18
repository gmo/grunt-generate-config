'use strict';

var grunt = require('grunt');

exports.generateConfig = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	dev: function(test) {
		test.expect(2);

		var actual = grunt.file.read('test/node/config.js');
		var expected = grunt.file.read('test/expected/node/dev.config.js');
		test.equal(actual, expected, 'dev.config.js');

		actual = grunt.file.read('test/www/config.ini');
		expected = grunt.file.read('test/expected/www/dev.config.ini');
		test.equal(actual, expected, 'dev.config.ini');

		test.done();
	}
};
