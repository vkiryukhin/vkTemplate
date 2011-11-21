
$(document).ready(function()
{
	$('#leftpanel').empty().load('tmpl/overview.tmpl');
	$('#rightpanel').empty().load('html/overview.html');


});


var MODULE = (function () {
	var my = {},
		privateVariable = 1;
	
	function privateMethod() {
		// ...
	}
	
	my.moduleProperty = 1;
	
	my.moduleMethod = function (o) {
console.log(this);
		$('#leftpanel').vkTemplate('tmpl/test1.tmpl',o);
		
	};
	
	return my;
}());

function module(o)
{
	this.xyz = "xxyyzz";
	//this.abc = "aabbcc";
	var obj = {};
	obj.id=112233;
	this.obj = obj;
	
console.log(this);
		$('#leftpanel').vkTemplate('tmpl/test1.tmpl',o);
}

function loadTemplate(name)
{
	this.abc = "aabbcc";
	var obj = {};
	obj.id=777;
	this.obj = obj;
	var cntx = {};
	cntx.xx = 'xxx';
	cntx.yy = 'yyy';
	cntx.abc = '112233';

	switch(name) {
		case 'test':
			//$('#leftpanel').vkTemplate('tmpl/test.tmpl','{"foozzz":"I am json value","bar":"123"}');
			//$('#leftpanel').vkTemplate.call(this,'tmpl/test.tmpl','{"foozz":"I am json value"}');
			
			//$('#leftpanel').vkTemplate('tmpl/test.tmpl','php/basic.php', function(){$('#leftpanel div').css('background-color','yellow')});
			
			//$('#leftpanel').vkTemplate('tmpl/test1.tmpl','php/basic.php',{foo:"bar",aaa:123});
			
			//$('#leftpanel').vkTemplate('tmpl/test1.tmpl',{foo:123},false,false,cntx);
			//$('#leftpanel').vkTemplate('tmpl/test1.tmpl',{foo:123});
			
			$('#leftpanel').vkTemplate('tmpl/test1.tmpl','php/basic.php',null,function(a,b,c){alert(c.yy)},cntx);
			
			//MODULE.moduleMethod({foo:123});
			//module({foo:123});
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
			//$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php',false,false,cntx);
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
		
		
		
	}
}
