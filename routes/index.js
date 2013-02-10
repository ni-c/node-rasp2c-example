/**
* oauth2js (https://github.com/ni-c/raspberry2cjs)
*
* @file routes/index.js
* @brief Raspberry I2C
* @author Willi Thiel (ni-c@ni-c.de)
*
*/

if( typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require) {
	var routes = {};

	routes.index = function(req, res) {
		res.render('index');
	};
	
	return routes;
});
