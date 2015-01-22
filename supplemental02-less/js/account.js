define(['services/account-service'],
  function(AccountService) {

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

    // Verifies the password typed by user matches the password fetched via the Ajax request
    var isOriginalPasswordMismatch = function(){

      var misMatch = false;

      if( this.passwordMatch() !== '' && this.passwordMatch() !== this.password() ){

        misMatch = true;
      }

      return misMatch;
    };

    /*
     * Called after loading the data from the API.
     * It will check the sameAsCell() checkbox if home phone matches
     * the cell phone
     */
    var initializeStateOfSameAsCell = function(){

      if( this.homeNumber1() === this.cellNumber1() &&
        this.homeNumber2() === this.cellNumber2() &&
        this.homeNumber3() === this.cellNumber3() &&
        this.homeNumberExt() === this.cellNumberExt() ){

        this.sameAsCell(true);

      } else {

        this.sameAsCell(false);
      }
    };

    // Done callback from loading account data
    var loadAccountDoneCallback = function(data){

      ko.mapping.fromJS(data, this);
      initializeStateOfSameAsCell.call(this);
    };

    /*
     * Account module that is returned publicly
     */
    var Account = {

      init: function(){

        /*
         * Use ko.mappings to create observables based on the
         * object below. Then Use jQuery.extend() to copy all those
         * observables onto the "this" object
         */
        jQuery.extend(this, ko.mapping.fromJS({
          id: '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          emailAddress: '',
          cellNumber1: '',
          cellNumber2: '',
          cellNumber3: '',
          cellNumberExt: '',
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
        }));

        var homeNumber1 = ko.observable();
        var homeNumber2 = ko.observable();
        var homeNumber3 = ko.observable();
        var homeNumberExt = ko.observable();

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

        // Automatically check whenever newPassword or newPassword2 changes
        this.isPasswordMismatch = ko.computed( isPasswordMismatch, this );

        // Checks if password stored in API matches the one the user entered
        this.isOriginalPasswordMismatch = ko.computed( isOriginalPasswordMismatch, this );

        return this;
      },

      // loads the account data
      loadAccount: function(){

        AccountService.read({
          callback: loadAccountDoneCallback,
          context: this
        });
      }
    };

    return Account;
  }
);
