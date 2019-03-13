<?php 

	/* Rename file */
	function renameFile(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		$obj = json_decode( $phpData );		

		if(file_exists('../code/' . $obj->newname)) {

			$randNum = '_' . (string) rand();
			
			$ex =  explode("/", $obj->newname);
			$sepExt = explode(".", $ex[count($ex) -1]);
			$newFileName = $sepExt[0] . $randNum . '.' . $sepExt[1];

			//$newFileName = $ex[count($ex) -1] . $randNum;	
			$str = str_replace($sepExt[0], $sepExt[0] . $randNum, $obj->newname); 
		    
			rename('../code/' . $obj->oldname, '../code/' . $str);

		    echo $newFileName;

		}
		else{

			rename('../code/' . $obj->oldname, '../code/' . $obj->newname);

			$ex =  explode("/", $obj->newname);
			$newFileName = $ex[count($ex) -1];

			echo $newFileName;
			
		}

	}

	renameFile();
		
?>