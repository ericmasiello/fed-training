define(['controllers/surgeon-controller'],
  function(SurgeonController) {

    'use strict';

    /*
     * Private variables
     * & methods
     */

    // keeps track of which records are being merged
    var beingMerged = ko.observableArray();

    // Holds surgeon records
    var surgeons = ko.observableArray();

    // Private callback method
    var loadSurgeonsDoneCallback = function(resp){

      if( jQuery.isPlainObject( resp ) === true &&
        jQuery.isArray( resp.data ) === true ) {

        surgeons(resp.data);
      }
    };

    /*
     * Surgeon module that is returned publicly
     */
    var Surgeons = {

      init: function(){

        // Tracks the selected surgeon in merger module
        this.selectedSurgeon = ko.observable({});

        /*
         * Placeholder method, this will be modified
         * once we start to add filter capabilities
         */
        this.records = ko.computed(function(){

          return surgeons();
        }, this);

        this.isMerging = ko.computed(function(){

          return ( beingMerged().length > 0 );
        }, this);

        return this;
      },

      /*
       * Loads the surgeon data
       */
      loadSurgeons: function( fetchDifferentData ){

        SurgeonController.read({
          callback: loadSurgeonsDoneCallback,
          context: this,
          fetchDifferentData: fetchDifferentData
        });
      },

      /*
       * Method for adding current record to
       * the merger module
       */
      add: function( data ){

        beingMerged.push(data);
        PubSub.publish('spc/surgeon/add-record', data );
      },

      /*
       * Determines if the the <tbody> should have
       * the accordion style based on the
       * childRecord array length
       */
      parentRowStyle: function( data ){

        if( data.childRecords.length > 0 ){

          return 'tbl--accordion__is-collapsed';

        } else {

          return '';
        }
      },

      /*
       * Method for toggling accordion rows
       * between their open and closed states
       */
      toggle: function( data ){

        //check to see if we can expand it

        if( data.childRecords.length > 0 ){

          var $container = $(arguments[1].toElement).parents('tbody');
          $container.toggleClass('tbl--accordion__is-expanded').toggleClass('tbl--accordion__is-collapsed');
        }
      },

      //Tracks if the current record is being merged
      recordIsBeingMerged: function( selectedData ){

				var result = beingMerged().filter(function(currentData){

					if( currentData.id === selectedData.id ){

						return currentData;
					}
				});

				return( result.length > 0 );
			},

      // Resets the merge state in response to merger module
      resetMerge: function(){

        beingMerged.removeAll();
        this.selectedSurgeon({});
      }
    };

    return Surgeons;
  }
);