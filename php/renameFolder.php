<?php 

	/* Rename folder */
	function renameFolder(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		$obj = json_decode( $phpData );		
	
		if (!is_dir('../code/' . $obj->newname)) {
		    rename('../code/' . $obj->oldname, '../code/' . $obj->newname);
		    $ex =  explode("/", $obj->newname);	
		    echo $ex[count($ex) -1];		    
		}		
		else{
			$newFolderName = $obj->newname . '_' . (string) rand();
			rename('../code/' . $obj->oldname, '../code/' . $newFolderName);

			$ex1 =  explode("/", $newFolderName);	
		    echo $ex1[count($ex1) -1];
		}

	}

	renameFolder();
		
?>