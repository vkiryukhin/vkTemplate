
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
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php', function(elm,jsonObj){$(elm).children().css('background-color','yellow')});
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
		case 'error_handling':
			$('#leftpanel').vkTemplate('tmpl/error_handling.tmpl','php/error_handling.php');
			$('#rightpanel').empty().load('html/error_handling.html');
		break;
		
		case 'integration':
			$('#leftpanel').empty().load('tmpl/integration.tmpl');
			$('#rightpanel').empty().load('html/integration.html');
		break;
		
		case 'test':
			//$('#leftpanel').vkTemplate('tmpl/test.tmpl','{"foozzz":"I am json value","bar":"123"}');
			//$('#leftpanel').vkTemplate.call(this,'tmpl/test.tmpl','{"foozz":"I am json value"}');
			
			//$('#leftpanel').vkTemplate('tmpl/test.tmpl','php/basic.php', function(){$('#leftpanel div').css('background-color','yellow')});
			
			//$('#leftpanel').vkTemplate('tmpl/test.tmpl','php/basic.php',{foo:"bar",aaa:123});
			$('#leftpanel').vkTemplate('tmpl/test.tmpl',{foo:123});
			
			$('#rightpanel').empty().load('html/callback.html');
		break;
		
	}
}
