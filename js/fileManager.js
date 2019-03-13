/* 
    --------------------------------------------------------
                        File manager
    --------------------------------------------------------     
*/

/* ------ File manager start ------ */
var fileManager = function (parent) {

    var self = this;
    this.parent = parent;

	/* 
        --------------------------------------------------------
                    File manager container 
        --------------------------------------------------------     
    */
    this.fileManagerContainer = new Element();
    this.fileManagerContainer.create('div', 'IDfileManagerContainer', 'fileManagerContainer', this.parent);

    /* 
        --------------------------------------------------------
                        File Menu container 
        --------------------------------------------------------     
    */
    this.fileMenuContainer = new Element();
    this.fileMenuContainer.create('div', 'IDfileManagerMenuContainer', '', this.fileManagerContainer.object);

    /* 
        --------------------------------------------------------
                                File Menu
        --------------------------------------------------------     
    */
    this.fileMenu = new Element();
    //this.fileMenu.create('ul', 'IDfileMenu', 'fileMenu', this.fileMenuContainer.object);
    this.fileMenu.create('ul', 'IDfileMenu', 'fileMenu', document.getElementById('IDmainMenuContainer'));

    let inBefore = document.getElementById('IDmainMenuContainer');
    inBefore.insertBefore(this.fileMenu.object, document.getElementById('IDmainMenuRightSide'));

    /* 
        --------------------------------------------------------
                            File menu buttons 
        --------------------------------------------------------     
    */

    // Load folder dialog box loadFolderDialogBoxButton
    this.directoryElement = new Element();
    this.directoryElement.create('input', 'IDopenFolderDialogBox', '', document.body);
    this.directoryElement.object.setAttribute('type', 'file');
    this.directoryElement.object.setAttribute('webkitdirectory', '');
    this.directoryElement.object.setAttribute('mozdirectory', '');
    this.directoryElement.object.setAttribute('msdirectory', '');
    this.directoryElement.object.setAttribute('odirectory', '');
    this.directoryElement.object.setAttribute('directory', '');
    this.directoryElement.object.style.display = 'none';

    // Open folder button
    this.openFolderButton = new Element();
    this.openFolderButton.create('li', '', 'openFolderIcon', this.fileMenu.object);
    this.openFolderButton.addEvent('click', function () {
        document.getElementById("IDopenFolderDialogBox").click();
    });

    // Open folder dialog box
    this.openFolderDialogBox = document.getElementById("IDopenFolderDialogBox");
    this.openFolderClick = function (opnFldClck) {

        this.openFolderDialogBox.addEventListener('change', opnFldClck);

    }

    // Create input(file) element
    this.fileElement = new Element();
    this.fileElement.create('input', 'IDopenFileDialogBox', '', document.body);
    this.fileElement.object.setAttribute('type', 'file');
    this.fileElement.object.setAttribute('multiple', '');
    this.fileElement.object.style.display = 'none';

    // Project save button
    this.projectSaveButton = new Element();
    this.projectSaveButton.create('li', '', 'saveProjectIcon', this.fileMenu.object);
    this.saveProjectClick = function (savePrjct) {

        this.projectSaveButton.addEvent('click', savePrjct);

    }

    // Add Folder 
    this.addFolderButton = new Element();
    this.addFolderButton.create('li', 'IDaddFolderButton', 'addFolderIcon', this.fileMenu.object);
    this.fileMenuAddFolderClick = function (addFldrClbk) {

        this.addFolderButton.addEvent('click', addFldrClbk);

    }

    // Add File 
    this.addFileButton = new Element();
    this.addFileButton.create('li', 'IDaddFileButton', 'addFileIcon', this.fileMenu.object);
    this.fileMenuAddFileClick = function (addFileClbk) {

        this.addFileButton.addEvent('click', addFileClbk);

    }

    // Create live (checkbox) element
    this.livecheckBoxCont = new Element();
    this.livecheckBoxCont.create('div', 'IDlivecheckBoxCont', 'onoffswitch', document.getElementById('IDliveContainer'));
   
    this.livecheckBox = new Element();
    this.livecheckBox.create('input', 'IDlivecheckBox', 'onoffswitch-checkbox', this.livecheckBoxCont.object);
    this.livecheckBox.object.setAttribute('type', 'checkbox');
    this.livecheckBox.object.checked = true;

    this.livecheckBoxLabel = new Element();
    this.livecheckBoxLabel.create('label', 'IDlivecheckBoxLabel', 'onoffswitch-label', this.livecheckBoxCont.object);
    this.livecheckBoxLabel.object.setAttribute('for', 'IDlivecheckBox');

    // Create input(checkbox) element
    this.checkBox = new Element();
    this.checkBox.create('div', 'IDcheckBox', 'onoffswitch', document.getElementById('IDliveContainer'));

    this.fileElement = new Element();
    this.fileElement.create('input', 'IDShowWindowCheckBox', 'onoffswitch-checkbox', this.checkBox.object);
    this.fileElement.object.setAttribute('type', 'checkbox');
    
    this.checkBoxLabel = new Element();
    this.checkBoxLabel.create('label', 'IDcheckBoxLabel', 'onoffswitch-label', this.checkBox.object);
    this.checkBoxLabel.object.setAttribute('for', 'IDShowWindowCheckBox');
    // this.checkBoxLabel.setLabel('label');

    // inBefore.insertBefore(document.getElementById('IDsplitButtonContainer'), document.getElementById('IDliveContainer'));

    /* 
        --------------------------------------------------------
                        File Manager Treeview Container
        --------------------------------------------------------     
    */
    this.fileManagerTreeContainer = new Element();
    this.fileManagerTreeContainer.create('div', 'IDfileManagerTreeContainer', '', this.fileManagerContainer.object);

    this.getfileManagerTreeContainer = function () {

        return this.fileManagerTreeContainer.object;

    }

    return this;

}
/* ------ File manager menu end ------ */

/* 
    --------------------------------------------------------
                    File manager treeview
    --------------------------------------------------------     
*/
/* ------ File manager treeview container ------ */
var fileManagerTreeContainer = function (parent) {

    this.parent = parent;

    // ---------- Tabs container ---------- //
    this.treeContainer = new Element();
    this.treeContainer.create('div', 'IDtreeContainer', '', this.parent);

    return this.treeContainer;

}

/* ------ File manager treeview start ------ */
var fileManagerTree = function (parent) {

    // Misc variables here
    var self = this;
    this.parent = parent;
    this.counter = 0;

    this.defaultFolderName = 'New Folder';
    this.defaultFileName = 'New File';

    this.folderCreated = false;
    this.folderNameChanged = false;
    this.oldFolderName = '';

    this.tabsIdList = [];

    // ---------- Root folder ---------- //
    this.root = new Element();
    //this.root.create('ul', 'IDroot', this.option.cssClass, this.parent); 
    this.root.create('ul', 'IDroot', 'fileManagerTree', this.parent);

    // ---------- Create new folder section start ---------- //
    this.createInputElementForaddFolder = function (parent) {

        //event.stopPropagation();

        var editElement = new Element();
        editElement.create('input', misc.randomID('IDfolderEdit', 999999), '', parent);
        editElement.object.setAttribute('type', 'text');

        editElement.object.focus();
        editElement.object.value = editElement.object.parentNode.childNodes[0].data;
        //editElement.object.setSelectionRange( 0,  editElement.object.value.lenght - 3 ); 
        editElement.object.select();

        editElement.addEvent('click', function (event) {
            event.stopPropagation();
        });

        editElement.addEvent('dblclick', function (event) {
            event.stopPropagation();
        });

        var oldInputText = editElement.object.value;

        var pressEnter = false;
        editElement.addEvent('keydown', function (event) {
            if (event.keyCode == 13) {
                pressEnter = true;
                editElement.object.parentNode.removeChild(editElement.object);
            }
        });

        editElement.addEvent('focusout', function (event) {

            self.oldFolderName = event.target.parentNode.childNodes[0].data;

            if (misc.checkChar(editElement.object.value) === false) {
                //alert('There is a spacial character!')
                alert("Please only use standard alphanumerics");
                editElement.object.value = self.oldFolderName;
            }

            if (oldInputText == editElement.object.value) { self.folderNameChanged = false; }

            if (editElement.object.value === '') {
                alert('Folder name is empty!');
                editElement.object.value = self.oldFolderName;

            }

            else {

                selectedItem.childNodes[0].data = editElement.object.value;

                if (self.folderCreated) {

                    var newfolderPath = self.getSelectedItemPath(selectedItem);
                    self.saveNewFolder(newfolderPath, function (res) {
                        selectedItem.childNodes[0].data = res;
                    });

                }

                if (self.folderNameChanged) {
                    var newfolderPath = self.getSelectedItemPath(selectedItem);
                    var ret = newfolderPath.replace(editElement.object.value, '');
                    self.renameFolder(ret + self.oldFolderName, ret + editElement.object.value, function (res) {
                        selectedItem.childNodes[0].data = res;
                    });
                }

            }

            self.folderCreated = false;
            self.folderNameChanged = false;

            if (pressEnter == false) {
                editElement.object.parentNode.removeChild(editElement.object);
            }
            pressEnter = false;

        }, false);

    }

    this.createFolder = function (parent, deleteFolderCallback) {

        this.folderCreated = true;
        this.folderNameChanged = false;

        if (selectedItem == null || selectedItem == undefined) {
            parent = this.root.object;
            selectedItem = this.root.object;
        }

        if (this.root.object.childElementCount == 0) {
            selectedItem = parent;
        } else {
            parent = parent.children[1];
        }

        var newFolderObj = new Element();
        newFolderObj.create('li', misc.randomID('IDnewFolder', 999999), 'folderIcon', parent);
        newFolderObj.setLabel(this.defaultFolderName);

        this.createInputElementForaddFolder(newFolderObj.object);

        newFolderObj.addEvent('click', function (event) {
            event.stopPropagation();
            selectedItem = event.target;
            console.log(selectedItem.querySelectorAll("LI"));
        });

        newFolderObj.addEvent('dblclick', function () {
            self.folderNameChanged = true;
            self.createInputElementForaddFolder(newFolderObj.object);
        });

        var toggleButton = new Element();
        toggleButton.create('button', misc.randomID('IDtoggleButton', 10000), 'opened', newFolderObj.object);

        toggleButton.addEvent('click', function (event) {
            event.stopPropagation();
            event.target.nextSibling.classList.toggle('toggle');
            event.target.classList.toggle('closed');
        });

        toggleButton.addEvent('dblclick', function (event) {
            event.stopPropagation();
        });

        // ---------- Sub list items ----------
        var subListItem = Element();
        subListItem.create('ul', misc.randomID('IDsubListItem', 999999), '', newFolderObj.object);

        // var anchor = new Element(); 
        // anchor.create('a', misc.randomID('IDnewAnchor', 999999), '', newFolderObj.object); 

        // ---------- Sub list item delete button ----------
        var deleteButton = Element();
        deleteButton.create('button', misc.randomID('IDdeleteButton', 999999), 'deleteButton', newFolderObj.object);
        deleteButton.addEvent('click', function (event) {

            selectedItem = event.target.parentNode;

            if (confirm("This folder is deleting permanently!")) {

                event.stopPropagation();
                var delFolderPath = self.getSelectedItemPath(event.target.parentNode);
                self.deleteFolder(delFolderPath, function () { });

                deleteFolderCallback();

                parent.removeChild(event.target.parentNode);
            }

        }, false);

        selectedItem = newFolderObj.object;

    }

    this.folderEvents = function (folderID, toggleButtonID, deleteButtonID, deleteFolderCallback) {

        var folderElem = document.getElementById(folderID);
        var toggleButtonElem = document.getElementById(toggleButtonID);
        var deleteButtonElem = document.getElementById(deleteButtonID);

        folderElem.addEventListener('click', function (event) {
            event.stopPropagation();
            selectedItem = event.target;
            self.getSelectedItemPath(selectedItem);
        });

        folderElem.addEventListener('dblclick', function (event) {
            self.folderNameChanged = true;
            self.createInputElementForaddFolder(event.target);
        });

        toggleButtonElem.addEventListener('click', function (event) {
            event.stopPropagation();
            event.target.nextSibling.classList.toggle('toggle');
            event.target.classList.toggle('closed');
        });

        toggleButtonElem.addEventListener('dblclick', function (event) {
            event.stopPropagation();
        });

        deleteButtonElem.addEventListener('click', function (event) {

            selectedItem = event.target.parentNode;

            if (confirm("This folder is deleting permanently!")) {

                event.stopPropagation();
                var delFolderPath = self.getSelectedItemPath(event.target.parentNode);
                self.deleteFolder(delFolderPath, function () { });

                deleteFolderCallback();

                event.target.parentNode.parentNode.removeChild(event.target.parentNode);

            }

        }, false);

    }

    this.saveNewFolder = function (folderNamePath, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/saveNewFolder.php", true);

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(folderNamePath);

    }

    this.renameFolder = function (oldName, newName, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/renameFolder.php", true);
        var namesObj = {
            oldname: oldName,
            newname: newName
        };

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {
                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);
                }
            }
        }

        xhttpPhp.send(JSON.stringify(namesObj));
    }

    this.deleteFolder = function (folderPath, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/deleteFolder.php", true);

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(folderPath);

    }
    // ---------- Create new folder section end ---------- //

    // ---------- Create new file section start ---------- //
    this.fileCreated = false;
    this.fileNameChanged = false;
    this.oldFileName = '';

    this.createInputElementForaddFile = function (parent, callback) {

        var editElement = new Element();
        editElement.create('input', misc.randomID('IDfolderEdit', 999999), '', parent);
        editElement.object.setAttribute('type', 'text');

        editElement.object.focus();
        editElement.object.value = editElement.object.parentNode.childNodes[0].data;
        //editElement.object.setSelectionRange( 0,  editElement.object.value.lenght - 3 ); 
        editElement.object.select();

        editElement.addEvent('click', function (event) {
            event.stopPropagation();
        });

        editElement.addEvent('dblclick', function (event) {
            event.stopPropagation();
        });

        var oldInputText = editElement.object.value;

        var pressEnter = false;
        editElement.addEvent('keydown', function (event) {
            if (event.keyCode == 13) {
                pressEnter = true;
                editElement.object.parentNode.removeChild(editElement.object);
            }
        });

        editElement.addEvent('focusout', function (event) {

            self.oldFileName = event.target.parentNode.childNodes[0].data;

            if (misc.checkChar(editElement.object.value) === false) {
                alert("Please only use standard alphanumerics");
                editElement.object.value = self.oldFileName;
            }

            if (oldInputText == editElement.object.value) { self.fileNameChanged = false; }

            if (editElement.object.value === '') {

                alert('File name is empty!');
                editElement.object.value = self.oldFileName;

            }

            else {

                selectedItem.childNodes[0].data = editElement.object.value;

                if (self.fileCreated) {

                    var newfolderPath = self.getSelectedItemPath(selectedItem);
                    self.saveNewFile(newfolderPath, '', function (res) {
                        selectedItem.childNodes[0].data = res;
                        callback(res);
                    });

                }

                if (self.fileNameChanged) {
                    var newfolderPath = self.getSelectedItemPath(selectedItem);
                    var ret = newfolderPath.replace(editElement.object.value, '');
                    self.renameFile(ret + self.oldFileName, ret + editElement.object.value, function (res) {
                        selectedItem.childNodes[0].data = res;
                        callback(res);
                    });
                }

            }

            self.fileCreated = false;
            self.fileNameChanged = false;

            if (pressEnter == false) {
                editElement.object.parentNode.removeChild(editElement.object);
            }
            pressEnter = false;

        }, false);

    }

    this.createFile1 = function (fileParent, fileName) {

        self.fileCreated = true;
        self.fileNameChanged = false;

        var newFileObj = new Element();
        newFileObj.create('li', misc.randomID('IDnewFile', 999999), 'fileIcon', fileParent.children[1]);
        newFileObj.setLabel(fileName);

        self.createInputElementForaddFile(newFileObj.object, function () {

        });

        // ---------- Get selected item ----------
        newFileObj.addEvent('click', function (event) {

            event.stopPropagation();
            selectedItem = event.target;

            for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
                document.getElementsByTagName('li')[i].classList.remove('active');
            }

            this.classList.add('active');

        });

        newFileObj.addEvent('dblclick', function (event) {
            
            self.fileNameChanged = true;
            self.createInputElementForaddFile(event.target, function (dat) {
                //updateTabName(dat);
            });


        });

        // ---------- Sub list item delete button ----------
        var deleteButton = Element();
        deleteButton.create('button', misc.randomID('IDdeleteButton', 999999), 'deleteButton', newFileObj.object);
        deleteButton.addEvent('click', function (event) {

            event.stopPropagation();
            selectedItem = event.target.parentNode;

            if (confirm("This file is deleting permanently!")) {

                var delFilePath = self.getSelectedItemPath(event.target.parentNode);
                self.deleteFile(delFilePath, function () { });

                fileParent.children[1].removeChild(newFileObj.object);
            }

        });

        // ---------- Hover item ----------
        newFileObj.addEvent('mouseover', function (event) {

            this.style.backgroundColor = '#444';
            this.style.color = '#00a8f3';
            this.style.borderRadius = '20px';

        });

        // ---------- mouse leave item ----------
        newFileObj.addEvent('mouseleave', function (event) {

            this.style.background = 'none';
            this.style.color = '#ccc';

        });

        selectedItem = newFileObj.object;

        return newFileObj.object;

    }

    this.createFile = function (fileParent, deleteTabCallback, updateTabName, actTab) {

        self.fileCreated = true;
        self.fileNameChanged = false;

        var newFileObj = new Element();
        newFileObj.create('li', misc.randomID('IDnewFile', 999999), 'fileIcon', fileParent.children[1]);
        newFileObj.setLabel(this.defaultFileName);
        self.createInputElementForaddFile(newFileObj.object, function (dat) {
            flNnChgn = true;
            updateTabName(dat);
            flNnChgn = false;
        });

        // ---------- Get selected item ----------
        newFileObj.addEvent('click', function (event) {
            console.log('click');

            event.stopPropagation();
            selectedItem = event.target;

            for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
                document.getElementsByTagName('li')[i].classList.remove('active');
            }

            this.classList.add('active');
            actTab();

        });

        newFileObj.addEvent('dblclick', function (event) {

            self.fileNameChanged = true;

            event.stopPropagation();

            self.createInputElementForaddFile(newFileObj.object, function (dat) {
                flNnChgn = false;
                updateTabName(dat);
            });

        });

        // ---------- Sub list item delete button ----------
        var deleteButton = Element();
        deleteButton.create('button', misc.randomID('IDdeleteButton', 999999), 'deleteButton', newFileObj.object);
        deleteButton.addEvent('click', function (event) {

            event.stopPropagation();
            selectedItem = event.target.parentNode;

            if (confirm("This file is deleting permanently!")) {

                var delFilePath = self.getSelectedItemPath(event.target.parentNode);
                self.deleteFile(delFilePath, function () { });

                deleteTabCallback();
                fileParent.children[1].removeChild(newFileObj.object);
            }

        });

        // ---------- Hover item ----------
        newFileObj.addEvent('mouseover', function (event) {

            this.style.backgroundColor = '#444';
            this.style.color = '#00a8f3';
            this.style.borderRadius = '20px';

        });

        // ---------- mouse leave item ----------
        newFileObj.addEvent('mouseleave', function (event) {

            this.style.background = 'none';
            this.style.color = '#ccc';

        });

        selectedItem = newFileObj.object;

        return newFileObj.object;

    }

    this.fileEvents = function (fileID, fileDeleteButtonID, deleteTabCallback, updateTabName, actTab) {

        var fileElem = document.getElementById(fileID);
        var deleteButtonElem = document.getElementById(fileDeleteButtonID);

        fileElem.addEventListener('dblclick', function (event) {
            event.stopPropagation();
            self.fileNameChanged = true;
            self.createInputElementForaddFile(event.target, function (dat) {
                updateTabName(dat);
            });
        });

        deleteButtonElem.addEventListener('click', function (event) {

            event.stopPropagation();
            selectedItem = event.target.parentNode;

            if (confirm("This file is deleting permanently!")) {

                var delFilePath = self.getSelectedItemPath(event.target.parentNode);
                self.deleteFile(delFilePath, function () { });

                deleteTabCallback();
                event.target.parentNode.parentNode.removeChild(event.target.parentNode);

            }

        }, false);

        // ---------- Get selected item ----------
        fileElem.addEventListener('click', function (event) {

            selectedItem = event.target;
            //event.stopPropagation();
            self.getSelectedItemPath(selectedItem);

            for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
                document.getElementsByTagName('li')[i].classList.remove('active');
            }

            this.classList.add('active');
            actTab();

        });

        // ---------- Hover item ----------
        fileElem.addEventListener('mouseover', function (event) {

            this.style.backgroundColor = '#444';
            this.style.color = '#00a8f3';
            this.style.borderRadius = '20px';

        });

        // ---------- mouse leave item ----------
        fileElem.addEventListener('mouseleave', function (event) {

            this.style.background = 'none';
            this.style.color = '#ccc';

        });
    }

    this.saveNewFile = function (fileNamePath, data, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/saveNewFile.php", true);
        var fileObj = {
            fileNamePath: fileNamePath,
            data: data
        };

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(JSON.stringify(fileObj));

    }

    this.deleteFile = function (filesPath, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/deleteFile.php", true);

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(filesPath);

    }

    this.renameFile = function (oldName, newName, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/renameFile.php", true);
        var namesObj = {
            oldname: oldName,
            newname: newName
        };

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(JSON.stringify(namesObj));

    }

    this.getSelectedItemPath = function (elem) {

        var pthS = '';
        var fullPath = '';
        var element = document.getElementById(elem.id);

        if (element.classList[0] == 'fileIcon' || element.classList[0] == 'folderIcon') {

            while (element.parentElement) {

                element = element.parentElement;
                if (element.classList != undefined) {
                    if (element.classList[0] == 'folderIcon') {
                        pthS = element.firstChild.data + '/' + pthS;
                        fullPath = pthS + elem.firstChild.data;
                    }
                    else if (element.classList[0] == 'fileManagerTree') {
                        fullPath = pthS + elem.firstChild.data;
                    }
                }

            }

            return fullPath;

        }

    }

    this.getAllItemPaths = function () {

        var lvLI = document.getElementById('IDroot').getElementsByTagName('li');
        var fullPathArr = [];

        for (var i = 0; i < lvLI.length; i++) {

            var pthS = '';
            var fullPath = '';
            var arr = [];

            var element = document.getElementById(lvLI[i].id);

            if (element.classList[0] == 'fileIcon') {

                while (element.parentNode) {

                    element = element.parentNode;
                    if (element.classList != undefined) {
                        if (element.classList[0] == 'folderIcon') {

                            pthS = element.firstChild.data + '/' + pthS;
                            fullPath = pthS + lvLI[i].firstChild.data;

                        }

                    }

                }
                arr.push(pthS, lvLI[i].firstChild.data, fullPath);
                fullPathArr.push(arr);

            }

        }

        return fullPathArr;

    }

    this.saveAllFiles = function (dir, fileNamePath, data, callback) {

        var xhttpPhp = new XMLHttpRequest();
        xhttpPhp.open("POST", "php/saveAllFiles.php", true);
        var fileObj = {
            dir: dir,
            fileNamePath: fileNamePath,
            data: data
        };

        xhttpPhp.onreadystatechange = function () {
            if (xhttpPhp.readyState === 4) {
                if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                    var fNameArr = xhttpPhp.responseText;
                    callback(fNameArr);

                }
            }
        }

        xhttpPhp.send(JSON.stringify(fileObj));

    }

    this.readProjectFile = function (fileName, callBack) {

        // Read html file
        var htmlFileObj = new XMLHttpRequest();
        htmlFileObj.open("GET", fileName, true);
        var htmlText = '';

        htmlFileObj.onreadystatechange = function () {
            if (htmlFileObj.readyState === 4) {
                if (htmlFileObj.status === 200 || htmlFileObj.status == 0) {

                    htmlText = htmlFileObj.responseText;
                    callBack(htmlText);

                }
            }
        }
        htmlFileObj.send(null);

    }

    return this;
    // ---------- Create new file section start ---------- //

}
/* ------ File manager treeview end ------ */