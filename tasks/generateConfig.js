/*
 * grunt-generate-config
 * https://github.com/gmodev/grunt-generate-config
 *
 * Copyright (c) 2013 Jason Gill
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('generateConfig', 'A Grunt plugin to generate configs from templates', function() {

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
				var parts = match[1].split("|");
				var sectionConfigEntry = parts[0].split(":");
				var iterator = parts[1];

				var section = sectionConfigEntry[0];
				var configEntry = sectionConfigEntry[1];

				if(input[section] == null) {
					grunt.fail.fatal("Missing section: '" + section + "' from input: '" + options.input + "'");
				}

				var configEntryValue;
				if (typeof input[section][configEntry] === "object" && !(input[section][configEntry] instanceof Array) ) {

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

				var replaceWith = "";
				if (iterator !== undefined) {
					for( var i = 0; i < configEntryValue.length; i++) {
						var value = configEntryValue[i];
						var temp = replaceWith + iterator.replace("{value}", value);

						var j = i + 1;
						if( j === configEntryValue.length ) {
							temp = temp.replace("{newline}", "");
							temp = temp.replace("{comma}", "");
						}
						else {
							temp = temp.replace("{newline}", "\n");
							temp = temp.replace("{comma}", ",");
						}

						replaceWith = temp;
					}
				}
				else {
					replaceWith = configEntryValue;
				}

				output = output.replace(replaceMe, replaceWith);
			}

			var configFile = template.replace(".template", "");
			grunt.log.writeln("Generating config: " + configFile);
			grunt.file.write(configFile, output);
		});

	});

};
