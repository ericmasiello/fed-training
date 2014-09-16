'use strict';

var merger = (function(){

	var publicAPI = {};
	var isInitialized = false;
	publicAPI.records = ko.observableArray();
	publicAPI.displaySurgeon = ko.observable();

	publicAPI.setSurgeon = function( data ){

		publicAPI.displaySurgeon( data );
	};

	publicAPI.mergeRecords = function(){

//		var displaySurgeon = this.displaySurgeon();
//		var records = this.records();
//		var surgeons = this.surgeons();
//		var surgeonsToMerge = [];
//		var newSurgeonList = [];
//		var matchIndex = -1;
//		var mergeCount = 0;
//
//		for( var i = 0; i < records.length; i++ ){
//
//			if( records[i].id !== displaySurgeon.id ){
//
//				surgeonsToMerge.push( records[i] );
//			}
//		}
//
//		mergeCount = surgeonsToMerge.length;
//
//		for( i = 0; i < surgeons.length; i++ ){
//
//			matchIndex = -1;
//
//			for( var j = 0; j < surgeonsToMerge.length; j++ ){
//
//				if( surgeons[i].id === surgeonsToMerge[j].id ){
//
//					matchIndex = j;
//				}
//			}
//
//			if( surgeons[i].id === displaySurgeon.id ){
//
//				surgeons[i].childRecords.push.apply( surgeons[i].childRecords, surgeonsToMerge );
//			}
//
//			if( matchIndex === -1 ){
//
//				newSurgeonList.push( surgeons[i] );
//
//			} else {
//
//				surgeonsToMerge.splice( matchIndex, 1 );
//			}
//		}
//
//		this.records.removeAll();
//		this.surgeons.removeAll();
//		this.surgeons( newSurgeonList );

		//PubSub.publish( 'SPC.Feedback', 'Merged ' + ( mergeCount + 1 )  + ' surgeons.' );
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