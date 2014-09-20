define([], function(){

'use strict';

var merger = (function(){

  //List of surgeons we want to merge
  var records = ko.observableArray();

  //The current surgeon selected as the display name
  var displaySurgeon = ko.observable();

  // method for adding a new record to the list of surgeons
  var add = function( data ){

    //If this is the first record being added, we make him/her the display record
    if( records().length === 0 ){

      setSurgeon( data );
    }

    records.push( data );
  };

  // method for setting the dispaly surgeon
  var setSurgeon = function( data ){

    displaySurgeon( data );
    PubSub.publish('spc/merger/set-display-surgeon', data );
  };

  //Callback from merging records
  var mergeRecordsDoneCallback = function( data ){

		records.removeAll();
		displaySurgeon(null);

		PubSub.publish('spc/merger/merged-record', data );
	};

  //merge records, saves records to faux api
  var mergeRecords = function(){

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

  var cancelMerge = function(){

		records.removeAll();
		PubSub.publish('spc/merger/cancel');
	};

	var remove = function( data ){

		records.remove(function(item) {

			return item.id === data.id;
		});

		PubSub.publish('spc/merger/remove', data);
	};

  return {
    records: records,
    displaySurgeon: displaySurgeon,
    add: add,
    setSurgeon: setSurgeon,
    mergeRecords: mergeRecords,
    cancelMerge: cancelMerge,
    remove: remove
  };

})();


  return merger;

});