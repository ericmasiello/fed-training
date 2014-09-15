'use strict';

var surgeons = (function(){

	var publicAPI = {};
	var isInitialized = false;
	var surgeons = ko.observableArray();

	/*
	 * Placeholder method, this will be modified
	 * once we start to add filter capabilities
	 */
	publicAPI.records = ko.computed(function(){

		return surgeons();
	});

	var loadSurgeonsDoneCallback = function(resp){

		if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

			surgeons(resp.data);
		}
	};

	var loadSurgeons = function(){

		$.ajax({
			'url': 'sampledata.json',
			'type': 'get'
		}).done( loadSurgeonsDoneCallback );

		//Alternative ...
		//$.get('sampledata.json', loadSurgeonsDoneCallback);
	};

	publicAPI.init = function(){

		if( isInitialized === false ){

			loadSurgeons();
		}

		isInitialized = true;
	};

	return publicAPI;

})();