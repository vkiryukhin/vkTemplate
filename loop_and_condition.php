<?php 
	echo '{"time":[
		  {"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"},'
	    .'{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"},'
		.'{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"}'
		.'], "day":"'.date('d').'", "foo":"yes"}';
 ?>