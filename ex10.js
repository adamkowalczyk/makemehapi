var Hapi = require('hapi');
var server = new Hapi.Server();
var Joi = require('joi');
var path = require('path');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/login',
	method: 'POST',
	handler: function(request, reply){
		reply('login successful');
	},
	config: {
		validate: {
			payload: Joi.object({
				isGuest: Joi.boolean().required(),
				username: Joi.string().when('isGuest', {is: false, then: Joi.required()}),
				accessToken: Joi.string().alphanum(),
				password: Joi.string().alphanum(),
			})
			.options({allowUnknown: true})
			.without('accessToken', 'password')
		}
	}
});

server.start();