'use strict';

var account = (function (){

	var publicAPI = {
		homeNumber1: ko.observable(),
		homeNumber2: ko.observable(),
		homeNumber3: ko.observable(),
		homeNumberExt: ko.observable(),
		sameAsCell: ko.observable(false),
		cellNumber1: ko.observable(),
		cellNumber2: ko.observable(),
		cellNumber3: ko.observable(),
		cellNumberExt: ko.observable(),
		newPassword: ko.observable(''),
		newPassword2: ko.observable('')
	};

	//Private method
	var isPasswordMismatch = function(){

		var misMatch = false;

		if( publicAPI.newPassword() !== '' && publicAPI.newPassword2() !== '' && publicAPI.newPassword() !== publicAPI.newPassword2() ){

			misMatch = true;
		}

		return misMatch;
	};

	//Private method
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
	 * Automatically check whenever newPassword or newPassword2 changes
	 */
	publicAPI.isPasswordMismatch = ko.computed( isPasswordMismatch );

	/*
	 * Sets up subscription to changes on sameAsCell observbale
	 */
	publicAPI.sameAsCell.subscribe(sameAsCellChanged);

	return publicAPI;

})();
