'use strict';

/*
 * Verify that account and surgeon are loaded
 * If not, set them to empty objects
 */
var account = (account) ? account : {};
var surgeons = (surgeons) ? surgeons : {};

var app = (function(account, surgeons){

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

	var routePage = function(){

		(new Sammy(function () {

			// If no matching path is found
			this.notFound = function (){

				// Will reroute to the manager tab
				document.location.href = '#!/manager';
			};

			this.get('#!/manager', function () {

				toggleTabs('manager');
				surgeons.init();

			});

			this.get('#!/account', function () {

				toggleTabs('account');
				account.init();

			});
		})).run();
	};

	var init = function(){

		routePage();
		return this;
	};

	return {

		init: init,
		surgeons: surgeons,
		account: account
	};

})(account, surgeons);

ko.applyBindings( app.init(), document.getElementById('app') );
