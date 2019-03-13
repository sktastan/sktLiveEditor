/* 
    --------------------------------------------------------
                    Tabs for cm code editors 
    --------------------------------------------------------     
*/
var Tabs = function(parent){

	var self = this;
	this.parent = parent;
	this.tab = null;
	this.activeTabIndexNum = 0;
	this.activeTabElement = null;
	this.counter = 0;

	// Fontawesome icons
	this.codeIconPhp = 'f457';
	this.codeIconHtml = 'f13b';
	this.codeIconCss = 'f13c';
	this.codeIconJs = 'f3b9';

	this.filesIdList = [];

	// ---------- Tabs container ---------- //
	this.tabContainer = new Element(); 
    this.tabContainer.create('div', misc.randomID('IDtabContainer', 9999999), 'tabContainer', this.parent);

    var codeBgLogo = new Element();
	codeBgLogo.create('div', misc.randomID('IDcodeLogo', 9999999), '', this.tabContainer.object);	

	// ---------- Tabs ---------- //
	this.tab = new Element(); 
    this.tab.create('ul', misc.randomID('IDtab', 9999999), 'tabs', this.tabContainer.object);

    // ---------- Navigation buttons container ---------- //
    this.tabNavContainer = new Element(); 
    this.tabNavContainer.create('div', misc.randomID('IDtabNavContainer', 9999999), 'tabNavContainer', this.tabContainer.object);

    // ---------- Previous tab button ---------- //
    this.prevTab = new Element(); 
    this.prevTab.create('button', misc.randomID('IDprevTab', 9999999), 'tabsPrev', this.tabNavContainer.object);    

    this.prevTab.addEvent('click', function(event){

    	event.stopPropagation();

    	var childrenLenght = self.tab.object.children.length - 1;
 		
    	if(childrenLenght > self.counter && self.counter != 0 ){

			self.counter--;
    		self.tab.object.children[self.counter].style.width = 'auto';
    		self.tab.object.children[self.counter].style.padding = '10px 30px';
    		self.tab.object.children[self.counter].children[0].style.zIndex = '0';
    		self.tab.object.children[self.counter].style.borderWidth = '1px';

    	}

    });

    // ---------- Next tab button ---------- //
    this.nextTab = new Element();
    this.nextTab.create('button', misc.randomID('IDnextTab', 9999999), 'tabsNext', this.tabNavContainer.object);   

    this.nextTab.addEvent('click', function(event){

    	event.stopPropagation();

    	var allTabsLenght = 0;

    	for (var i = 0; i < self.tab.object.children.length; i++) {
	    	allTabsLenght = allTabsLenght + self.tab.object.children[i].offsetWidth;
	    }  

    	if(allTabsLenght > self.tab.object.offsetWidth){	    	
			
    		self.tab.object.children[self.counter].style.width = '0';
    		self.tab.object.children[self.counter].style.padding = '0';
    		self.tab.object.children[self.counter].children[0].style.zIndex = '-1';
    		self.tab.object.children[self.counter].style.borderWidth = '0';
	    	self.counter++; 

    	}

    });
   
    window.addEventListener('mousedown', function(event){
    	
    	//event.stopPropagation();
		if(event.target.tagName == 'LI'){
			if(event.target.tagName != 'BUTTON'){				
				self.tab.object.addEventListener('mouseover', self.M_over, false);
			}	
		}	

	}, false);

	// ---------- Mouse over ---------- //
	this.M_over = function(event){

		//event.stopPropagation();		
		
		var a;
		var b;

		if(event.target.tagName == 'LI'){

			self.clearBorder();	
			event.target.classList.add('dragBorder');

			a = event.target;
			b = self.activeTabElement; 

			if( self.getActiveTabIndexNum(self.activeTabElement) > self.getDragOverElementIndexNum(event.target) ){ 
							
				a.parentElement.insertBefore(b, a); 					

			}
			else if( self.activeTabIndexNum < self.getDragOverElementIndexNum(event.target) ){

				a.parentElement.insertBefore(b, a.nextSibling);					
				
			}

		}	
	}

	window.addEventListener('mouseup', function(){ 
    	
    	//event.stopPropagation(); 
		self.clearBorder();self.tab.object.removeEventListener('mouseover', self.M_over, false);		

	}, false);

	// ---------- Get active tab index number ---------- //
	this.getActiveTabIndexNum = function(elem){

    	// Get active tab index number
        for (var i = 0; i < self.tab.object.children.length; i++) {

			if(self.tab.object.children[i].id === elem.id){ 				
				this.activeTabIndexNum = i;
				return i;
			}

		}

	}

	// ---------- Get active tab element object ---------- //
    this.getActiveTabElement = function(){
		
		for (var i = 0; i < this.tab.object.children.length; i++) {
			
			for (var a = 0; a < this.tab.object.children[i].classList.length; a++) {

				if(this.tab.object.children[i].classList[a] === 'active'){
					return this.tab.object.children[i];
				}

			}
			
		}

	}

	// ---------- Set active tab element by name ---------- //
	this.setActiveTabElementByName = function(name){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			if(this.tab.object.children[i].firstChild.data == name){
				this.setActiveTabElement(this.tab.object.children[i]);
				//return this.tab.object.children[i];
			}
		}
	}

	// ---------- Set active tab element object  ---------- //
	this.setActiveTabElement = function(elem){
		
		var ced = self.tab.object.getElementsByClassName('tabPage');
	        
        for(var i=0; i < ced.length; i++){
            ced[i].style.display = 'none';               
        }
       
        elem.children[1].style.display = 'block'; 	        

        var act = self.tab.object.querySelectorAll('.active')

        for(var a=0; a<act.length; a++){
            act[a].classList.remove("active");   
        }
          
        elem.classList.add('active'); 

        self.activeTabElement = elem;

	}

	// ---------- Set first tab element ---------- //
	this.setFirstActiveTabElement = function(){

		this.tab.object.children[0].classList.add('active');
		this.activeTabElement = this.tab.object.children[0];
		
	}

	// ---------- Clear border after tab move ---------- //
	this.clearBorder = function(){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			
			this.tab.object.children[i].classList.remove('dragBorder');
			
		}	
		
	}

	// ---------- Get drag over element index number ---------- //
	this.getDragOverElementIndexNum = function(elem){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			
			if(this.tab.object.children[i].id === elem.id){
				return i;
			}

		}	

	}
	
	// ---------- Set tab label ---------- //
	this.setLabel = function(item, label){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			if(this.tab.object.children[i] == item){
				return this.tab.object.children[i].firstChild.data = label;
			}
		}

	}

	// ---------- Update tab label  ---------- //
	this.updateLabel = function(oldlabel, newLabel){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			if(this.tab.object.children[i].childNodes[0].data === oldlabel){
				this.tab.object.children[i].childNodes[0].data = newLabel;
			}
		}	

	}

	// ---------- Get tab label ---------- //
	this.getTabLabel = function(index){}

	// ---------- Get active tab label ---------- //
	this.getActiveTabLabel = function(){}	

	// ---------- Set tab icon ---------- //
	this.setTabIcon = function(elemID, fontAwesome, color){
		 		
  		misc.addCSSRule(document.styleSheets[0], ".icon"+elemID, '', document.styleSheets[0].cssRules.length);
  		misc.addCSSRule(document.styleSheets[0], ".icon"+elemID+":before", 'font-family: FontAwesome; content:"\\' + fontAwesome + '\\00a0\\00a0\\00a0"; padding:0px 0px; color:'+ color +'; font-size:100%; ', document.styleSheets[0].cssRules.length);  		
  		document.getElementById(elemID).classList.add("icon"+elemID);

	}

	// ---------- Set all tab icons  ---------- //
	this.setTabIconForAll = function(fontAwesome, color){
		 		
  		misc.addCSSRule(document.styleSheets[0], ".tabs > li", '', document.styleSheets[0].cssRules.length);
  		misc.addCSSRule(document.styleSheets[0], ".tabs > li:before", 'font-family: FontAwesome; content:"\\' + fontAwesome + '\\00a0\\00a0\\00a0"; color:'+ color +'; font-size:14px; ', document.styleSheets[0].cssRules.length);  		
  
	}

	// ---------- Set editor background icon ---------- //
	this.setBackgroundIcon = function(fontAwesome, color){

		var logoNum = misc.randomID('codeBgLogo', 9999999);
		misc.addCSSRule(document.styleSheets[0], '.'+logoNum, 'position: absolute; top: 50%; left: 50%; opacity: 0.1; transform: translate(-50%, -50%)', document.styleSheets[0].cssRules.length);
  		misc.addCSSRule(document.styleSheets[0], '.'+logoNum+':before', 'font-family: FontAwesome; text-shadow: 2px 2px 20px #111; content:"\\' + fontAwesome + '"; color:'+ color +'; font-size:6em; ', document.styleSheets[0].cssRules.length);  		
  		codeBgLogo.object.classList.add(logoNum);
		
	}

	// ---------- Store all file id in array ---------- //
	this.insertFileId = function(id){
		 		
  		this.filesIdList.push(id);	

	}

	// ---------- Get all files id from array ---------- //
	this.getFilesId = function(){
		 		
  		return this.filesIdList	

	}

	// ---------- Create tab element ---------- //
    this.createTab = function(label){

		var tabLI = new Element(); 
		var tabLIid = misc.randomID('IDtabLI', 9999999);
		//this.tabItemId.push(tabLIid);
		tabLI.create('li', tabLIid, '', this.tab.object);
		tabLI.setLabel(label);
		tabLI.addEvent('mousedown', function(event){ 
		//tabLI.addEvent('click', function(event){ 
			// event.stopPropagation();		 			 	
			self.setActiveTabElement(this);
			self.activeTabIndexNum = self.getActiveTabIndexNum(this); 
			//console.log(this.id)			      
		}); 

		tabLI.addEvent('click', function(event){ 
			event.stopPropagation();		 			 	
			self.setActiveTabElement(this);
			self.activeTabIndexNum = self.getActiveTabIndexNum(this); 
			    
		}); 

		var deleteButton = new Element(); 
		deleteButton.create('button', misc.randomID('IDdeleteButton', 9999999), 'deleteButton', tabLI.object);
		deleteButton.addEvent('mousedown', function(event){ 
			
		 	event.stopPropagation();    	

			if(tabLI.object == self.activeTabElement){
				if(self.tab.object.children.length !=1){
					if(self.tab.object.lastChild == tabLI.object){
				 		self.setActiveTabElement(tabLI.object.previousSibling);
				 	}
				 	
				 	else{
				 		self.setActiveTabElement(tabLI.object.nextSibling);
				 	}	
				}
				else
					self.setActiveTabElement(tabLI.object);
			}

			tabLI.object.style.display = 'none'; 

		});

		// ---------- Tab page for code editor ---------- //
	    var tabPage = new Element(); 
		tabPage.create('ul', misc.randomID('IDtabPage', 9999999), 'tabPage', tabLI.object);

		return tabLI.object;

	}

	// ---------- Delete tab ---------- //
	this.deleteTab = function(itemObj){

		this.tab.delete(itemObj);

	}

	// ---------- Delete tab by name ---------- //
	this.deleteTabByName = function(itemName){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			if(this.tab.object.children[i].childNodes[0].data === itemName){
				this.tab.delete(this.tab.object.children[i]);
			}
		}
		
	}

	// ---------- Delete tab by id ---------- //
	this.deleteTabById = function(itemId){

		for (var i = 0; i < this.tab.object.children.length; i++) {
			if(this.tab.object.children[i].id === itemId){
				this.tab.delete(this.tab.object.children[i]);
			}
		}
		
	}

	// ---------- Refresh event for cm editor ---------- //
	this.refreshEvent = function(callback){

		this.tab.object.addEventListener('mousedown', callback, false);

	}

	// ---------- Show setting dialog box ---------- //
	// this.settingButton = function(){

	// 	// ---------- Setting tab button ---------- //
	//     var settingTab = new Element();
	//     settingTab.create('button', misc.randomID('IDsettingTab', 9999999), 'settingTab', this.tabNavContainer.object);   

	//     settingTab.addEvent('click', function(event){

	//     	var newPhpDialogBox = new phpDialogBox(document.body);
	//     	newPhpDialogBox.addEditBox();


	//     });

	//     return settingTab;

	// }

	return this;
    
}