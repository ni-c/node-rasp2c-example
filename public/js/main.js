require(["jquery", "/js/bootstrap.min.js"], function() {

	$('.i2cset').click(function() {
		$.ajax({
			type : "GET",
			url : "/device/" + $(this).attr('data-device') + "/set/" + $(this).attr('data-address') + "/" + $(this).attr('data-value'),
		});
	});
	
});
