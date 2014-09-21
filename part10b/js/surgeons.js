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
      loadSurgeons: function(){

        $.ajax({
          'url': 'sampledata.json',
          'type': 'get',
        }).done( loadSurgeonsDoneCallback );

        //Alternative ...
        //$.get('sampledata.json', loadSurgeonsDoneCallback);
      }
    };

    return Surgeons;
  }
);