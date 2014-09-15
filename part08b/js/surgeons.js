'use strict';

function loadSurgeonsDoneCallback(resp){

	/*
	 <tbody>
	 <tr>
	 <td><span class="h4">User 3</span></td>
	 <td class="right">74</td>
	 <td class="right">
	 <a href="#">Manage Duplicates <i class="i-move-right"></i></a>
	 </td>
	 </tr>
	 </tbody>
	 */

	var $surgeonTable = $('#surgeons');
	var $noResults = $('#no-results');
	var html = '';

	//Remove all tbodys from table, preserving the thead and tfoot
	$surgeonTable.find('tbody').remove();

	if( jQuery.isPlainObject( resp ) === true &&
		jQuery.isArray( resp.data ) === true &&
		resp.data.length > 0 ) {

		//Draw results by looping through data
		for( var i = 0; i < resp.data.length; i++ ){

			//Example: Can use $('#surgeons').find('tbody:first').find('tr').data('obj') to grab entire data object
			html += '<tbody><tr data-obj=\'' + JSON.stringify(resp.data[i]) + '\'><td><span class="h4">' + resp.data[i].name + '</span></td>';
			html += '<td class="right">' + resp.data[i].caseVolume + '</td>';
			html += '<td class="right"><a href="#">Manage Duplicates <i class="i-move-right"></i></a></td></tr></tbody>';
		}

		$surgeonTable.append(html);
		$noResults.hide();

	} else {

		$noResults.show();
	}
}

function loadSurgeons(){

	$.ajax({
		'url': 'sampledata.json',
		'type': 'get'
	}).done( loadSurgeonsDoneCallback );

	//Alternative ...
	//$.get('sampledata.json', loadSurgeonsDoneCallback);
}

function initSurgeons(){

	loadSurgeons();
}

$(document).ready(initSurgeons);