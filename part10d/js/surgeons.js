'use strict';

var surgeons = (function(){

	var publicAPI = {};
	var surgeons = ko.observableArray();

	/*
	 * Placeholder method, this will be modified
	 * once we start to add filter capabilities
	 */
	publicAPI.records = ko.computed(function(){

		return surgeons();
	});

	publicAPI.add = function( data ){

		PubSub.publish('spc/surgeon/add-record', data );
	};

	var loadSurgeonsDoneCallback = function(resp){

		if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

			surgeons(resp.data);
		}
	};

	publicAPI.loadSurgeons = function( fetchDifferentData ){

		var url = 'sampledata.json';

		/*
		 * Kludge we use for demo purposes so that we can fetch
		 * data from a different URL. We do this since we don't have
		 * an actual backend API that supports updating the data
		 * and retreiving the updated records back
		 */
		if( fetchDifferentData === true ){

			url = 'sampledata2.json';
		}

		$.ajax({
			'url': url,
			'type': 'get'
		}).done( loadSurgeonsDoneCallback );

		//Alternative ...
		//$.get('sampledata.json', loadSurgeonsDoneCallback);
	};

	return publicAPI;

})();