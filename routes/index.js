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

define(['rasp2c'], function(rasp2c) {
	var routes = {};

	routes.index = function(req, res) {
		/*
		rasp2c.dump(26, "0x00-0x01", function(err,result) {
			if (result[0]==0) {
				rasp2c.set(26, 0, 255, function(err, result) {
				});
			} else {
				rasp2c.set(26, 0, 0, function(err, result) {
				});
			}
		});
		*/
		rasp2c.detect(function(err, devices) {
			res.render('index', {
        devices: devices
    	});
		});
	};

  routes.devices = function(req, res) {
		rasp2c.detect(function(err, devices) {
			res.render('device', {
        devices: devices,
        device_id: req.params.device_id
    	});
		});
  }

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
