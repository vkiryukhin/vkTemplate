
$(document).ready(function()
{
	$("#release_notes_table").tmplRemote("http://mojo.test.mediaplex.com/adserver/vadim_test.get_web_file?url_in=http://eslinstructor.net/test/mediaplex/microtempl/release_notes.tmpl","http://mojo.test.mediaplex.com/adserver/ui.home#temp,empty,ui_release_notes_tmpl_vadim.get_release_notes_json");

});