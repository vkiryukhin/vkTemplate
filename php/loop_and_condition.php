<?php 
/*
	echo '{"time":[
		  {"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"},'
	    .'{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"},'
		.'{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"}'
		.'], "day":"'.date('d').'", "foo":"yes"}';
*/		
		
	$str = '{"time":[';
	
	for ($ix=0; $ix<3; $ix++) {
		if($ix<2) {
			$str .= '{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"},';
		} else {
			$str .= '{"h":"'.date('h').'","m":"'.date('i').'","s":"'.date('s').'"}';
		}
	}
	
	$str .= ']}';
	echo $str;

 ?>