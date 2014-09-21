require(['account', 'surgeons'],

  function(Account, Surgeons){

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

    /*
     * Public object
     */
    var App = {

      init: function(){

        this.currentTab = ko.observable('manager');
        this.surgeons = Object.create(Surgeons).init();
        this.account = Object.create(Account).init();
        routePage.call(this);
        return this;
      }
    };

    ko.applyBindings( Object.create(App).init(), document.getElementById('app') );
  }
);
