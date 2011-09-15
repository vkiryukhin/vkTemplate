<?php 
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