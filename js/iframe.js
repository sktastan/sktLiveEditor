/* 
    --------------------------------------------------------
                  	IFrame javascript functions
    --------------------------------------------------------     
*/
var IFrame = function(parent){

	var iFrameConatiner = new Element(); 
 	iFrameConatiner.create('div', misc.randomID('IDiframeConatiner', 999999), 'frameConatiner', parent);
    
    this.object;

    var newFrame = new Element(); 
    this.object = newFrame.create('iframe', misc.randomID('IDiframe', 999999), 'iframe', iFrameConatiner.object);   

    this.iframe = function(data){

	    var iframe = newFrame.object.contentWindow.document;
	    iframe.open();
	    iframe.write(data);
	    iframe.close(); 

	}

    this.iframeWrite = function(php, css, js){    

	    var iframe = newFrame.object.contentWindow.document;
	    iframe.open();
	    iframe.write(php+css+js);
	    iframe.close(); 

	}

	this.showBackEndErrorsOnIframe = function(responseText){    

	    var iframeErr = newFrame.object.contentWindow.document;
	    iframeErr.open();
	    iframeErr.write(responseText);
	    iframeErr.close(); 

	}

	var scaleCount = 100;
	
	this.zoomIn = function(parent){
    	
    	var zoomInButton = new Element(); 
    	zoomInButton.create('botton', misc.randomID('IDzoomInButton', 999999), 'zoomInButton', parent);   
	    zoomInButton.addEvent("click", function(){
			if(scaleCount<100){
		        scaleCount+=10;      
		        newFrame.object.style.transform = 'scale('+(scaleCount/100)+')';  
		    }
	    });

    } 

    this.zoomOut = function(parent){
    	
    	var zoomOutButton = new Element(); 
    	zoomOutButton.create('botton', misc.randomID('IDzoomOutButton', 999999), 'zoomOutButton', parent);   
	    zoomOutButton.addEvent("click", function(){
			if(scaleCount>10){
		        scaleCount-=10;
		        newFrame.object.style.transform = 'scale('+(scaleCount/100)+')';       
		    }
	    });

    }  
	
	return this;
}