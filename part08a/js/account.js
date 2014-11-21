'use strict';

function isPasswordMatch(){

	var $password = $('#new-password');
	var $password2 = $('#new-password-2');
	var setError = false;

	if( $password.val() !== '' && $password2.val() !== '' && $password.val() !== $password2.val() ){

		setError = true;
	}

	$password2.toggleClass('is-error', setError)
		.siblings('label').toggleClass('is-error', setError)
		.end()
		.siblings('div, i').toggle(setError);
}

function toggleSameAsCell(){

  var checked = $(this).is(':checked');
  if( checked === true ){

		$('#home-number-1').val( $('#cell-number-1').val() ).prop('disabled', checked);
		$('#home-number-2').val( $('#cell-number-2').val() ).prop('disabled', checked);
		$('#home-number-3').val( $('#cell-number-3').val() ).prop('disabled', checked);
		$('#home-number-ext').val( $('#cell-number-ext').val() ).prop('disabled', checked);

  } else {

		$('#home-number-1').prop('disabled', checked);
		$('#home-number-2').prop('disabled', checked);
		$('#home-number-3').prop('disabled', checked);
		$('#home-number-ext').prop('disabled', checked);
	}
}

function initAccount(){

	$('#same-as-cell').on('click', toggleSameAsCell);
	$('#new-password-2, #new-password').on('change', isPasswordMatch);
}

$(document).ready(initAccount);
