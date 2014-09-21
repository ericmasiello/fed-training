require(['account', 'surgeons', 'merger'],

  function(Account, Surgeons, Merger){

    'use strict';

    /*
     * Private methods
     */

    // Handles routing
    var routePage = function(){

      var self = this;

      (new Sammy(function () {

        // If no matching path is found
        this.notFound = function (){

          // Will reroute to the manager tab
          document.location.href = '#!/manager';
        };

        this.get('#!/manager', function () {

          self.currentTab('manager');
          self.surgeons.loadSurgeons();

        });

        this.get('#!/account', function () {

          self.currentTab('account');
          self.account.loadAccount();

        });
      })).run();
    };

    var bindEvents = function(){

      //Delegate events
      PubSub.subscribe('spc/surgeon/add-record', function( e, data ){

        this.merger.add(data);
      }.bind(this));

      PubSub.subscribe('spc/merger/merged-record', function( e, data ){

        //surgeons.
        this.surgeons.resetMerge();
        this.surgeons.loadSurgeons(true);
      }.bind(this));

      PubSub.subscribe('spc/merger/set-display-surgeon', function(e, data){

        this.surgeons.selectedSurgeon(data);
      }.bind(this));

      PubSub.subscribe('spc/merger/cancel', function(){

        this.surgeons.resetMerge();
      }.bind(this));

    };

    /*
     * Public object
     */
    var App = {

      init: function(){

        this.currentTab = ko.observable('manager');
        this.surgeons = Object.create(Surgeons).init();
        this.account = Object.create(Account).init();
        this.merger = Object.create(Merger).init();

        bindEvents.call(this);
        routePage.call(this);
        return this;
      }
    };

    ko.applyBindings( Object.create(App).init(), document.getElementById('app') );
  }
);
