require(['account', 'surgeons'],

  function(Account, Surgeons){

    'use strict';

    var App = {

      toggleTabs: function (tab){

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
      },

      routePage: function(){

        var self = this;

        (new Sammy(function () {

          // If no matching path is found
          this.notFound = function (){

            // Will reroute to the manager tab
            document.location.href = '#!/manager';
          };

          this.get('#!/manager', function () {

            self.toggleTabs('manager');
            Surgeons.init();

          });

          this.get('#!/account', function () {

            self.toggleTabs('account');
            Account.init();

          });
        })).run();
      },

      init: function(){

        this.routePage();
      }
    };

    $(document).ready(function(){

      App.init();
    });
  }
);
