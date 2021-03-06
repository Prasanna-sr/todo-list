var SMART_TODO = SMART_TODO || {};


(function() {

	if(window) {
		SMART_TODO.domain = (window.location.host.indexOf("localhost") !== -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
	} else {
		SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
	}

	if(SMART_TODO) {
		watchlocation();	
	}


	function watchlocation() {
		navigator.geolocation.watchPosition(onSuccess, onError,
			{ enableHighAccuracy: true, maximumAge:5000 });
	}

	function onSuccess(position) {
		if(position && position.coords) {
			SMART_TODO.coords = position.coords;
			$.post(SMART_TODO.domain + '/updateCoordinates', {currentLocation : SMART_TODO.coords, id : SMART_TODO.id}, function(result) {
				alert(result.task);	
			});
		} else {
			console.log('position coordinates not avaialble');
		}	
	}

	function onError(error) {
		console.log('geolocation error code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

})();


$("#page-home").bind('pagebeforeshow', function() {

	getItem();


	function getItem() {
		$('#general-reminders li').remove();
		$('#categorized-reminders li').remove();
		$.post(SMART_TODO.domain + '/getItem', {}, function(taskObj) {
			for(var i = 0; i < taskObj.length; i++) {
				if(taskObj[i].category == 1) {
					var element = '<li data-theme="c" data-icon="false"><a href="#">' + taskObj[i].task + '</a></li>';
					$('#general-reminders').append(element);	
				}
				if(taskObj[i].category == 0) { 
					var element = '<li data-theme="c" data-icon="false"><a href="#">' + taskObj[i].task + '</a></li>';
					$('#categorized-reminders').append(element);		
					//delete icon
					//$('#categorized-reminders').append('<li><div class="ui-grid-a"><div class="ui-block-a">' + taskObj[i].task + '</div><div class="ui-block-b align-right"><a id="btn-delete" class="ui-btn-right" data-role="button" data-icon="delete" data-iconpos="notext"></a></div></div></li>');	
				}
			}
			// $("[id='btn-delete']").on('click', function() {
			// 	alert("hi");
			// });
			$('#general-reminders li').swiperight(function() {
				$.post(SMART_TODO.domain + '/deleteItem', {item : $(this).text().trim()}, function(resultStr) {
					if(resultStr) {
						getItem();
					}
				});
			});
			$('#categorized-reminders li').swiperight(function() {
				$.post(SMART_TODO.domain + '/deleteItem', {item : $(this).text().trim()}, function(resultStr) {
					if(resultStr) {
						getItem();
					}
				});
			});

			$( "#categorized-reminders" ).sortable();
			$('#general-reminders').sortable();
			$("[id='btn-delete']").buttonMarkup();

			$('#general-reminders').listview('refresh');
			$('#categorized-reminders').listview('refresh');

		});	
}


});




