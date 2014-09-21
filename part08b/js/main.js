'use strict';

function toggleTabs(){

  var $selectedTab = $(this);
  var value = $selectedTab.data('val');
  var $otherTab = $('#main-nav').find('a').not($selectedTab);

  $selectedTab.addClass('is-selected');
  $otherTab.removeClass('is-selected');


  if( value === 'manager'){

    $('#manager').show();
    $('#account').hide();

  } else {

    $('#manager').hide();
    $('#account').show();
  }
}

function initPage(){

  $('#main-nav').on('click', 'a', toggleTabs );
}

$(document).ready(initPage);
