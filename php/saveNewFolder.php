<?php 

	/* Save new folder */
	function saveNewFolder(){

		// get ajax data
		$phpData = file_get_contents('php://input');

		if(!is_dir('../code/' . $phpData)) {
		    mkdir('../code/' . $phpData, 0777, true);

		    $ex =  explode("/", $phpData);	
		    echo $ex[count($ex) -1];		    
		}
		else{
			$newFolderName = $phpData . '_' . (string) rand();
			mkdir('../code/' . $newFolderName , 0777, true);

			$ex1 =  explode("/", $newFolderName);	
		    echo $ex1[count($ex1) -1];
		}

	}
	saveNewFolder();
		
?>