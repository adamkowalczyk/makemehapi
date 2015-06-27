var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: '/upload',
	method: 'POST',
	config: {
		payload: {
			output: 'stream',
			parse: true
		}
	},
	handler: function(request, reply){

		var body = '';
		request.payload.file.on('data', function(chunk){
			body += chunk;
		});
		request.payload.file.on('end', function(){
			console.log(body);
		});

		var object = {
			description: request.payload.description,
			file: {
				data: body,
				filename: request.payload.file.hapi.filename,
				headers: request.payload.file.hapi.headers
			}
		};

		reply(object);
	}
});

server.start();