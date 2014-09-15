'use strict';

function toggleTabs(tab){

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
}

function routePage(){

	(new Sammy(function () {

		// If no matching path is found
		this.notFound = function (){

			// Will reroute to the manager tab
			document.location.href = '#!/manager';
		};

		this.get('#!/manager', function () {

			toggleTabs('manager');

		});

		this.get('#!/account', function () {

			toggleTabs('account');
		});
	})).run();
}

function initPage(){

	routePage();
}

$(document).ready(initPage);
