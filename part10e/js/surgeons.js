'use strict';

var surgeons = (function(){

	var surgeons = ko.observableArray();

	var beingMerged = ko.observableArray();
	var isMerging = ko.computed(function(){

		return ( beingMerged().length > 0 );
	});

  //Tracks the selected surgeon in merger module
	var selectedSurgeon = ko.observable({});

	/*
	 * Placeholder method, this will be modified
	 * once we start to add filter capabilities
	 */
	var records = ko.computed(function(){

		return surgeons();
	});

  /*
   * Determines if the the <tbody> should have
   * the accordion style based on the
   * childRecord array length
   */
	var parentRowStyle = function( data ){

		if( data.childRecords.length > 0 ){

			return 'tbl--accordion__is-collapsed';

		} else {

			return '';
		}
	};

  /*
   * Method for toggling accordion rows
   * between their open and closed states
   */
	var toggle = function( data ){

		//check to see if we can expand it

		if( data.childRecords.length > 0 ){

			var $container = $(arguments[1].toElement).parents('tbody');
			$container.toggleClass('tbl--accordion__is-expanded').toggleClass('tbl--accordion__is-collapsed');
		}
	};


  //Tracks if the current record is being merged
	var recordIsBeingMerged = function( selectedData ){

		var result = beingMerged().filter(function(currentData){

			if( currentData.id === selectedData.id ){

				return currentData;
			}
		});

		return( result.length > 0 );
	};

  /*
   * Method for adding current record to
   * the merger module
   */
	var add = function( data ){

		beingMerged.push(data);
		PubSub.publish('spc/surgeon/add-record', data );
	};

  // Resets the merge state in response to merger module
	var resetMerge = function(){

		beingMerged.removeAll();
		selectedSurgeon({});
	};

  /*
   * Callback method after successfully loading
   * the surgeons data
   */
	var loadSurgeonsDoneCallback = function(resp){

		if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

			surgeons(resp.data);
		}
	};

  /*
   * Makes ajax request to load surgeons
   */
	var loadSurgeons = function( fetchDifferentData ){

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

  return {

    add: add,
    loadSurgeons: loadSurgeons,
    records: records,
    isMerging: isMerging,
    selectedSurgeon: selectedSurgeon,
    parentRowStyle: parentRowStyle,
    toggle: toggle,
    recordIsBeingMerged: recordIsBeingMerged,
    resetMerge: resetMerge
  };

})();