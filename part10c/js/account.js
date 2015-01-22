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

    var homePhoneComputed = {

      read: function(){

        return ( this.sameAsCell() === true ? this.cell() : this.home() );
      },

      write: function( value ){

        if( this.sameAsCell() === false ) {

          this.home( value );
        }
      }
    };

    /*
     * Account module that is returned publicly
     */
    var Account = {

      init: function(){

        var homeNumber1 = ko.observable();
        var homeNumber2 = ko.observable();
        var homeNumber3 = ko.observable();
        var homeNumberExt = ko.observable();

        this.sameAsCell = ko.observable(false);
        this.cellNumber1 = ko.observable();
        this.cellNumber2 = ko.observable();
        this.cellNumber3 = ko.observable();
        this.cellNumberExt = ko.observable();

        this.homeNumber1 = ko.computed(homePhoneComputed, {
          sameAsCell: this.sameAsCell,
          cell: this.cellNumber1,
          home: homeNumber1
        });

        this.homeNumber2 = ko.computed(homePhoneComputed, {
          sameAsCell: this.sameAsCell,
          cell: this.cellNumber2,
          home: homeNumber2
        });

        this.homeNumber3 = ko.computed(homePhoneComputed, {
          sameAsCell: this.sameAsCell,
          cell: this.cellNumber3,
          home: homeNumber3
        });

        this.homeNumberExt = ko.computed(homePhoneComputed, {
          sameAsCell: this.sameAsCell,
          cell: this.cellNumberExt,
          home: homeNumberExt
        });

        this.newPassword = ko.observable('');
        this.newPassword2 = ko.observable('');

        // Automatically check whenever newPassword or newPassword2 changes
        this.isPasswordMismatch = ko.computed( isPasswordMismatch, this );

        return this;
      }
    };

    return Account;
  }
);
