/**
* node-rasp2c-example (https://github.com/ni-c/node-rasp2c-example)
*
* @file routes/index.js
* @brief Raspberry I2C
* @author Willi Thiel (ni-c@ni-c.de)
*
*/

if( typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['rasp2c'], function(rasp2c) {
	var routes = {};

  /**
   * /
   */
	routes.index = function(req, res) {
		rasp2c.detect(function(err, devices) {
			res.render('index', {
        devices: devices
    	});
		});
	};

  /**
   * /device
   */
  routes.devices = function(req, res) {
		rasp2c.detect(function(err, devices) {
			res.render('device', {
        devices: devices,
        device_id: req.params.device_id
    	});
		});
  }

	/**
	 * /device/:device_id/set/:address/:value
	 */
  routes.set = function(req, res) {
  	var device_id = req.params.device_id;
		var address = req.params.address;
		var value = req.params.value;
		rasp2c.set(device_id, address, value, function(err, result) {
			if (!err) {
				res.json({result: result});
			} else {
				res.json({error: err});
			}
		});
  }
	
	return routes;
});
