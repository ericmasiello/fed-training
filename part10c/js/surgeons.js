define(['services/surgeon-service'],
  function(SurgeonService) {

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

        SurgeonService.read({
          callback: loadSurgeonsDoneCallback
        });
      }
    };

    return Surgeons;
  }
);