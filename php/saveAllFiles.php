<?php 

	/* Save all files */
	function saveAllFiles(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		$obj = json_decode( $phpData );

		if (!is_dir('../code/' . $obj->dir)) {
		    mkdir('../code/' . $obj->dir, 0777, true);		    
		}

		$phpfile = fopen('../code/' . $obj->fileNamePath,'w');

		if ($phpfile != null) {
		    fwrite($phpfile, $obj->data);
		    fclose($phpfile);		    	    	
		} else{
			fclose($phpfile);
		    echo '<script type="text/javascript">alert("write error!...");</script>';
		}	

	}
	saveAllFiles();
		
?>