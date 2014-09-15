'use strict';

var account = (function (){

	var Account = {

		init: function(){

			this.homeNumber1 = ko.observable();
			this.homeNumber2 = ko.observable();
			this.homeNumber3 = ko.observable();
			this.homeNumberExt = ko.observable();
			this.sameAsCell = ko.observable(false);
			this.cellNumber1 = ko.observable();
			this.cellNumber2 = ko.observable();
			this.cellNumber3 = ko.observable();
			this.cellNumberExt = ko.observable();
			this.newPassword = ko.observable('');
			this.newPassword2 = ko.observable('');

			this.isPasswordMismatch = ko.computed(function(){

				var misMatch = false;

				if( this.newPassword() !== '' && this.newPassword2() !== '' && this.newPassword() !== this.newPassword2() ){

					misMatch = true;
				}

				return misMatch;

			}, this );

			/*
			 * Sets up subscription to changes on sameAsCell observbale
			 */
			this.sameAsCell.subscribe(function(checked){

				if( checked === true ){
					this.cellNumber1(this.homeNumber1());
					this.cellNumber2(this.homeNumber2());
					this.cellNumber3(this.homeNumber3());
					this.cellNumberExt(this.homeNumberExt());
				}

				return true; //must return true to allow defualt browser behavior
			}, this );

			return this;
		}
	};

	return {

		init: function(){

			var account = Object.create(Account).init();

			var publicAPI = {
				homeNumber1: account.homeNumber1,
				homeNumber2: account.homeNumber2,
				homeNumber3: account.homeNumber3,
				homeNumberExt: account.homeNumberExt,
				cellNumber1: account.cellNumber1,
				cellNumber2: account.cellNumber2,
				cellNumber3: account.cellNumber3,
				cellNumberExt: account.cellNumberExt,
				isPasswordMismatch: account.isPasswordMismatch
			};
		}
	};

})();
