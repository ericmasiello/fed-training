'use strict';

function isRegistrationComplete(){

}

function isPasswordMatch(){

}

function toggleSameAsCell(){

  var checked = $(this).is(':checked');
  if( checked === true ){

  }
}

function initAccount(){

  $('#same-as-cell').on('click', toggleSameAsCell);
}

$(document).ready(initAccount);
