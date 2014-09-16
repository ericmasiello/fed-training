'use strict';

var surgeons = (function(){

	var publicAPI = {};
	var surgeons = ko.observableArray();

	var beingMerged = ko.observableArray();
	publicAPI.isMerging = ko.computed(function(){

		return ( beingMerged().length > 0 );
	});

	publicAPI.selectedSurgeon = ko.observable({});

	/*
	 * Placeholder method, this will be modified
	 * once we start to add filter capabilities
	 */
	publicAPI.records = ko.computed(function(){

		return surgeons();
	});

	publicAPI.parentRowStyle = function( data ){

		if( data.childRecords.length > 0 ){

			return 'tbl--accordion__is-collapsed';

		} else {

			return '';
		}
	};

	publicAPI.expand = function( data ){

		//check to see if we can expand it

		if( data.childRecords.length > 0 ){

			var $container = $(arguments[1].toElement).parents('tbody');
			$container.toggleClass('tbl--accordion__is-expanded').toggleClass('tbl--accordion__is-collapsed');
		}
	};

	publicAPI.recordIsBeingMerged = function( selectedData ){


		var result = beingMerged().filter(function(currentData){

			if( currentData.id === selectedData.id ){

				return currentData;
			}
		});

		return( result.length > 0 );
	};

	publicAPI.add = function( data ){

		beingMerged.push(data);
		PubSub.publish('spc/surgeon/add-record', data );
	};

	publicAPI.resetMerge = function(){

		beingMerged.removeAll();
		publicAPI.selectedSurgeon({});
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