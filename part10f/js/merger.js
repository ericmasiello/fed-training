'use strict';

var merger = (function(){

	var publicAPI = {};
	var isInitialized = false;
	var mergeRecordsDoneCallback = function( data ){

		publicAPI.records.removeAll();
		publicAPI.displaySurgeon(null);

		PubSub.publish('spc/merger/merged-record', data );
	};

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
		PubSub.publish('spc/merger/set-display-surgeon', data );
	};

	publicAPI.mergeRecords = function(){

		var displaySurgeon = this.displaySurgeon();
		var records = this.records();
		var surgeonsToMerge = records.filter(function( item ){

			if( item.id !== displaySurgeon.id ){

				return item;
			}
		});

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

		publicAPI.records.removeAll();
		PubSub.publish('spc/merger/cancel');
	};

	publicAPI.remove = function( data ){

		publicAPI.records.remove(function(item) {

			return item.id === data.id;
		});

		PubSub.publish('spc/merger/remove', data);
	};

	return publicAPI;

})();