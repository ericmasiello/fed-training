define([],
  function() {

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

        //Pretend we make an API call to save this
        //		$.ajax({
        //			'url': 'mergesurgeons/' + displaySurgeon.id,
        //			'type': 'put',
        //			'data': JSON.stringify( displaySurgeon ),
        //			'done': mergeRecordsDoneCallback
        //		});

        //Faux call response
        mergeRecordsDoneCallback( displaySurgeon );
      },

      // Clears the selection
      cancelMerge: function(){

        this.records.removeAll();
        PubSub.publish('spc/merger/cancel');
      }
    };

    return Merger;
  }
);