'use strict';

var Surgeons = {

  init: function(){

    this.surgeons = ko.observableArray();
    this.beingMerged = ko.observableArray();
    this.searchTerm = ko.observable('');
    this.filter = ko.observable('all');


      //Tracks the selected surgeon in merger module
    this.selectedSurgeon = ko.observable({});

    /*
     * Placeholder method, this will be modified
     * once we start to add filter capabilities
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
    }, this );

    this.isMerging = ko.computed(function(){

      return ( this.beingMerged().length > 0 );

    }, this);

    this.add = this.add.bind(this);

    return this;
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

    var result = this.beingMerged().filter(function(currentData){

      if( currentData.id === selectedData.id ){

        return currentData;
      }
    });

    return( result.length > 0 );
  },

  /*
   * Method for adding current record to
   * the merger module
   */
  add: function( data ){

    this.beingMerged.push(data);
    PubSub.publish('spc/surgeon/add-record', data );
  },

  // Resets the merge state in response to merger module
  resetMerge: function() {

    this.beingMerged.removeAll();
    this.selectedSurgeon({});
  },

  /*
   * Callback method after successfully loading
   * the surgeons data
   */
  loadSurgeonsDoneCallback: function(resp){

    if( jQuery.isPlainObject( resp ) === true && jQuery.isArray( resp.data ) === true ) {

      this.surgeons(resp.data);
    }
  },

  /*
   * Makes ajax request to load surgeons
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
      'context': this
    }).done( this.loadSurgeonsDoneCallback );
  },

  removeFromMergeList: function( data ){

    this.beingMerged.remove(function(item) {

      return item.id === data.id;
    });
  },

  allSurgeons: function() {

    var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

    return ko.utils.arrayFilter( this.surgeons(), function(data) {
      return ( data.name.toLowerCase().indexOf( searchTerm ) > -1 );
    });
  },

  possibleDuplicateSurgeons: function() {

    var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

    return ko.utils.arrayFilter( this.surgeons(), function(data) {
      return ( data.possibleDuplicate === true && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
    });
  },

  mergedSurgeons: function() {

    var searchTerm = typeof this.searchTerm() === 'string' ? this.searchTerm().toLowerCase() : '';

    return ko.utils.arrayFilter( this.surgeons(), function(data) {
      return ( data.childRecords.length > 0 && data.name.toLowerCase().indexOf( searchTerm ) > -1 );
    });
  }

};