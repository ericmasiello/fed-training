'use strict';

/*
 * Verify that account and surgeon are loaded
 * If not, set them to empty objects
 */
var account = (account) ? account : {};
var surgeons = (surgeons) ? surgeons : {};

var app = (function(account, surgeons){

	var publicAPI = {
		surgeons: surgeons,
		account: account,
		currentTab: ko.observable('manager')
	};

	var routePage = function(){

		(new Sammy(function () {

			// If no matching path is found
			this.notFound = function (){

				// Will reroute to the manager tab
				document.location.href = '#!/manager';
			};

			this.get('#!/manager', function () {

				publicAPI.currentTab('manager');
				surgeons.init();

			});

			this.get('#!/account', function () {

				publicAPI.currentTab('account');
				account.init();

			});
		})).run();
	};

	publicAPI.init = function(){

		routePage();
		return this;
	};

	return publicAPI;

})(account, surgeons);

ko.applyBindings( app.init(), document.getElementById('app') );
