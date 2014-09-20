'use strict';

var surgeons = (function(){

	var publicAPI = {};
	var isInitialized = false;
	var surgeons = ko.observableArray();

	/*
	 * Placeholder method, this will be modified
	 * once we start to add filter capabilities
	 */
  var records = ko.computed(function(){

		return surgeons();
	});

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
	var loadSurgeons = function(){

		$.ajax({
			'url': 'sampledata.json',
			'type': 'get'
		}).done( loadSurgeonsDoneCallback );

		//Alternative ...
		//$.get('sampledata.json', loadSurgeonsDoneCallback);
	};

  /*
   * Initialize the surgeons module
   */
  var init = function(){

		if( isInitialized === false ){

			loadSurgeons();
		}

		isInitialized = true;
	};

  return {

    records: records,
    init: init
  };

})();