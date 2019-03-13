<?php 

	/* Delete file */
	function deleteFile(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		unlink('../code/' . $phpData);

	}

	deleteFile();
		
?>