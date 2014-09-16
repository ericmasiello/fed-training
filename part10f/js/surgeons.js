'use strict';

var surgeons = (function(){

	/*
	 * Private values
	 */
	var surgeons = ko.observableArray();
	var beingMerged = ko.observableArray();
	var loadSurgeonsDoneCallback = function(resp){

		if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

			surgeons(resp.data);
		}
	};

	/*
	 * Public interfaces
	 */
	var publicAPI = {

		searchTerm: ko.observable(''),
		selectedSurgeon: ko.observable({}),
		filter: ko.observable('all'),

		parentRowStyle: function( data ){

			if( data.childRecords.length > 0 ){

				return 'tbl--accordion__is-collapsed';

			} else {

				return '';
			}
		},

		toggle: function( data ){

			//check to see if we can expand it

			if( data.childRecords.length > 0 ){

				var $container = $(arguments[1].toElement).parents('tbody');
				$container.toggleClass('tbl--accordion__is-expanded').toggleClass('tbl--accordion__is-collapsed');
			}
		},

		recordIsBeingMerged: function( selectedData ){

			var result = beingMerged().filter(function(currentData){

				if( currentData.id === selectedData.id ){

					return currentData;
				}
			});

			return( result.length > 0 );
		},

		add: function( data ){

			beingMerged.push(data);
			PubSub.publish('spc/surgeon/add-record', data );
		},

		resetMerge: function(){

			beingMerged.removeAll();
			publicAPI.selectedSurgeon({});
		},

		loadSurgeons: function( fetchDifferentData ){

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
		},

		isMerging: ko.computed(function(){

			return ( beingMerged().length > 0 );
		}),

		allSurgeons: function() {

			var searchTerm = typeof publicAPI.searchTerm() === 'string' ? publicAPI.searchTerm().toLowerCase() : '';

			return ko.utils.arrayFilter( surgeons(), function(data) {
				return ( data.name.toLowerCase().indexOf( searchTerm ) > -1 );
			});
		},

		possibleDuplicateSurgeons: function() {

			var searchTerm = typeof publicAPI.searchTerm() === 'string' ? publicAPI.searchTerm().toLowerCase() : '';

			return ko.utils.arrayFilter( surgeons(), function(data) {
				return ( data.possibleDuplicate === true && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
			});
		},

		mergedSurgeons: function() {

			var searchTerm = typeof publicAPI.searchTerm() === 'string' ? publicAPI.searchTerm().toLowerCase() : '';

			return ko.utils.arrayFilter( surgeons(), function(data) {
				return ( data.childRecords.length > 0 && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
			});
		},
	};

	/*
	 * Computed needs to be defined outside of the
	 * original publicAPI definition because it executes
	 * right away and needs to be able to reference the
	 * publicAPI value
	 */
	publicAPI.records = ko.computed(function(){

		switch( publicAPI.filter() ){

			case 'all':

				return publicAPI.allSurgeons();

			case 'possible':

				return publicAPI.possibleDuplicateSurgeons();

			case 'merged':

				return publicAPI.mergedSurgeons();
		}
	});

	return publicAPI;

})();