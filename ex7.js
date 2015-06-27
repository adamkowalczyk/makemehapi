var Hapi = require('hapi');
var path = require('path');
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/',
	method: 'GET',
	handler: {
			view: 'index2.html'
			}
});

server.views({
	engines: {
		html: require('handlebars')
	},
	path: path.join(__dirname, 'templates'),
	helpersPath: path.join(__dirname, 'templates/helpers')
});

server.start();