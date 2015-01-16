define(['services/surgeon-service', 'confirm-dialog'],
  function(SurgeonService, ConfirmDialog) {

    'use strict';

    /*
     * Private variables
     * & methods
     */

    //Callback from merging records
    var mergeRecordsDoneCallback = function( data ){

      this.records.removeAll();
      this.displaySurgeon(null);

      PubSub.publish('spc/merger/merged-record', data );
    };

    var Merger = {

      init: function(){

        //List of surgeons we want to merge
        this.records = ko.observableArray();

        //The current surgeon selected as the display name
        this.displaySurgeon = ko.observable();

        //Set "this" context
        mergeRecordsDoneCallback = mergeRecordsDoneCallback.bind(this);
        this.setSurgeon = this.setSurgeon.bind(this);
        this.remove = this.remove.bind(this);

				this.confirmDialog = Object.create(ConfirmDialog).init();

				PubSub.subscribe('spc/merger-dialog/confirm', this.mergeRecords.bind(this));

        return this;
      },

      // Method for setting the display surgeon
      setSurgeon: function( data ){

        this.displaySurgeon( data );
        PubSub.publish('spc/merger/set-display-surgeon', data );
      },

      // Method for adding a new record to the list of surgeons
      add: function( data ){

        //If this is the first record being added, we make him/her the display record
        if( this.records().length === 0 ){

          this.setSurgeon( data );
        }

        this.records.push( data );
      },

			mergeVerify: function(){

				var displaySurgeon = this.displaySurgeon();

				this.confirmDialog.name( this.displaySurgeon().name );
				this.confirmDialog.isVisible(true);
			},

      // merges records, saves records via faux API
      mergeRecords: function(){

        var displaySurgeon = this.displaySurgeon();
        var records = this.records();

        /*
         * Loops through the records array returning all records
         * that are not the displaySurgeon's id.
         *
         * Uses the ES5 array filter() method. Could easily
         * be rewritten for ES3 browsers using a for loop
         */

        displaySurgeon.childRecords = records.filter(function( item ){

          if( item.id !== displaySurgeon.id ){

            return item;
          }
        });

        SurgeonService.update({
          //Fake callback
          callback: function(){
            mergeRecordsDoneCallback( displaySurgeon );
          },
          context: this
        });
      },

      // Clears the selection
      cancelMerge: function(){

        this.records.removeAll();
        PubSub.publish('spc/merger/cancel');
      },

      // removes the surgeon from the list
      remove: function( data ){

        this.records.remove(function(item) {

          return item.id === data.id;
        });

        PubSub.publish('spc/merger/remove', data);
      }
    };

    return Merger;
  }
);