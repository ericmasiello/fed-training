(function(){
	'use strict';

	var nameGenerator = function( prefix, isEmail ){
		var counter = 1;
		return function(){

			if( isEmail === true ){

				return ((typeof prefix === 'string' ? prefix + ' ' : 'User ') + (counter++)).replace(' ', '_').toLowerCase() + '@advisory.com';

			} else {

				return (typeof prefix === 'string' ? prefix + ' ' : 'User ') + (counter++);
			}
		};
	};

	var instGenerator = function(){
		var insts = ['Portland Medical Center', 'Bayview Hospital', 'Holy Cross Hospital', 'Totally Rad Institution'];

		return function(){

			return insts[Math.floor(Math.random()* (insts.length))];
		};
	};

	var phoneGenerator = function(part){

		var phones = {
			'1': ['245', '372', '272', '271'],
			'2': ['234', '134', '747', '983'],
			'3': ['2245', '3332', '8172', '0271'],
			'ext': ['2245', '', '', '0271']
		};

		return function(){

			return phones[part][Math.floor(Math.random()* (phones[part].length))];
		};
	};

	var jobTitleGenerator = function(){

		var jobs = ['Product Branding Analyst', 'Customer Response Liason', 'International Implementation Manager', 'Regional Web Assistant', 'Senior Response Associate'];

		return function(){

			return jobs[Math.floor(Math.random()* (jobs.length))];
		};

	};

	var surgeonSchema = {
		type : 'object',
		properties : {
			id : {
				type: 'integer'
			},
			name : {
				type : 'string'
			},
			institution : {
				type : 'string'
			},
			caseVolume : {
				type: 'integer',
				minimum: 20,
				maximum: 500
			},
			possibleDuplicate: {
				type: 'boolean'
			},
			hasChildren: {
				type: 'boolean'
			},
			childRecords: {
				type: 'object'
			}
		}
	};

	var surgeonsMergedSchema = {
		type : 'object',
		properties : {
			id : {
				type: 'integer'
			},
			name : {
				type : 'string'
			},
			institution : {
				type : 'string'
			},
			caseVolume : {
				type: 'integer',
				minimum: 20,
				maximum: 500
			}
		}
	};

	var userSchema = {

		type : 'object',
		properties : {
			id : {
				type: 'integer'
			},
			firstName : {
				type : 'string'
			},
			lastName : {
				type : 'string'
			},
			jobTitle : {
				type : 'string'
			},
			emailAddress : {
				type : 'string'
			},
			cellPhone1 : {
				type : 'string'
			},
			cellPhone2 : {
				type : 'string'
			},
			cellPhone3 : {
				type : 'string'
			},
			cellPhoneExt : {
				type : 'string'
			},
			homePhone1 : {
				type : 'string'
			},
			homePhone2 : {
				type : 'string'
			},
			homePhone3 : {
				type : 'string'
			},
			homePhoneExt : {
				type : 'string'
			},
			password : {
				type : 'string'
			},
			securityQuestion1 : {
				type : 'string'
			},
			securityQuestion2 : {
				type : 'string'
			},
			securityQuestion3 : {
				type : 'string'
			},
			securityAnswer1 : {
				type : 'string'
			},
			securityAnswer2 : {
				type : 'string'
			},
			securityAnswer3 : {
				type : 'string'
			}
		}
	};

	apitizer.addSchema('surgeons', surgeonSchema);
	apitizer.addSchema('surgeons-merged', surgeonsMergedSchema);
	apitizer.addSchema('users', userSchema);
	apitizer.fixture.delay(200, 500); // delay will be between 200 and 500 milliseconds

	var surgeonStore = apitizer.schemaStore('surgeons', 50, {
		id : apitizer.types.autoincrement(),
		name: nameGenerator(),
		institution: instGenerator(),
		childRecords: (function(){

			return function(){

				return [];
			};
		})(),
		possibleDuplicate: (function(){

			return function(){

				return ( Math.floor(Math.random() * 100 ) % 7 === 0 );
			};
		})()
	});

	var surgeonMergedStore = apitizer.schemaStore('surgeons-merged', 5, {
		id : apitizer.types.autoincrement(),
		name: nameGenerator(),
		institution: instGenerator()
	});

	var userStore = apitizer.schemaStore('users', 50, {
		id : apitizer.types.autoincrement(),
		firstName: nameGenerator('Firstname'),
		lastName: nameGenerator('Lastname'),
		emailAddress: nameGenerator('Lastname', true),
		cellPhone1: phoneGenerator('1'),
		cellPhone2: phoneGenerator('2'),
		cellPhone3: phoneGenerator('3'),
		cellPhoneExt: phoneGenerator('ext'),
		homePhone1: phoneGenerator('1'),
		homePhone2: phoneGenerator('2'),
		homePhone3: phoneGenerator('3'),
		homePhoneExt: phoneGenerator('ext'),
		jobTitle: jobTitleGenerator(),
		password: '1234',
		securityQuestion1: window.SPC.SecurityQuestions[0],
		securityQuestion2: window.SPC.SecurityQuestions[1],
		securityQuestion3: window.SPC.SecurityQuestions[2],
		securityAnswer1: window.SPC.SecurityAnswers[0],
		securityAnswer2: window.SPC.SecurityAnswers[1],
		securityAnswer3: window.SPC.SecurityAnswers[2]
	});

	apitizer.fixture.resource('/surgeons', surgeonStore);
	apitizer.fixture.resource('/surgeons-merged', surgeonMergedStore);
	apitizer.fixture.resource('/users', userStore);
})();

