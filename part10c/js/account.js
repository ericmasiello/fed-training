'use strict';

var account = (function (){

	var isInitialized = false;
  /*
   * Defines public API
   */
	var publicAPI = ko.mapping.fromJS({
		id: '',
		firstName: '',
		lastName: '',
		jobTitle: '',
		emailAddress: '',
		cellNumber1: '',
		cellNumber2: '',
		cellNumber3: '',
		cellNumberExt: '',
		homeNumber1: '',
		homeNumber2: '',
		homeNumber3: '',
		homeNumberExt: '',
		password: '',
	  securityQuestion1: '',
		securityQuestion2: '',
		securityQuestion3: '',
		securityAnswer1: '',
		securityAnswer2: '',
		securityAnswer3: '',
    sameAsCell: false,
    passwordMatch: '',
    newPassword: '',
    newPassword2: '',
    securityQuestions: ['Name of your cat', 'Name of your spouse', 'Name of your favorite Disney character']
	});

  /*
   * Private method,
   * Verifies the password typed by user matches the password fetched
   * via the Ajax request
   */
	var isOriginalPasswordMismatch = function(){

		var misMatch = false;

		if( publicAPI.passwordMatch() !== '' && publicAPI.passwordMatch() !== publicAPI.password() ){

			misMatch = true;
		}

		return misMatch;
	};

  /*
   * Private method,
   * verifies if the new-passowrd and new-password-2 field match
   */
	var isPasswordMismatch = function(){

		var misMatch = false;

		if( publicAPI.newPassword() !== '' && publicAPI.newPassword2() !== '' && publicAPI.newPassword() !== publicAPI.newPassword2() ){

			misMatch = true;
		}

		return misMatch;
	};

  /*
   * Private method
   * Copies the cell phone into the home number fields
   */
	var sameAsCellChanged = function(checked){

		if( checked === true ){
			publicAPI.cellNumber1(publicAPI.homeNumber1());
			publicAPI.cellNumber2(publicAPI.homeNumber2());
			publicAPI.cellNumber3(publicAPI.homeNumber3());
			publicAPI.cellNumberExt(publicAPI.homeNumberExt());
		}

		return true; //must return true to allow defualt browser behavior
	};

  /*
   * Private method called after loading the data from the API.
   * It will check the sameAsCell() checkbox if home phone matches
   * the cell phone
   */
	var initializeStateOfSameAsCell = function(){

		if( publicAPI.homeNumber1() === publicAPI.cellNumber1() &&
			publicAPI.homeNumber2() === publicAPI.cellNumber2() &&
			publicAPI.homeNumber3() === publicAPI.cellNumber3() &&
			publicAPI.homeNumberExt() === publicAPI.cellNumberExt() ){

			publicAPI.sameAsCell(true);

		} else {

			publicAPI.sameAsCell(false);
		}
	};

  /*
   * Done callback from loading account data
   */
	var loadAccountDoneCallback = function(data){

		ko.mapping.fromJS(data, publicAPI);
		initializeStateOfSameAsCell();
	};

  /*
   * Loads account data
   */
	var loadAccount = function(){

		$.get('sampleuser.json', loadAccountDoneCallback);
	};

	publicAPI.isOriginalPasswordMismatch = ko.computed( isOriginalPasswordMismatch );
	/*
	 * Automatically check whenever newPassword or newPassword2 changes
	 */
	publicAPI.isPasswordMismatch = ko.computed( isPasswordMismatch );

	/*
	 * Sets up subscription to changes on sameAsCell observbale
	 */
	publicAPI.sameAsCell.subscribe(sameAsCellChanged);

	publicAPI.init = function accountInit(){

		if( isInitialized === false ){

			loadAccount();
		}

		isInitialized = true;
	};

	return publicAPI;

})();
