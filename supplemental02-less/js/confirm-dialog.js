define([],
	function() {

		'use strict';

		/*
		 * Private variables
		 * & methods
		 */


		var ConfirmDialog = {

			init: function( name ){

				this.isVisible = ko.observable(false);
				this.name = ko.observable('');

				return this;
			},

			close: function(){

				this.isVisible(false);
			},

			confirm: function(){

				PubSub.publish('spc/merger-dialog/confirm');
				this.close();
			}
		};

		return ConfirmDialog;
	}
);