/**
* vkTemplate - jQuery Plugin
*  
* Version - 0.91.01.beta ( ECMAScript 5 strict mode compatible, no with() statement.)
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
* and modified by Vadim Kiryukhin. Issue with single quotes is fixed based on Neil's comment at 
* http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
*
*	.vkTemplate(urlTemplate, jsonData, [params], [callback(elm, data)]) 
*
* PARAMETERS:
*
*	@urlTemplate  	- template URL;
* 	@jsonData		- can be either json object or json string or URL 
*	
*	@params			- jQuery Ajax "data" parameter that is sent to the 
*                     server with jsonData URL if needed (optional)
* 	@function		- callback function (optional)
*
* USAGE:
*	
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php'); 
*	$('#container').vkTemplate('myTemplate.tmpl','{"foo":"bar"}');
*	$('#container').vkTemplate('myTemplate.tmpl',{foo:"bar"});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', function(elm, jsonObj){...});
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123}, function(elm, jsonObj){...});
*
*	Use "o." prefix with this version of Strict Mode Compatible Micro-Templating engine:
* 	object:    {first_name:"John",last_name:"Smith"} 
* 	template:  <%= o.first_name %>  <% if(o.first_name == ... ) {} %> 
*		
*/

(function(jQuery) {

	var vkTemplatesCache = {};
	
	jQuery.fn.vkTemplate = function (urlTmpl, jsonData, params, callback ) {

		function _tmpl(str, data){ 
			var fn = new Function("o",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"	p.push('" +
				str.replace(/[\r\t\n]/g, " ")
				.replace(/'(?=[^%]*%>)/g,"\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(/<%=(.+?)%>/g, "',$1,'")
				.split("<%").join("');")
				.split("%>").join("p.push('")
				+ "');    return p.join('');");
			return fn( data );
		};
	
		function _getData(jsonData, elm, params, callback) { 
		
			// both "params" and "callback" arguments are optional, so let's check 
			//if the 3rd argument exists and either it is an object or a function.
			if ( params ) {
				if ( jQuery.isFunction( params ) ) {// We assume that it's the callback function
					callback = params;
					params = null;
				} else if ( typeof params === "object" ) {// Otherwise, build a param string for ajax request
					params = jQuery.param( params );
				}
			}
	
			// jsonData can be: object | string | URL
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
					context : elm,
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
