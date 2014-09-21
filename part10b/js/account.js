define([],
  function() {

    'use strict';

    /*
     * Private variables
     * & methods
     */

    // Verifies if the new-password and new-password-2 field match
    var isPasswordMismatch = function(){

      var misMatch = false;

      if( this.newPassword() !== '' && this.newPassword2() !== '' && this.newPassword() !== this.newPassword2() ){

        misMatch = true;
      }

      return misMatch;
    };

    // Copies the cell phone into the home number fields
    var sameAsCellChanged = function(checked){

      if( checked === true ){
        this.cellNumber1(this.homeNumber1());
        this.cellNumber2(this.homeNumber2());
        this.cellNumber3(this.homeNumber3());
        this.cellNumberExt(this.homeNumberExt());
      }

      return true; //must return true to allow defualt browser behavior
    };

    /*
     * Account module that is returned publicly
     */
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

        // Automatically check whenever newPassword or newPassword2 changes
        this.isPasswordMismatch = ko.computed( isPasswordMismatch, this );

        // Sets up subscription to changes on sameAsCell observbale
        this.sameAsCell.subscribe( sameAsCellChanged.bind( this ) );

        return this;
      }
    };

    return Account;
  }
);
