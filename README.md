# grunt-generate-config

> A Grunt plugin to generate configs from templates

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
npm install grunt-generate-config
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-generate-config');
```

## The "generateConfig" task

### Overview
In your project's Gruntfile, add a section named `generateConfig` to the data object passed into `grunt.initConfig()`.

```
grunt.initConfig({
  generateConfig: {
    options: {
      input: 'configValues.json',
      tempates: [
      	'www/config.template.ini',
      	'nodejs/config.template.js'
      ]
    },
    dev: {},
    stage: {},
    production: {}
  }
})
```

### Options

#### options.input
Type: `String`

The file that contains all the config settings for the different environments

__Sample File:__

```
{
	"memcache": {
		"host": {
			"dev": "dev.memcache.host",
			"stage": "stage.memcache.host",
			"production": "prod.memcache.host"
		},
		"port": 1234
	},

	"misc": {
		"whiteList": {
			"dev": ["192.168.1.1", "127.0.0.1", "10.0.0.1"],
			"stage": ["192.168.1.2", "127.0.0.2", "10.0.0.2"],
			"production": ["192.168.1.3", "127.0.0.3", "10.0.0.3"]
		}
	}
}
```

#### options.templates
Type: `Array`

An array of template files used to generate the config files.

**Note:** The file name must contain _`template`_ in the file name.  A file named `config.template.ini` will become `config.ini`.

__Sample INI Template File:__

```
[MEMCACHE]
host="$memcache:host$"
port=$memcache:port$"

[MISC]
$misc:whiteList|whiteList[] = "{value}"{newline}$
```

__Sample JS Template File:__

```
var environmentSettings = {

	db: {
		host: '$xyz-db:host$',
		username: '$xyz-db:username$',
		password: '$xyz-db:password$',
		schema: '$xyz-db:schema$'
	},

	whiteList: [$misc:whiteList|"{value}"{comma}$]
};

module.exports = environmentSettings;
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-11-18   v1.0.0
