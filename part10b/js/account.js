'use strict';

var account = (function (){

	var Account = {

		init: function(){

			this.publicAPI = {
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

			/*
			 * Automatically check whenever newPassword or newPassword2 changes
			 */
			this.publicAPI.isPasswordMismatch = ko.computed(function(){

				var misMatch = false;

				if( this.publicAPI.newPassword() !== '' && this.publicAPI.newPassword2() !== '' && this.publicAPI.newPassword() !== this.publicAPI.newPassword2() ){

					misMatch = true;
				}

				return misMatch;

			}, this );

			/*
			 * Sets up subscription to changes on sameAsCell observbale
			 */
			this.publicAPI.sameAsCell.subscribe(function(checked){

				if( checked === true ){
					this.publicAPI.cellNumber1(this.publicAPI.homeNumber1());
					this.publicAPI.cellNumber2(this.publicAPI.homeNumber2());
					this.publicAPI.cellNumber3(this.publicAPI.homeNumber3());
					this.publicAPI.cellNumberExt(this.publicAPI.homeNumberExt());
				}

				return true; //must return true to allow defualt browser behavior
			}, this );

			return this.publicAPI;
		}
	};

	return (Object.create(Account).init());
})();
