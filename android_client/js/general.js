$("#page-general").bind('pagebeforeshow',function() {
	$('.myIframe').css('height', $(window).height() * 0.65 +'px');
	$('#date_time').attr('style', 'display: none');
	$('#google_map').attr('style', 'display: none');
 	$('#general-bar').attr('style', 'display: none');
	

$('#btnTime').off('click').on('click', function() {
	$('#btnTime').buttonMarkup({ theme: "c" });
	$('#btnPlace').buttonMarkup({ theme: "a" });
	$('#date_time').attr('style', 'display: inline');
	$('#google_map').attr('style', 'display: none');
});


    $('#btnPlace').off('click').on('click', function() {

  $('#btnTime').buttonMarkup({ theme: "a" });
  $('#btnPlace').buttonMarkup({ theme: "c" });

  $('#google_map').attr('style', 'display: block');
  $('#date_time').attr('style', 'display: none');

   google.maps.event.trigger(SMART_TODO.map, 'resize');
  SMART_TODO.map.setCenter(new google.maps.LatLng(SMART_TODO.coords.latitude, 
  	SMART_TODO.coords.longitude));
});
    


$('#add-item').keydown(function(event) {

	$('#general-bar').attr('style', 'display: inline'); 
});



$('#btnTimeDone').off('click').on('click', function() {
	$.post(SMART_TODO.domain + "/addGeneralItemTime", 
		{ item : $('#add-item').val(), datetime : $('#mydate').val() + 
		','+ $('#mytime').val()}, function(result) {
    $.mobile.changePage("#page-home", {transition : "none"});
  });
})
});



