<?php 

	/* Delete folder */
	$phpData = file_get_contents('php://input');
	
 	$dir = '../code/' . $phpData;

 	function deleteDirectory($dirPath) {
	    if (is_dir($dirPath)) {
	        $objects = scandir($dirPath);
	        foreach ($objects as $object) {
	            if ($object != "." && $object !="..") {
	                if (filetype($dirPath . DIRECTORY_SEPARATOR . $object) == "dir") {
	                	if($dirPath !="../code/"){
	                		deleteDirectory($dirPath . DIRECTORY_SEPARATOR . $object);	
	                	}

	                	echo $dirPath;
	                    
	                } else {
	                    unlink($dirPath . DIRECTORY_SEPARATOR . $object);
	                }
	            }
	        }
	    reset($objects);
	    rmdir($dirPath);
	    }
	}
	//deleteDirectory($dir);

	function removeDirectory($path) {

	    $files = glob(preg_replace('/(\*|\?|\[)/', '[$1]', $path).'/{,.}*', GLOB_BRACE);
	    foreach ($files as $file) {
	        if ($file == $path.'/.' || $file == $path.'/..') { continue; } // skip special dir entries
	        is_dir($file) ? removeDirectory($file) : unlink($file);
	    }
	    rmdir($path);
	    return;
	
	}
	removeDirectory($dir);

?>