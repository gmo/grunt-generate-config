
var environmentSettings = {

	db: {
		host: '$xyz-db:host$',
		username: '$xyz-db:username$',
		password: '$xyz-db:password$',
		schema: '$xyz-db:schema$'
	},

	misc: {
		whiteList: [$misc:whiteList|"{value}"{comma}$]
	}

};

module.exports = environmentSettings;