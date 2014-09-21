define([],
  function() {

    'use strict';

    /*
     * Private variables
     * & methods
     */

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

        /*
         * Binds the "this" context to the instance
         * for these private methods
         */
        surgeons = surgeons.bind(this);
        loadSurgeonsDoneCallback = loadSurgeonsDoneCallback.bind(this);

        /*
         * Placeholder method, this will be modified
         * once we start to add filter capabilities
         */
        this.records = ko.computed(function(){

          return surgeons();

        }, this);

        return this;
      },

      /*
       * Loads the surgeon data
       */
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
          'type': 'get',
        }).done( loadSurgeonsDoneCallback );
      },

      /*
       * Method for adding current record to
       * the merger module
       */
      add: function( data ){

        PubSub.publish('spc/surgeon/add-record', data );
      }
    };

    return Surgeons;
  }
);