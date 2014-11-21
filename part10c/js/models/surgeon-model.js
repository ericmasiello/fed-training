define([],
	function() {

		'use strict';

		var API_PATHS = {

			create: 'FIXME-IN-REAL-APP',
			read: 'sampledata.json',
			update: 'FIXME-IN-REAL-APP',
			del: 'FIXME-IN-REAL-APP'
		};

		/*
		 * Handles all API interactions for dealing with Surgeons
		 */
		var SurgeonModel = {

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
					'type': 'get'
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

		return SurgeonModel;
	}
);