/**
* oauth2js (https://github.com/ni-c/raspberry2cjs)
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
requirejs(['http', 'path', 'express', './routes'], function(http, path, express, routes) {
	var app = express();

	app.configure(function() {
		app.set('ports', [8000]);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(app.router);
		app.use(require('less-middleware')({
			src : __dirname + '/public'
		}));
		app.use(express.static(path.join(__dirname, 'public')));
	});

	app.configure('development', function() {
		app.use(express.errorHandler());
	});

	app.get('/', routes.index);

    app.get('ports').forEach(function(port) {
      http.createServer(app).listen(port, function() {
        console.log('\u001b[32mExpress server listening on port \u001b[33m' + port + '\033[0m');
      });
    });
});
