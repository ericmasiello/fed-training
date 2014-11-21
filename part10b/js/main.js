require(['account', 'surgeons'],

  function(Account, Surgeons){

    'use strict';

    /*
     * Private methods
     */

    // Toggles different views in the application
    var toggleTabs = function (tab){

      var $tabs = $('#main-nav').find('a');
      var $selectedTab = $tabs.filter('[data-val="' + tab + '"]');
      var $otherTab = $tabs.not($selectedTab);

      $selectedTab.addClass('is-selected');
      $otherTab.removeClass('is-selected');

      if( tab === 'manager'){

        $('#manager').show();
        $('#account').hide();

      } else {

        $('#manager').hide();
        $('#account').show();
      }
    };

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

          toggleTabs('manager');
          self.surgeons.loadSurgeons();

        });

        this.get('#!/account', function () {

          toggleTabs('account');
          Account.init();

        });
      })).run();
    };

    /*
     * Public object
     */
    var App = {

      init: function(){

        this.surgeons = Object.create(Surgeons).init();
        routePage.call(this);
        return this;
      }
    };

    ko.applyBindings( Object.create(App).init(), document.getElementById('app') );
  }
);
