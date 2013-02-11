require(["jquery", "/js/bootstrap.min.js", "/js/socket.io.min.js", "/js/config.js"], function() {

	var socket = io.connect('http://' + host);
	
	socket.on('i2cset', function(data) {
		$('*[data-device=' + data.device_id + '][data-address=' + data.address + ']').removeClass('active');
		$('*[data-device=' + data.device_id + '][data-address=' + data.address + '][data-value=' + data.value + ']').addClass('active');
	});

	$('.i2cset').click(function() {
		socket.emit('i2cset', {
			device_id : $(this).attr('data-device'),
			address: $(this).attr('data-address'),
			value: $(this).attr('data-value')
		});
	});
});
