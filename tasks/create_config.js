/*
 * grunt-create-config
 * https://github.com/jason/grunt-create-config
 *
 * Copyright (c) 2013 Jason Gill
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('create_config', 'A Grunt plugin to generate configs from templates', function() {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({ });
		var target = this.target;
		var input = grunt.file.readJSON(options.input);

		var pattern = /\$(.*)\$/g;
		options.templates.forEach(function(template) {

			var templateInput = grunt.file.read(template);
			var output = templateInput;

			var match;
			while (match = pattern.exec(templateInput)) {

				var replaceMe = match[0];
				var sectionConfigEntry = match[1].split(":");
				var section = sectionConfigEntry[0];
				var configEntry = sectionConfigEntry[1];

				if(input[section] == null) {
					grunt.fail.fatal("Missing section: '" + section + "' from input: '" + options.input + "'");
				}

				var configEntryValue;
				if (typeof input[section][configEntry] === "object") {

					if(input[section][configEntry][target] == null) {
						grunt.fail.fatal("Missing section: '" + section + "' config entry: '" + configEntry + "' target: '" + target + "' from input: '" + options.input + "'");
					}
					configEntryValue = input[section][configEntry][target];
				}
				else {

					if(input[section][configEntry] == null) {
						grunt.fail.fatal("Missing section: '" + section + "' config entry: '" + configEntry + "' from input: '" + options.input + "'");
					}
					configEntryValue = input[section][configEntry];
				}

				output = output.replace(replaceMe, configEntryValue);
			}

			var configFile = template.replace(".template", "");
			grunt.log.writeln("Creating config: " + configFile);
			grunt.file.write(configFile, output);
		});

	});

};
