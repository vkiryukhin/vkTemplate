/**
* vkTemplate - jQuery Plugin
*  
* Version - 0.3.00.alpha
* Copyright (c) 2010 - 2011 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vktemplate/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
* _tmpl function is "Micro-Templating" engine, 
* originally written by John Resig ( http://ejohn.org/ - MIT Licensed )
* and modified by Vadim Kiryukhin based on Neil's comment at 
* http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
* 
* PARAMETERS:
*
*	@urlTemplate  	- template URL;
* 	@urlData		- data URL 
* 	@function		- callback function (optional)
*
* USAGE:
*
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', function({...}));
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php', myCallback);
*		
*/

(function(jQuery) {

	var vkTemplatesCache = {};
	
	jQuery.fn.vkTemplate = function (urlTmpl, urlData, callback ) {
	
		function _tmpl(str, data){ //modified Micro-Templating engine
			try {
				var fn = new Function("obj",
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
				return fn( data );
			} catch (e) {
				return "< # ERROR: " + e.message + " # >";
			}
		};
	
		function _getData(urlData, elm, callback) { // get data with ajax
		
			$.ajax( {
				url		: urlData,
				dataType: "text",
				cache	: false, 
				success	: function(data) {
					$(elm).empty().append(_tmpl(vkTemplatesCache[urlTmpl],jQuery.parseJSON(data)));	
					if(typeof(callback) === 'function') {
						callback(elm);
					}
				}
			});
		}
	
		return this.each(function () {
			var elm = this;

			if(vkTemplatesCache[urlTmpl]) { //template has been cashed;
				_getData(urlData, elm, callback);
				
			} else { //get template with ajax

				$.ajax( { 
					url: urlTmpl,
					dataType: "text",
					success: function(data) { 
						vkTemplatesCache[urlTmpl] = data; // save template in cache
						_getData(urlData, elm, callback);
					}
				});
			}
		});
	};

})(jQuery);
