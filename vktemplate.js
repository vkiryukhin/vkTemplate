/**
* vkTemplate - jQuery Plugin
*  
* Version - 0.4.00.alpha
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
* and modified by Vadim Kiryukhin. To fix issue with single quotes, Neil's comment at 
* http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
* is used.
*
*	.vkTemplate(urlTemplate, jsonData, [params], [callback(elm, data)]) 
*
* PARAMETERS:
*
*	@urlTemplate  	- template URL;
* 	@jsonData		- either json string or URL to data 
*	@params			- a map or string that is sent to the server with the jsonData request if jsonData 
*					  is URL. See jQuery Ajax "data" parameter for detailes. (optional)
* 	@function		- callback function (optional)
*
* USAGE:
*	
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php'); 
*	$('#container').vkTemplate('myTemplate.tmpl','{"foo":"bar"}');
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', function(elm, jsonObj){...});
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php', {foo:"bar"});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', {foo:"bar"}, function(elm, jsonObj){...});

*		
*/

(function(jQuery) {

	var vkTemplatesCache = {};
	
	jQuery.fn.vkTemplate = function (urlTmpl, jsonData, params, callback ) {
	
		function _tmpl(str, data){ //modified Micro-Templating engine
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
		};
	
		function _getData(jsonData, elm, params, callback) { // jsonData: either JSON-string or URL
		
			if ( params ) {// If it's a function
				if ( jQuery.isFunction( params ) ) {// We assume that it's the callback
					callback = params;
					params = null;
				} else if ( typeof params === "object" ) {// Otherwise, build a param string
					params = jQuery.param( params );
				}
			}
	
			if( typeof(jsonData) === 'object') {//json object
				$(elm).empty().append(_tmpl(vkTemplatesCache[urlTmpl],jsonData));	
				if(callback) {
					callback(elm, jsonData);
				}
			} else // We assume that it's a string
			
			if($.trim(jsonData).charAt(0) == '{') { //JSON-string
				var jsonObj = jQuery.parseJSON(jsonData);
				$(elm).empty().append(_tmpl(vkTemplatesCache[urlTmpl],jsonObj));	
				if(callback) {
					callback(elm, jsonObj);
				}
						
			} else { // URL-string
		
				$.ajax( {
					url		: jsonData,
					dataType: "text",
					cache	: false, 
					data	: params,
					success	: function(data) {
						var jsonObj = jQuery.parseJSON(data);
						$(elm).empty().append(_tmpl(vkTemplatesCache[urlTmpl],jsonObj));	
						if(callback) {
							callback(elm, jsonObj);
						}
					}
				});
			}
		}
	
		return this.each(function () {
			var elm = this;

			if(vkTemplatesCache[urlTmpl]) { //template has been cashed;
				_getData(jsonData, elm, params, callback);
				
			} else { //get template with ajax

				$.ajax( { 
					url: urlTmpl,
					dataType: "text",
					success: function(data) { 
						vkTemplatesCache[urlTmpl] = data; // save template in cache
						_getData(jsonData, elm, params, callback);
					}
				});
			}
		});
	};

})(jQuery);
