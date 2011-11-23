
$(document).ready(function()
{
	$('#leftpanel').empty().load('tmpl/overview.tmpl');
	$('#rightpanel').empty().load('html/overview.html');


});

function loadTemplate(name)
{
	var cntx = {};
	cntx.country = 'USA';

	switch(name) {
		case 'test':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php', null, function(elm,jObj,ctx){console.log(ctx)},cntx);
			$('#rightpanel').empty();//.load('html/callback.html');
			break;
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
		case 'append':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php');
			$('#rightpanel').empty().load('html/append.html');
			break;
		case 'cntx':
			$('#leftpanel').empty()
				.append('<div>')
				.children(':last')
				.vkTemplate('tmpl/context_1.tmpl','php/basic.php');
				
			$('#leftpanel')
				.append('<div>')
				.children(':last')
				.vkTemplate('tmpl/context_2.tmpl','php/basic.php',null,null,cntx);
		/*
			$('#leftpanel').empty().append($("<div id='div1'></div>"));
			$('#leftpanel').append($("<div id='div2'></div>"));
			
			$('#div1').vkTemplate('tmpl/context_1.tmpl','php/basic.php');
			$('#div2').vkTemplate('tmpl/context_2.tmpl','php/basic.php',null,null,cntx);
		*/	
			$('#rightpanel').empty().load('html/context.html');
			break;
		case 'tipstricks':
			$('#leftpanel').empty();//.vkTemplate('tmpl/basic.tmpl','php/basic.php');
			$('#rightpanel').empty().load('html/tipstricks.html');
			break;
	}
}
