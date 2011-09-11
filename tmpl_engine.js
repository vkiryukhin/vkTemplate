
/*
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
		// 
		// VK: Original parsing was replaced with this one to resolves a "single quote" issue.
		// Taken from Neil's comment at 
		// http://www.west-wind.com/weblog/posts/2008/Oct/13/Client-Templating-with-jQuery
		//
        str.replace(/[\r\t\n]/g, " ")
		    .replace(/'(?=[^%]*%>)/g,"\t")
			.split("'").join("\\'")
			.split("\t").join("'")
			.replace(/<%=(.+?)%>/g, "',$1,'")
			.split("<%").join("');")
			.split("%>").join("p.push('")
			+ "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
 	
})();
*/

/*
 * let's create "tmpl" jQuery plugin
 */
 
/* 
(function( $ ){
  jQuery.fn.tmpl = function(str,data){ 
		return this.empty().append(tmpl(str,data)); 
	};
})( jQuery );
*/

/*
 * get templates and data from a server with ajax
 * and process them with 'tmpl' - micro-templating engin
 */
 
/* 
(function(){

	// cache template in this object
	var templates = {};
*/	
	/*
	 * function tmplRemote() 
	 * takes "template" and "data" from server, 
	 * process them using tmpl() microtemplate engine 
	 * and renders result inside "elm" which is provided as the 3d parameter.
	 *
	 * @tmplUrl: URL to remote template
	 *
	 * @dataRef: can be 2 types:
	 *           - URL to remote data
	 *           - javascript variable which refers to JSON string (local data)
	 *
	 * elm:      can be 2 types:
	 *           - element ID (string)
	 *           - object
	 */
/*	 
	this.tmplRemote = function tmplRemote(tmplUrl, dataRef, elm, callback) {

	var obj = {};
		obj.dataRef = dataRef;
		obj.tmplUrl = tmplUrl;
		obj.elm     = (typeof(elm) === 'string') ? document.getElementById(elm) : elm;
		obj.callback = callback;
		
		
	
	if(templates[obj.tmplUrl]) { 
	//template has been cached, so take it from cache.
		$.ajax( {
			url		: dataRef,
			dataType: "text",
			//cache	: false, 
			context	: obj,
			success	: function(data) {
				$(obj.elm).tmpl(templates[obj.tmplUrl],jQuery.parseJSON(data));	
				obj.callback();
			}
		});

	} else {
	 //first request, so we need to get template with ajax
	 
		// load template
		$.ajax( { 
			url: tmplUrl,
			dataType: "text",
			context:obj,
			success: function(data) { 
			// save template in cache
				templates[obj.tmplUrl] = data; 
			// get data
				if(obj.dataRef.charAt(0) == '{') { //reference to local JSON string
					$(obj.elm).tmpl(templates[obj.tmplUrl],jQuery.parseJSON(obj.dataRef));
					obj.callback();
				} else { 
			//URL string, so we need to get data from server	
					$.ajax( {
						url: obj.dataRef,
						dataType: "text",
						//cache	: false, 
						context:obj,
						success: function(data) {
							$(obj.elm).tmpl(templates[obj.tmplUrl],jQuery.parseJSON(data));	
							obj.callback();
						}
					});
				}
			}
		});
    }
}
})();
*/

/*
(function(jQuery) {

	jQuery.fn.vkTemplate = function (options, callback) {
	
		return this.each(function () {
		
			var elm = this,
			templates = {},
			es = {};
		
			elm.settings = jQuery.extend(true,{
				urlTmpl			: '',   // see jQuery.ajax for details
				urlData			: '',   // see jQuery.ajax for details
				urlTmplParams	: '',   // data for urlTmpl ajax (see jQuery.ajax for details)
				urlDataParams	: '',   // data for urlData ajax (see jQuery.ajax for details)
				type			: 'get'	// see jQuery.ajax for details

			}, options);
			
			es = elm.settings;
			es.callback = callback;
			
			function run() {

				if(templates[es.urlTmpl]) { 
					//template has been cached, so take it from cache.
					$.ajax( {
						url		: es.urlData,
						data	: es.urlDataParams,
						dataType: "text",
						//cache	: false, 
						success	: function(data) {
							$(elm).empty().append(tmpl(templates[es.urlTmpl],jQuery.parseJSON(data)));	
							es.callback(elm);
						}
					});

				} else { //first request, so we need to get template with ajax

					$.ajax( { 
						url: es.urlTmpl,
						dataType: "text",
						success: function(data) { 
							templates[es.urlTmpl] = data; // save template in cache
							$.ajax( {
								url:  es.urlData,
								data: es.urlDataParams,
								dataType: "text",
								//cache	: false, 
								success: function(data) {
									$(elm).empty().append(tmpl(templates[es.urlTmpl],jQuery.parseJSON(data)));	
									es.callback(elm);
								}
							});
						}
					});
				}
			}
			
			es.fnRun = run;
		});
	};
	
	jQuery.fn.vkTemplateRun = function () {        
		return this.each(function () {
			this.settings.fnRun();
		});
	}; 
	
	
	
})(jQuery);
*/

(function(jQuery) {
/*
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
 */
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
