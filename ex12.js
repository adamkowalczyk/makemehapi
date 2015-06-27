var Hapi = require('hapi');
var server = new Hapi.Server();
var Boom = require('boom');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.state('session', {
	ttl: 10,
	isSecure: false,
	domain: 'localhost',
	path: '/{path*}',
	encoding: 'base64json'
});

server.route({
	path: '/set-cookie',
	method: 'GET',
	config: {
		state: {
			parse: true,
			failAction: 'log'
		}
	},
	handler: function(request, reply){
		var cookie = {key: 'makemehapi'};
		reply('yo').state('session', cookie);
	}
});

server.route({
	path: '/check-cookie',
	method: 'GET',
	config: {
		state: {
			parse: true,
			failAction: 'log'
		}
	},
	handler: function(request, reply){
		var session = request.state.session;
		if (session.key === 'THISEXERCISEISBROKENOHNOES_makemehapi') {
			reply({user: 'hapi'});
		}
		else {
			var error =  Boom.create(400, 'Invalid cookie value' );
			reply(error);
		}
	}
});

server.start();