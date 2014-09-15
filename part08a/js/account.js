'use strict';

function isPasswordMatch(){

}

function toggleSameAsCell(){

  var checked = $(this).is(':checked');
  if( checked === true ){

		$('#home-number-1').val( $('#cell-number-1').val()).prop('enable', false);
		$('#home-number-2').val( $('#cell-number-2').val() ).prop('enable', false);
		$('#home-number-3').val( $('#cell-number-3').val() ).prop('enable', false);
		$('#home-number-ext').val( $('#cell-number-ext').val() ).prop('enable', false);

  } else {

		$('#home-number-1').prop('enable', true);
		$('#home-number-2').prop('enable', true);
		$('#home-number-3').prop('enable', true);
		$('#home-number-ext').prop('enable', true);
	}
}

function initAccount(){

  $('#same-as-cell').on('click', toggleSameAsCell);
}

$(document).ready(initAccount);
