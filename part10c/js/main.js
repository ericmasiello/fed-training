'use strict';

/*
 * Verify that account and surgeon are loaded
 * If not, set them to empty objects
 */
var account = (account) ? account : {};
var surgeons = (surgeons) ? surgeons : {};

var app = (function(account, surgeons){

  var currentTab = ko.observable('manager');

  /*
   * Handles routing
   */
	var routePage = function(){

		(new Sammy(function () {

			// If no matching path is found
			this.notFound = function (){

				// Will reroute to the manager tab
				document.location.href = '#!/manager';
			};

			this.get('#!/manager', function () {

        currentTab('manager');
				surgeons.init();

			});

			this.get('#!/account', function () {

        currentTab('account');
				account.init();

			});
		})).run();
	};

  /*
   * Initialize the application
   */
  var init = function(){

		routePage();
		return this;
	};

  return {
    surgeons: surgeons,
    account: account,
    currentTab: currentTab,
    init: init
  };

})(account, surgeons);

ko.applyBindings( app.init(), document.getElementById('app') );
