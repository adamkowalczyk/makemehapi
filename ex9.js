var Hapi = require('hapi');
var server = new Hapi.Server();
var Joi = require('joi');
var path = require('path');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/chickens/{breed}',
	method: 'GET',
	handler: function(request, reply){
		reply('yo');
	},
	config: {
		validate: {
			params: {
				breed: Joi.string().required()
			}
		}
	}
});

server.start();