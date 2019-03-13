/* 
    --------------------------------------------------------
                            Page Ready  
    --------------------------------------------------------     
*/
var selectedItem = null;
var filesPath = [];
var flNnChgn = false;

var STYLE =  '<style type="text/css">\n'; 
var STYLEEND =  '\n</style>'; 

var SCRIPT = '<script type="text/javascript">\n';  
var SCRIPTEND = '\n</script>'; 

var READY = 'window.addEventListener("load", function(){\n';
var READYEND ='});';

var codeFolderName = 'code';

var nodeJS = false;

/* 
    --------------------------------------------------------
                    Live php code
    --------------------------------------------------------     
*/ 
function runPhpCode(phpData, callBack){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callBack(this.responseText); 
        }
    };

    var url = 'php/runPhpCode.php';
    xhttp.open("POST", url, true);    
    xhttp.send(phpData); 

}

/* 
    --------------------------------------------------------
                    Unloadbefore function
    --------------------------------------------------------     
*/ 
// -------- Show alert box unload before -------- //
window.addEventListener("beforeunload", function (e) {

    if(document.getElementById("IDShowWindowCheckBox").checked){ 
        liveWindow.close();
    }

    var confirmationMessage = "\o/";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome
});

window.addEventListener('load', function(){

    /* 
        --------------------------------------------------------
                                Preloader
        --------------------------------------------------------     
    */ 
    window.setTimeout(function(){
        //misc.delay(10);
        document.getElementById('preloader').style.display = 'none';
    },100);
    
    /* 
        --------------------------------------------------------
                                Split
        --------------------------------------------------------     
    */ 
    let newSplit = new sktSplit();  

    /* 
        --------------------------------------------------------
                            Tabs Section
        --------------------------------------------------------     
    */ 
    // Html/Php tabs
    var phpCodeTabs = new Tabs(document.getElementById('phpSplit'));
    phpCodeTabs.setBackgroundIcon(phpCodeTabs.codeIconPhp, '#00a8f3');
    
    // Refresh php code editors
    phpCodeTabs.refreshEvent(function(){

        var edIns = document.getElementsByClassName('CodeMirror');

        for (var i = 0; i < edIns.length; i++) {             
            edIns[i].CodeMirror.refresh();
        }

        filesIds = phpCodeTabs.getFilesId();             
        
        for (var a = 0; a < filesIds.length; a++) {

            var gate = phpCodeTabs.getActiveTabElement();

            if(gate.id == filesIds[a][1]){                    

                document.getElementById(filesIds[a][0]).click();    
            } 

        }
            
    });

    // Css tabs
    var cssCodeTabs = new Tabs(document.getElementById('cssSplit'));
    cssCodeTabs.setBackgroundIcon(cssCodeTabs.codeIconCss, '#00a8f3');
    
    // Refresh css code editors
    cssCodeTabs.refreshEvent(function(){

        var edIns = document.getElementsByClassName('CodeMirror');

        //this.tab.children[0].children[1].click()
        for (var i = 0; i < edIns.length; i++) {             
            edIns[i].CodeMirror.refresh();
        }

        filesIds = phpCodeTabs.getFilesId();             
        
        for (var a = 0; a < filesIds.length; a++) {

            var gate = cssCodeTabs.getActiveTabElement();

            if(gate.id == filesIds[a][1]){                    

                document.getElementById(filesIds[a][0]).click();    
            } 

        }
            
    });

    // javascript tabs
    var jsCodeTabs = new Tabs(document.getElementById('jsSplit'));
    jsCodeTabs.setBackgroundIcon(jsCodeTabs.codeIconJs, '#00a8f3');
    
    // Refresh js code editors
    jsCodeTabs.refreshEvent(function(){

        var edIns = document.getElementsByClassName('CodeMirror');

        for (var i = 0; i < edIns.length; i++) {             
            edIns[i].CodeMirror.refresh();
        }

        filesIds = phpCodeTabs.getFilesId();             
        
        for (var a = 0; a < filesIds.length; a++) {

            var gate = jsCodeTabs.getActiveTabElement();

            if(gate.id == filesIds[a][1]){                    

                document.getElementById(filesIds[a][0]).click();    
            } 

        }
            
    });    

    /* 
        --------------------------------------------------------
                        File manager section
        --------------------------------------------------------     
    */
    // ------ File manager sections start ------ //    
    var newfileManager = new fileManager(document.getElementById('projectSplit'));

    // ------  File manager treeview ------ //
    var flmgrTreeviewContainer = new fileManagerTreeContainer(newfileManager.getfileManagerTreeContainer());
    var filesTree = new fileManagerTree(flmgrTreeviewContainer.object); 

    var filesIds = [];

    var liveIframe = null;
    var liveWindow = null; 

    var windowCheckBox = document.getElementById("IDShowWindowCheckBox");
    windowCheckBox.disabled = true;
    
    windowCheckBox.addEventListener('click', function(){ 

        var dirPaths = filesTree.getAllItemPaths(); 

        if(!document.getElementById("liveSection").checked){
            
            window.setTimeout(function(){  

                if (document.getElementById("IDShowWindowCheckBox").checked){ 

                    liveWindow = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=1210,width=480,height=640" );                  
                    newSplit.mainSplit.collapse(2);

                    document.getElementById("liveSection").removeChild(document.getElementById("liveSection").firstChild);

                    if(nodeJS == true){
                        liveWindow.location = 'http://localhost:8000/'; 
                    }                    
                    else{                              
                        liveWindow.location.src = filesTree.parent.baseURI + codeFolderName + '/' + dirPaths[0][0]; 
                        console.log(liveWindow.location.src);
                        getAllDataFromEditors();  
                    }
                    
                    let delZoomInOutButton = document.getElementById('IDliveContainer');
                    delZoomInOutButton.removeChild(document.getElementsByClassName('zoomInButton')[0]);
                    delZoomInOutButton.removeChild(document.getElementsByClassName('zoomOutButton')[0]);                     

                } 
                else {

                    liveIframe = new IFrame(document.getElementById("liveSection")); 
                    liveIframe.zoomIn(document.getElementById('IDliveContainer'));
                    liveIframe.zoomOut(document.getElementById('IDliveContainer'));

                    newSplit.mainSplit.setSizes([20,50,30]); 

                    liveWindow.close();

                    if(nodeJS == true){
                        liveIframe.object.src = 'http://localhost:8000/';  
                    }
                    else{
                        liveIframe.object.contentWindow.location.reload(true);
                        getAllDataFromEditors();
                    }
                    
                } 

                console.log('Window switched!');                               
                     
            }, 500);
        }

    });   

    newfileManager.fileMenuAddFolderClick(function(){

        if(filesTree.root.object.childElementCount == 0){

            liveIframe = new IFrame(document.getElementById("liveSection")); 
            liveIframe.zoomIn(document.getElementById('IDliveContainer'));
            liveIframe.zoomOut(document.getElementById('IDliveContainer'));
            
        } 

        windowCheckBox.disabled = false;

        filesTree.createFolder(selectedItem, deleteFolderTab);
       
        function deleteFolderTab(){

            filesIds = phpCodeTabs.getFilesId();
            var selItemFilesId = selectedItem.querySelectorAll("LI")
            
            for (var i = 0; i < selItemFilesId.length; i++) {
                
                if(selItemFilesId[i].classList[0] == "fileIcon"){ 

                    for (var a = 0; a < filesIds.length; a++) {

                        if(selItemFilesId[i].id == filesIds[a][0]){

                            console.log(document.getElementById(filesIds[a][1]).parentNode);
                            console.log(document.getElementById(filesIds[a][1]))
                            document.getElementById(filesIds[a][1]).parentNode.removeChild(document.getElementById(filesIds[a][1]));
                            
                            filesIds.splice(a, 1);
                           
                        } 

                    }                    

                }

            }

        } 
        
    });

    var typingTimer;  
    var time = 300;
    timer = function(){

        var dirPaths = filesTree.getAllItemPaths();

        if(document.getElementById("IDlivecheckBox").checked){ 

            window.clearTimeout(typingTimer);
            typingTimer = window.setTimeout(function(){
            
                if (document.getElementById("IDShowWindowCheckBox").checked){
                    if(nodeJS == true){  
                        liveWindow.location.src = 'http://localhost:8000/';
                    }                    
                    else{ 
                        liveWindow.location.reload(true); 
                        liveWindow.addEventListener('unload', function(){
                            //liveWindow.location.href = 'http://localhost/webDev/php/projects/cmEditor/cmEditor8/code/angularjs_todo_list_demo/';
                            getAllDataFromEditors();
                            console.log('Page Reloaded!') ;
                        });
                    } 
                        
                }
                else{
                    liveIframe.object.contentWindow.location.reload(true); 
                    getAllDataFromEditors();
                }                                

            }, time);    

        }
        // else{ 

        //     if(nodeJS == true){
        //         liveIframe.object.src = 'http://localhost:8000/';
        //     }                        
            
        // } 

    } 

    newfileManager.fileMenuAddFileClick(function(){  

        var newFileItem = filesTree.createFile(selectedItem, deleteTab, setTabName, activeTab);        
        
        function deleteTab(){                

            filesIds = phpCodeTabs.getFilesId();
            
            for (var a = 0; a < filesIds.length; a++) {

                if(selectedItem.id == filesIds[a][0]){ 

                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("mousedown", true, true);
                    document.getElementById(filesIds[a][1]).children[0].dispatchEvent(evt);                     

                    filesIds.splice(a, 1);
                    console.log(selectedItem.id);
                    console.log(filesIds);
                       
                } 

            }
    
        }

        function setTabName(tabName){ 

            if(flNnChgn){          
            
                var fileExtension  = tabName.split('.').pop();                  

                switch(fileExtension){

                    case 'html' :

                        var newTab = phpCodeTabs.createTab(newFileItem.firstChild.data); 
                        phpCodeTabs.setTabIcon(newTab.id, phpCodeTabs.codeIconHtml, '#00a8f3');                      

                        var arr = [];
                        arr.push(newFileItem.id, newTab.id);
                        phpCodeTabs.insertFileId(arr);
                        phpCodeTabs.setActiveTabElement(newTab);

                        var newEditor = new Editor(newTab.children[1], "application/x-httpd-php", '');
                        newEditor.refresh();

                        phpCodeTabs.setLabel(newTab, tabName);

                        var edIns = newEditor.getEditorInstance();
                        CodeMirror.on( edIns, "change", function() {
                            
                            timer();                            

                        }); 

                    break;

                    case 'php' :                        

                        var newTab = phpCodeTabs.createTab(newFileItem.firstChild.data);
                        phpCodeTabs.setTabIcon(newTab.id, phpCodeTabs.codeIconPhp, '#00a8f3');                        

                        var arr = [];
                        arr.push(newFileItem.id, newTab.id);
                        phpCodeTabs.insertFileId(arr);
                        phpCodeTabs.setActiveTabElement(newTab);

                        var newEditor = new Editor(newTab.children[1], "application/x-httpd-php", '');
                        newEditor.refresh();

                        phpCodeTabs.setLabel(newTab, tabName);

                        var edIns = newEditor.getEditorInstance();
                        CodeMirror.on( edIns, "change", function() {

                            timer();

                        });  

                    break;

                    case 'css' :

                        var newTab = cssCodeTabs.createTab(newFileItem.firstChild.data);
                        cssCodeTabs.setTabIcon(newTab.id, cssCodeTabs.codeIconCss, '#00a8f3');

                        var arr = [];
                        arr.push(newFileItem.id, newTab.id);
                        phpCodeTabs.insertFileId(arr);
                        cssCodeTabs.setActiveTabElement(newTab);

                        var newEditor = new Editor(newTab.children[1], "css", '');

                        cssCodeTabs.setLabel(newTab, tabName);

                        var edIns = newEditor.getEditorInstance();
                        CodeMirror.on( edIns, "change", function() {

                            timer();

                        });  

                    break;

                    case 'js' :                        

                        var newTab = jsCodeTabs.createTab(newFileItem.firstChild.data);
                        jsCodeTabs.setTabIcon(newTab.id, jsCodeTabs.codeIconJs, '#00a8f3');

                        var arr = [];
                        arr.push(newFileItem.id, newTab.id);
                        phpCodeTabs.insertFileId(arr);
                        jsCodeTabs.setActiveTabElement(newTab);

                        var newEditor = new Editor(newTab.children[1], "javascript", '');

                        jsCodeTabs.setLabel(newTab, tabName);                        

                        var edIns = newEditor.getEditorInstance();
                        CodeMirror.on( edIns, "change", function() {

                            timer();

                        });   
                        
                    break;

                    default:               
                        console.log('undefined file extension'); 
                }
            }
            else{
                
                filesIds = phpCodeTabs.getFilesId();

                for (var a = 0; a < filesIds.length; a++) {

                        if(selectedItem.id == filesIds[a][0]){ 

                            document.getElementById(filesIds[a][1]).firstChild.data = tabName; 
                               
                        } 

                    console.log(phpCodeTabs.getFilesId());

                }            
            }
        } 

        function activeTab(){

            filesIds = phpCodeTabs.getFilesId();             
            
            for (var a = 0; a < filesIds.length; a++) {

                if(selectedItem.id == filesIds[a][0]){ 

                    document.getElementById(filesIds[a][1]).style.display = 'inline';
                    
                    document.getElementById(filesIds[a][1]).click();

                    var edIns = document.getElementsByClassName('CodeMirror');

                    for (var i = 0; i < edIns.length; i++) {             
                        edIns[i].CodeMirror.refresh();
                    }

                } 

            } 

        }       

    });

    /* 
        --------------------------------------------------------
                           Get all editor data
        --------------------------------------------------------     
    */
    function getAllDataFromEditors(){

        var strPHP = ''; 
        var strCSS = ''; 
        var strJS = '';  

        var allIns = document.getElementsByClassName('CodeMirror'); 
       
        for (var i = 0; i < allIns.length; i++) {

            if(allIns[i].CodeMirror.getMode().name == 'php' || allIns[i].CodeMirror.getMode().name == 'html'){

                strPHP += allIns[i].CodeMirror.getValue();

            }

            else if(allIns[i].CodeMirror.getMode().name == 'css'){

                strCSS += allIns[i].CodeMirror.getValue();

            }

            else if(allIns[i].CodeMirror.getMode().name == 'javascript'){

                strJS += allIns[i].CodeMirror.getValue() + '\n';

            }
            
        } 

        runPhpCode( strPHP, function(data){ 

            //var allCode =  STYLE + strCSS + STYLEEND + data + SCRIPT + READY + strJS + READYEND + SCRIPTEND;
            var allCode = STYLE + strCSS + STYLEEND + data + SCRIPT + strJS + SCRIPTEND;

            if (document.getElementById("IDShowWindowCheckBox").checked){ 
                                      
                liveWindow.document.write(allCode);                 

            } 
            else {
                liveIframe.iframe(allCode); 
            } 

        }); 

    }
    
    /* 
        --------------------------------------------------------
                        Create tab for editor
        --------------------------------------------------------     
    */
    function createTabEditor(tabContainer, dir, filePath, fileName, tabLabel, editorMod){

        var newTab = tabContainer.createTab(tabLabel);  

        var projectFolder = dir.split('/');      

        filesTree.readProjectFile(fileName, function(data){ 
        
            var newEditor = new Editor(newTab.children[1], editorMod, data);         
            //newEditor.setTheme('ambiance');
            var edIns = newEditor.getEditorInstance();
            CodeMirror.on( edIns, "change", function(){
               
                timer();
                
            });

            //filesTree.saveAllFiles(dir, filePath, data, function(res){ console.log(filePath + ' uploaded!'); });              

        }); 

        return newTab.id; // tab id

    }    

    /* 
        --------------------------------------------------------
                           Load project folder
        --------------------------------------------------------     
    */
    newfileManager.openFolderClick(function(event){     

        liveIframe = new IFrame(document.getElementById("liveSection")); 
        liveIframe.zoomIn(document.getElementById('IDliveContainer'));
        liveIframe.zoomOut(document.getElementById('IDliveContainer'));

        var folderIDs = [];
        var toggleButtonIDs = [];
        var deleteButtonIDs = [];
        
        var fileIDs = [];            
        var filedeleteButtonIDs = [];   
        var tabsID = []; 

        windowCheckBox.disabled = false;

        for( var i=0; i < event.target.files.length; i++){

            var fileName = (window.URL || window.webkitURL).createObjectURL(event.target.files[i]);           
            var fileExtension  = event.target.files[i].name.split('.').pop();                
                      
            var dirPath = event.target.files[i].webkitRelativePath; 
            filesPath.push(dirPath);

            var pth = '';
            var dir1 = dirPath;
            dir1 = dir1.split("/");
            dir1.pop();
            
            for (var x = 0; x < dir1.length; x++) {
                pth += dir1[x] + '/';
            }                      

            switch(fileExtension){

                case 'html' : 
                    
                    var newTabID = createTabEditor(phpCodeTabs, pth, dirPath, fileName, event.target.files[i].name, "application/x-httpd-php");
                    tabsID.push(newTabID);                   
                    phpCodeTabs.setTabIcon(newTabID, phpCodeTabs.codeIconHtml, '#00a8f3');   

                break;

                case 'php' :

                    var newTabID = createTabEditor(phpCodeTabs, pth, dirPath, fileName, event.target.files[i].name, "application/x-httpd-php");
                    tabsID.push(newTabID);
                    phpCodeTabs.setTabIcon(newTabID, phpCodeTabs.codeIconPhp, '#00a8f3'); 

                break;

                case 'css' :

                    var newTabID = createTabEditor(cssCodeTabs, pth, dirPath, fileName, event.target.files[i].name, "css");
                    tabsID.push(newTabID);
                    cssCodeTabs.setTabIcon(newTabID, cssCodeTabs.codeIconCss, '#00a8f3');

                break;

                case 'js' :
                    
                    var newTabID = createTabEditor(jsCodeTabs, pth, dirPath, fileName, event.target.files[i].name, "javascript");
                    tabsID.push(newTabID);
                    jsCodeTabs.setTabIcon(newTabID, jsCodeTabs.codeIconJs, '#00a8f3');
   
                break;

                default:
                    tabsID.push('IDnull');
                    //tabsID.push(misc.randomID('ID', 99999));
                    // var newTabID = createTabEditor(phpCodeTabs, pth, dirPath, fileName, event.target.files[i].name, "application/x-httpd-php");
                    // tabsID.push(newTabID);                   
                    // phpCodeTabs.setTabIcon(newTabID, phpCodeTabs.codeIconHtml, '#00a8f3');   
                break;               

            }

        }   

        var hierarchy = filesPath.reduce(function(hier,path){
            var x = hier;
            path.split('/').forEach(function(item){
                if(!x[item]){
                    x[item] = {};
                }
                x = x[item];
            });
            x.path = path;
            return hier;
        }, {}); 
        //console.log(hierarchy);              

        // ------ Make unordered list ------ // 
        var makeul = function(hierarchy, classname){
            var dirs = Object.keys(hierarchy);
            var ul = '<ul id="' + misc.randomID('IDUL', 999999) + '"';
            if(classname){
                ul += ' class="' + classname + '"';
            }
            ul += '>'; 
            dirs.forEach(function(dir){
                var path = hierarchy[dir].path; 
                if(path){ // file

                    var file_id = misc.randomID('IDnewFile', 999999);
                    fileIDs.push(file_id);
                    ul += '<li class="fileIcon" id="' + file_id + '">' + dir;

                    var filedeletebutton_id = misc.randomID('IDnewFileDeleteButton', 999999);
                    filedeleteButtonIDs.push(filedeletebutton_id);                        
                    ul += '<button class="deleteButton" id="' + filedeletebutton_id + '"></button></li>';
                   
                }else{ // folder
                    
                    var folder_id = misc.randomID('IDnewFolder', 999999);
                    folderIDs.push(folder_id);

                    ul += '<li class="folderIcon" id="' + folder_id + '">' + dir;
                    
                    var tooglebutton_id = misc.randomID('IDtoggleButton', 999999);
                    toggleButtonIDs.push(tooglebutton_id);

                    ul += '<button class="opened" id="' + tooglebutton_id + '"></button>';
                    
                    ul += makeul(hierarchy[dir]);

                    var deletebutton_id = misc.randomID('IDnewFolderDeleteButton', 999999);
                    deleteButtonIDs.push(deletebutton_id);
                    
                    ul += '<button class="deleteButton" id="' + deletebutton_id + '"></button></li>';
                
                }
            });
            ul += '</ul>';
            return ul;
        };

        var par = document.getElementById('IDtreeContainer');         
        par.innerHTML = makeul(hierarchy, 'fileManagerTree');
        par.children[0].setAttribute('id', 'IDroot'); 

        document.getElementById('IDroot').children[0].classList.add('root');
        
        for (var i = 0; i < folderIDs.length; i++) {
            filesTree.folderEvents(folderIDs[i], toggleButtonIDs[i], deleteButtonIDs[i], deleteFolderTab);

            function deleteFolderTab(){

                filesIds = phpCodeTabs.getFilesId();
                var selItemFilesId = selectedItem.querySelectorAll("LI")
                
                for (var i = 0; i < selItemFilesId.length; i++) {
                    
                    if(selItemFilesId[i].classList[0] == "fileIcon"){ 

                        for (var a = 0; a < filesIds.length; a++) {

                            if(selItemFilesId[i].id == filesIds[a][0]){

                                console.log(document.getElementById(filesIds[a][1]).parentNode);
                                console.log(document.getElementById(filesIds[a][1]))
                                document.getElementById(filesIds[a][1]).parentNode.removeChild(document.getElementById(filesIds[a][1]));
                                
                                filesIds.splice(a, 1);
                               
                            } 

                        }                    

                    }

                }

            }   
                         
        }

        for (var a = 0; a < fileIDs.length; a++) {

            filesTree.fileEvents(fileIDs[a], filedeleteButtonIDs[a], deleteTab, setTabName, activeTab);

            var arr = [];
            arr.push(fileIDs[a], tabsID[a]);
            phpCodeTabs.insertFileId(arr);

            function deleteTab(){                

                filesIds = phpCodeTabs.getFilesId();
                
                for (var a = 0; a < filesIds.length; a++) {

                    if(selectedItem.id == filesIds[a][0]){ 

                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("mousedown", true, true);
                        document.getElementById(filesIds[a][1]).children[0].dispatchEvent(evt);                     

                        filesIds.splice(a, 1);
                        console.log(selectedItem.id);
                        console.log(filesIds);
                           
                    } 

                }
        
            }

            function setTabName(tabName){

                filesIds = phpCodeTabs.getFilesId();

                for (var a = 0; a < filesIds.length; a++) {

                    if(selectedItem.id == filesIds[a][0]){ 

                        document.getElementById(filesIds[a][1]).firstChild.data = tabName; 
                           
                    } 

                } 
                    
            }   

            function activeTab(){

                filesIds = phpCodeTabs.getFilesId();
                var edIns = document.getElementsByClassName('CodeMirror');  
                
                for (var a = 0; a < filesIds.length; a++) {

                    if(selectedItem.id == filesIds[a][0]){ 

                        document.getElementById(filesIds[a][1]).style.display = 'inline';
                        document.getElementById(filesIds[a][1]).click();

                        var edIns = document.getElementsByClassName('CodeMirror');

                        for (var i = 0; i < edIns.length; i++) {             
                            edIns[i].CodeMirror.refresh();
                        }                 

                    } 

                } 

                for (var i = 0; i < edIns.length; i++) {
                    edIns[i].CodeMirror.refresh();
                }
 
            }

        }     

        if(!document.getElementById("liveSection").checked){
            
            window.setTimeout(function(){  

                if (document.getElementById("IDShowWindowCheckBox").checked){ 

                    if(nodeJS == true){
                        liveWindow.location = 'http://localhost:8000/'; 
                    }                    
                    else{  
                        liveWindow.location.reload(true);                              
                        getAllDataFromEditors();             
                    }

                } 
                else {

                    if(nodeJS == true){
                        liveIframe.object.src = 'http://localhost:8000/';  
                    }
                    else{
                        liveIframe.object.contentWindow.location.reload(true);
                        getAllDataFromEditors();
                    }
                    
                } 

                console.log('Project is loaded!');                               
                     
            }, 400);

        }  

    });

    /* 
        --------------------------------------------------------
                           Save all project files
        --------------------------------------------------------     
    */
    const saveFiles = function(){

        filesIds = phpCodeTabs.getFilesId();

        var dirPaths = filesTree.getAllItemPaths();
                         
        for (var i = 0; i < filesIds.length; i++) {

            var path = filesTree.getSelectedItemPath(document.getElementById(filesIds[i][0])); 
            console.log(path + ' saved!')

            var tabObj = document.getElementById(filesIds[i][1]);

            var editorIns = tabObj.children[1].getElementsByClassName('CodeMirror')[0];

            filesTree.saveAllFiles(dirPaths[i][0], path, editorIns.CodeMirror.getValue(), function(){ });            

        }

        if(!document.getElementById("liveSection").checked){
            
            window.setTimeout(function(){  

                if (document.getElementById("IDShowWindowCheckBox").checked){ 

                    if(nodeJS == true){
                        liveWindow.location = 'http://localhost:8000/'; 
                    }                    
                    else{  
                        liveWindow.location.reload(true);                              
                        getAllDataFromEditors();             
                    }

                } 
                else {

                    if(nodeJS == true){
                        liveIframe.object.src = 'http://localhost:8000/';  
                    }
                    else{
                        liveIframe.object.contentWindow.location.reload(true);
                        getAllDataFromEditors(); 
                    }
                    
                }              
                     
            }, 400);

        }

    }

    newfileManager.saveProjectClick(function(){ 
        saveFiles();        
    });    
    
    /* 
        --------------------------------------------------------
                    Save files keyboard shortcut
        --------------------------------------------------------     
    */
    document.addEventListener('keydown', function(e){

        if (e.ctrlKey == true && e.which == 83) { 
            e.preventDefault(); 
            saveFiles();            
        } 

    });  
          
});