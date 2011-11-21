/**
* vkTemplate - jQuery Plugin
*  
* Version - 0.92.00.beta ( ECMAScript 5 strict mode compatible, no with() statement.)
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
*	.vkTemplate(urlTemplate, jsonData [,params] [,callback(elm, data, context)] [,context]) 
*
* PARAMETERS:
*
*	@urlTemplate  	- template URL;
* 	@jsonData		- can be either json object or json string or URL 
*	
*	@params			- jQuery Ajax "data" parameter that is sent to the 
*                     server with jsonData URL if needed (optional)
* 	@function		- callback function (optional)
*	@context		- object to pass as a context (optional)
*
* USAGE:
*	
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php'); 
*	$('#container').vkTemplate('myTemplate.tmpl','{"foo":"bar"}');
*	$('#container').vkTemplate('myTemplate.tmpl',{foo:"bar"});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', function(elm, jsonObj){...});
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123});
*	$('#container').vkTemplate('myTemplate.tmpl','myData.php', {id:123}, function(elm, jsonObj){...});

*	If context is provided, all optional parameters must be provided as well. They can be set to null.
*   $('#container').vkTemplate('myTemplate.tmpl','myData.php',null,null,contextObj); 
*
*	Use "o." prefix with this version of Strict Mode Compatible Micro-Templating engine:
* 	object:    {first_name:"John",last_name:"Smith"} 
* 	template:  <%= o.first_name %>  <% if(o.first_name == ... ) {} %> 
*		
*/

(function($) {

	var vkTemplatesCache = {};
	
	jQuery.fn.vkTemplate = function (urlTmpl, jsonData, params, callback, contextObj ) {
	
		function _tmpl(str){ 
			var fn = "var p=[]; p.push('" +
				str.replace(/[\r\t\n]/g, " ")
					.replace(/'(?=[^%]*%>)/g,"\t")
					.split("'").join("\\'")
					.split("\t").join("'")
					.replace(/<%=(.+?)%>/g, "',$1,'")
					.split("<%").join("');")
					.split("%>").join("p.push('")
				 + "'); return p.join('');";
			return new Function("o", fn);
		};

		function _getData(jsonData, elm, params, callback, contextObj) { 
		
			if(!jsonData) return;
			var context = (typeof contextObj !== 'undefined') ? contextObj : window;
			
			// both "params" and "callback" arguments are optional, so let's check 
			// if the 3rd argument exists and either it is an object or a function.
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
					$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonData));	
				if(callback) {
					callback(elm, jsonData, context);
				}
			} else // We assume that it's a string
			
			if($.trim(jsonData).charAt(0) == '{') { //JSON-string
				var jsonObj = jQuery.parseJSON(jsonData);
					$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonObj));	
				if(callback) {
					callback(elm, jsonObj, context);
				}
						
			} else { // URL-string
		
				$.ajax( {
					url		: jsonData,
					dataType: "text",
					cache	: false, 
					data	: params,
					context : context,
					success	: function(data) {
						var jsonObj = jQuery.parseJSON(data);
						$(elm).empty().append(vkTemplatesCache[urlTmpl].call(context,jsonObj));
						if(callback) {
							callback(elm, jsonObj, context);
						}
					}
				});
			}
		}
	
		return this.each(function () {
			var elm = this;
			
			if(vkTemplatesCache[urlTmpl]) { //template has been cashed;
				_getData(jsonData, elm, params, callback, contextObj);
			} else { //get template with ajax
				$.ajax( { 
					url: urlTmpl,
					dataType: "text",
					context: contextObj,
					success: function(data) { 
						vkTemplatesCache[urlTmpl] = _tmpl(data); // compile and save function in cache
						_getData(jsonData, elm, params, callback, contextObj);
					}
				});
			}
		});
	};

})(jQuery);
