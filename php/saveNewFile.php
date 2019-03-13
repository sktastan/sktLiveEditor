<?php 

	/* Save new file */
	function saveNewFile(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		$obj = json_decode( $phpData );

		if(file_exists('../code/' . $obj->fileNamePath)) {			
			
			$randNum = '_' . (string) rand();
			
			$ex =  explode("/", $obj->fileNamePath);
			if (strpos($obj->fileNamePath, '.') === false) {
				$newFileName = $ex[count($ex) -1] . $randNum;
				$str = str_replace($ex[count($ex) -1], $ex[count($ex) -1] . $randNum, $obj->fileNamePath); 				    
			}else{
				$sepExt = explode(".", $ex[count($ex) -1]);
				$newFileName = $sepExt[0] . $randNum . '.' . $sepExt[1];
				$str = str_replace($sepExt[0], $sepExt[0] . $randNum, $obj->fileNamePath); 
			}
		    
			$phpfile = fopen('../code/' . $str , 'w');
					
			if ($phpfile != null) {
			    fwrite($phpfile, $obj->data);
			    fclose($phpfile);		    	    	
			} else{
				fclose($phpfile);
			    echo '<script type="text/javascript">alert("write error!...");</script>';
			}

		    echo $newFileName;

		}
		else{		

			$phpfile = fopen('../code/' . $obj->fileNamePath, 'w');
					
			if ($phpfile != null) {
			    fwrite($phpfile, $obj->data);
			    fclose($phpfile);		    	    	
			} else{
				fclose($phpfile);
			    echo '<script type="text/javascript">alert("write error!...");</script>';
			}

			$ex =  explode("/", $obj->fileNamePath);
			$newFileName = $ex[count($ex) -1];

			echo $newFileName;
			
		}		

	}

	saveNewFile();
		
?>