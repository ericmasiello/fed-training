'use strict';

var merger = (function(){

	var publicAPI = {};
	var isInitialized = false;

	//List of surgeons we want to merge
	publicAPI.records = ko.observableArray();

	//The current surgeon selected as the display name
	publicAPI.displaySurgeon = ko.observable();

	//Public method for adding a new record to the list of surgeons
	publicAPI.add = function( data ){

		//If this is the first record being added, we make him/her the display record
		if( publicAPI.records().length === 0 ){

			publicAPI.setSurgeon( data );
		}

		publicAPI.records.push( data );
	};

	//Public method for setting the dispaly surgeon
	publicAPI.setSurgeon = function( data ){

		publicAPI.displaySurgeon( data );
	};


	var mergeRecordsDoneCallback = function( data ){

		publicAPI.records.removeAll();
		publicAPI.displaySurgeon(null);

		PubSub.publish('spc/merger/merged-record', data );
	};

	publicAPI.mergeRecords = function(){

		var displaySurgeon = this.displaySurgeon();
		var records = this.records();
//		var surgeons = this.surgeons();
		var surgeonsToMerge = [];
//		var newSurgeonList = [];
//		var matchIndex = -1;
		var mergeCount = 0;

		for( var i = 0; i < records.length; i++ ){

			if( records[i].id !== displaySurgeon.id ){

				surgeonsToMerge.push( records[i] );
			}
		}

		mergeCount = surgeonsToMerge.length;

		displaySurgeon.childRecords = surgeonsToMerge;

		//Pretend we make an API call to save this
//		$.ajax({
//			'url': 'mergesurgeons/' + displaySurgeon.id,
//			'type': 'put',
//			'data': JSON.stringify( displaySurgeon ),
//			'done': mergeRecordsDoneCallback
//		});

		//Faux-call response
		mergeRecordsDoneCallback( displaySurgeon );
	};

	publicAPI.cancelMerge = function(){

		this.records.removeAll();
	};

	publicAPI.init = function(){

		if( isInitialized === false ){
			//do stuff
		}

		isInitialized = true;
	};

	return publicAPI;

})();