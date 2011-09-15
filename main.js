
var hInterval = 0;

$(document).ready(function()
{
	$('#leftpanel').empty().load('tmpl/overview.tmpl');
	$('#rightpanel').empty().load('html/overview.html');


});

function loadTemplate(name)
{
	switch(name) {
	
		case 'overview':
			$('#leftpanel').empty().load('tmpl/overview.tmpl');
			$('#rightpanel').empty().load('html/overview.html');
		break;
		
		case 'doc':
			$('#leftpanel').empty();
			$('#rightpanel').load('html/doc.html');
		break;
	
		case 'basic':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php');
			$('#rightpanel').empty().load('html/basic.html');
		break;
		case 'callback':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php', function(){$('#leftpanel div').css('background-color','yellow')});
			$('#rightpanel').empty().load('html/callback.html');
		break;
		case 'loop':
			$('#leftpanel').vkTemplate('tmpl/loop.tmpl','php/loop.php');
			$('#rightpanel').empty().load('html/loop.html');
		break;
		case 'condition':
			$('#leftpanel').vkTemplate('tmpl/condition.tmpl','php/get_time.php');
			$('#rightpanel').empty().load('html/condition.html');
		break;
		case 'nested':
			$('#leftpanel').vkTemplate('tmpl/nested.tmpl','php/loop.php');
			$('#rightpanel').empty().load('html/nested.html');
		break;
		case 'nested_conditionally':
			$('#leftpanel').vkTemplate('tmpl/nested_conditionally.tmpl','php/get_time.php');
			$('#rightpanel').empty().load('html/nested_conditionally.html');
		break;
		case 'csi':
			$('#leftpanel').load('tmpl/csi.tmpl');
			$('#rightpanel').empty().load('html/csi.html');
		break;
		case 'empty_string':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/empty_string.php');
			$('#rightpanel').empty().load('html/empty_string.html');
		break;
		
		case 'integration':
			$('#leftpanel').empty().load('tmpl/integration.tmpl');
			$('#rightpanel').empty().load('html/integration.html');
		break;
		
		
		
	}
}

function toggleApiDetails(obj) {
	var re = /closed/;
	var state = $(obj).css("background-image");
	if (state.search(re) != -1) {
		$(obj).css("background-image",'url("img/demo-spindown-open.gif")');
		$(obj).children(".apiDetails").css("display","block");
	} else {
		$(obj).css("background-image",'url("img/demo-spindown-closed.gif")');
		$(obj).children(".apiDetails").css("display","none");
	}
}