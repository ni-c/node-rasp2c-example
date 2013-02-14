/**
 * node-rasp2c-example (https://github.com/ni-c/node-rasp2c-example)
 *
 * @file app.js
 * @brief Raspberry I2C
 * @author Willi Thiel (ni-c@ni-c.de)
 *
 */

/**
 * RequireJS
 * @see http://requirejs.org/docs/node.html
 */
var requirejs = require('requirejs');
requirejs.config({
	nodeRequire : require
});

/**
 * Express
 * @see http://expressjs.com/guide.html
 */
requirejs(['http', 'path', 'express', 'socket.io', 'rasp2c', './routes'], function(http, path, express, socketio, rasp2c, routes) {
	var app = express();

	app.configure(function() {
		app.set('port', 8000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(express.favicon(__dirname + '/public/favicon.ico'));
	});

	app.configure('development', function() {
		app.use(express.errorHandler());
	});

	app.get('/', routes.index);
	app.get('/device/:device_id', routes.devices);

	app.get('/js/socket.io.min.js', function(req, res) {
		res.sendfile(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js');
	});
	
	var server = http.createServer(app).listen(app.get('port'), 'localhost', function() {
		console.log('\u001b[32mnode-rasp2c-example listening on port \u001b[33m%d\u001b[32m at \u001b[33mlocalhost\033[0m', app.get('port'));
	});
	
	var io = socketio.listen(server);
	io.sockets.on('connection', function(socket) {
		socket.on('i2cset', function(data) {
			rasp2c.set(data.device_id, data.address, data.value, function(err, result) {
				io.sockets.emit('i2cset', data);
			});
		});
	});
});
