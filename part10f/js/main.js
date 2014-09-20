'use strict';

var app = (function(account, Surgeons, merger){

	var currentTab = ko.observable('manager');
  var surgeons = Object.create(Surgeons).init();
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
				surgeons.loadSurgeons();

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

		//Delegate events

		PubSub.subscribe('spc/surgeon/add-record', function( e, data ){

			merger.add(data);
		});

		PubSub.subscribe('spc/merger/merged-record', function( e, data ){

			//surgeons.
			surgeons.resetMerge();
			surgeons.loadSurgeons(true);
		});

		PubSub.subscribe('spc/merger/set-display-surgeon', function(e, data){

			surgeons.selectedSurgeon(data);
		});

		PubSub.subscribe('spc/merger/cancel', function(){

			surgeons.resetMerge();
		});

		PubSub.subscribe('spc/merger/remove', function(e, data){

			surgeons.removeFromMergeList(data);
		});

		return this;
	};

	return {
		surgeons: surgeons,
		account: account,
		merger: merger,
		currentTab: currentTab,
		init: init
	};

})(account, Surgeons, merger);

ko.applyBindings( app.init(), document.getElementById('app') );
