/*
var tmpl_5 = '<div id="templ_5_inner" style="border:1px solid blue;margin:1em;">'
+'this is a test 5'
	+'<ul>'
		+'<%for(var i=0;ix<test.length;ix++) {%>'
			+'<li>Current time is: <%=test[i].h%>:<%=test[i].m%>:<%=test[i].s%></li>'
		+'<%}%>'
	+'</ul>'
+'</div>';
*/

var tmpl_7 = 
'<table>'
+'<%for(var ix=0; ix<releaseNotes.length;ix++){%>'
	+'<tr>'
		+'<td><%=releaseNotes[ix].RELEASE_ID%></td>'
		+'<td><%=releaseNotes[ix].AUTHOR%></td>'
		+'<td><%=releaseNotes[ix].BUG_ID%></td>'
		+'<td><%=releaseNotes[ix].RN_DESCRIPTION%></td>'
		+'<td><%=releaseNotes[ix].RELEASED%></td>'
		+'<td>'
		
		+'<a onclick="top.markVisited(this); top.select_toptab(\'details\',\'release\',\'ui_release_notes.upsert?release_id_in=<%=releaseNotes[ix].RELEASE_ID%>\',true); return false" href="ui.home#details,release,ui_release_notes.upsert?release_id_in=<%=releaseNotes[ix].RELEASE_ID%>">Update</a>'
		
		+'</td>'
		+'</tr><%}%>'
+'</table>';


