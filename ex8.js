var Hapi = require('hapi');
var server = new Hapi.Server();
var rot13 = require('rot13-transform');
var fs = require('fs');
var path = require('path');

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/',
	method: 'GET',
	handler: function(request, reply){
		var filePath = path.join(__dirname, '/hapiness.txt');
		reply(fs.createReadStream(filePath).pipe(rot13()));
	}
});

server.start();