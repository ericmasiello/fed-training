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

      this.isLoaded(true);

      if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

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

        // Tracks if data has been loaded from ajax call
        this.isLoaded = ko.observable(false);

        // Bound to search text box
        this.searchTerm = ko.observable('');
        // Bound to selected radio filter option
        this.filter = ko.observable('all');

        /*
         * Computed that publicly exposes the the correct records
         * from the private surgeons observable based on the currently
         * selected filter
         */
        this.records = ko.computed(function(){

          switch( this.filter() ){

            case 'all':

              return this.allSurgeons();

            case 'possible':

              return this.possibleDuplicateSurgeons();

            case 'merged':

              return this.mergedSurgeons();
          }
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

        // Tells UI ajax is in flight
        this.isLoaded(false);

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
      },

      // Removes the surgeon from the beingMerged list
      removeFromMergeList: function( data ){

        beingMerged.remove(function(item) {

          return item.id === data.id;
        });
      },

      allSurgeons: function() {

        var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

        return ko.utils.arrayFilter( surgeons(), function(data) {
          return ( data.name.toLowerCase().indexOf( searchTerm ) > -1 );
        });
      },

      possibleDuplicateSurgeons: function() {

        var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

        return ko.utils.arrayFilter( surgeons(), function(data) {
          return ( data.possibleDuplicate === true && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
        });
      },

      mergedSurgeons: function() {

        var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

        return ko.utils.arrayFilter( surgeons(), function(data) {
          return ( data.childRecords.length > 0 && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
        });
      }
    };

    return Surgeons;
  }
);