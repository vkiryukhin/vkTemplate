/**
* smartupdater - jQuery Plugin
*  
* Version - 0.2.00.alpha
* Copyright (c) 2010 - 2011 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* 
* http://www.eslinstructor.net/vktemplate/
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
* USAGE:
*
*	$('#foo').vkTemplate('myTemplate.tmpl','myData.php', function({...}));
*   $('#foo').vkTemplate('myTemplate.tmpl','myData.php', myCallback);
*		
**/
(function(jQuery) {

	var templates = {};
	
	jQuery.fn.vkTemplate = function (urlTmpl, urlData, callback ) {
	
		function _getData(urlData, elm, callback) {
		
			$.ajax( {
				url		: urlData,
				dataType: "text",
				cache	: false, 
				success	: function(data) {
					$(elm).empty().append(tmpl(templates[urlTmpl],jQuery.parseJSON(data)));	
					if(typeof(callback) === 'function') {
						callback(elm);
					}
				}
			});
		}
	
		return this.each(function () {
			var elm = this;

			if(templates[urlTmpl]) { //template has been cashed;
				_getData(urlData, elm, callback);
				
			} else { //get template with ajax

				$.ajax( { 
					url: urlTmpl,
					dataType: "text",
					success: function(data) { 
						templates[urlTmpl] = data; // save template in cache
						_getData(urlData, elm, callback);
					}
				});
			}
		});
	};
	
//-------------------------------
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed

	var cache = {};
  
	function tmpl(str, data){
		var fn = !/\W/.test(str) ?
		cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
		new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str.replace(/[\r\t\n]/g, " ")
		    .replace(/'(?=[^%]*%>)/g,"\t")
			.split("'").join("\\'")
			.split("\t").join("'")
			.replace(/<%=(.+?)%>/g, "',$1,'")
			.split("<%").join("');")
			.split("%>").join("p.push('")
			+ "');}return p.join('');");
		return data ? fn( data ) : fn;
	};
 //-----------------------------	
	
})(jQuery);
