
var hInterval = 0;

$(document).ready(function()
{


/*
	$('li[data-content]').bind('click', function(event) {
		var url = $(this).attr('data-content');
		clearInterval(hInterval);
		$('#content').empty();
		
		$.ajax( {
			url: url,
			dataType: "html",
			cache	: false, 
			success: function(data) {
				$('#content').html(data);
			}
		});	
		
	});
	
	$('#content').empty().load("content/overview.html");
	
*/	
});

function loadTemplate(name)
{
	switch(name) {
		case 'basic':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php');
			$('#rightpanel').load('html/basic.html');
		break;
		case 'callback':
			$('#leftpanel').vkTemplate('tmpl/basic.tmpl','php/basic.php', function(){$('#leftpanel div').css('background-color','yellow')});
			$('#rightpanel').load('html/callback.html');
		break;
		case 'loop_and_condition':
			$('#leftpanel').vkTemplate('tmpl/loop_and_condition.tmpl','php/loop_and_condition.php');
			$('#rightpanel').load('html/loop_and_condition.html');
		break;
		case 'nested':
			$('#leftpanel').vkTemplate('tmpl/nested.tmpl','php/loop_and_condition.php');
			$('#rightpanel').load('html/nested.html');
		break;
		case 'nested_conditionally':
			$('#leftpanel').vkTemplate('tmpl/nested_conditionally.tmpl','php/loop_and_condition.php');
			$('#rightpanel').load('html/nested_conditionally.html');
		break;
		case 'csi':
			$('#leftpanel').vkTemplate('tmpl/csi.tmpl','php/basic.php');
			$('#rightpanel').load('html/csi.html');
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