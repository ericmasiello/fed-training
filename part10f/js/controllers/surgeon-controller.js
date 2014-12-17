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
		var SurgeonController = {

			create: function(){

				//FIXME in a real app
			},

			read: function( options ){

				if( jQuery.isPlainObject( options ) === false ||
					jQuery.isFunction( options.callback ) === false ){

					return;
				}

				/*
				 * Kludge we use for demo purposes so that we can fetch
				 * data from a different URL. We do this since we don't have
				 * an actual backend API that supports updating the data
				 * and retrieving the updated records back
				 */
				$.ajax({
					'url': ( options.fetchDifferentData === true ) ? 'sampledata2.json' : API_PATHS.read,
					'type': 'get',
					'context': ( options.context ) ? options.context : undefined,
				}).done( options.callback );
			},

			update: function( options ){

				if( jQuery.isPlainObject( options ) === false ||
					jQuery.isFunction( options.callback ) === false ){

					return;
				}

				//Faking it...
				options.callback();
			},

			//'delete' is a reserved word
			del: function(){

				//FIXME in a real app
			}
		};

		return SurgeonController;
	}
);