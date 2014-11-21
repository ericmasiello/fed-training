define([],
	function() {

		'use strict';

		var API_PATHS = {

			create: 'FIXME-IN-REAL-APP',
			read: 'sampleuser.json',
			update: 'FIXME-IN-REAL-APP',
			del: 'FIXME-IN-REAL-APP'
		};

		/*
		 * Handles all API interactions for dealing with Surgeons
		 */
		var AccountModel = {

			create: function(){

				//FIXME in a real app
			},

			read: function( options ){

				if( jQuery.isPlainObject( options ) === false ||
					jQuery.isFunction( options.callback ) === false ){

					return;
				}

				$.ajax({
					'url': API_PATHS.read,
					'type': 'get',
					'context': ( options.context ) ? options.context : undefined,
				}).done( options.callback );
			},

			update: function(){

				//FIXME in a real app
			},

			//'delete' is a reserved word
			del: function(){

				//FIXME in a real app
			}
		};

		return AccountModel;
	}
);