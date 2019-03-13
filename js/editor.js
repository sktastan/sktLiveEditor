/* 
    --------------------------------------------------------
                            Editor 
    --------------------------------------------------------     
*/
function getSelectedRange(editor) {
    return { from: editor.getCursor(true), to: editor.getCursor(false) };
}

function autoFormatSelection(editor) {
    var range = getSelectedRange(editor);
    editor.autoFormatRange(range.from, range.to);
}

function commentSelection(isComment, editor) {
    var range = getSelectedRange(editor);
    editor.commentRange(isComment, range.from, range.to);
}

var Editor = function (parent, editorMode, data) {

    let self = this;
    this.newEditor = null;

    // ---------- Create new editor ---------- //
    this.newEditor = CodeMirror(parent, {

        lineNumbers: true,
        //theme:"icecoder",
        // theme: "monokai",
        theme: "material",
        styleActiveLine: true,
        matchBrackets: true,
        // value: data,       
        // mode:  "application/x-httpd-php",
        mode: editorMode,
        tabMode: "shift",
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        indentUnit: 4,
        smartIndent: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        keyMap: 'sublime',
        lineWrapping: true,
        extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        autoRefresh: true,
        autofocus: true,
        //autoformat:true

    });

    CodeMirror.commands["selectAll"](this.newEditor);   

    // document.addEventListener('keydown', function (e) {

    //     if (e.ctrlKey == true && e.shiftKey == true && e.which == 70) {
    //         e.preventDefault();
    //         autoFormatSelection(self.newEditor);           
    //     }

    //     if (e.ctrlKey == true && e.which == 191) {
    //         e.preventDefault();            
    //         commentSelection(true, self.newEditor);
    //     }

    // });

    CodeMirror.commands["goLineEnd"](this.newEditor);

    this.newEditor.setValue(data);

    this.newEditor.setSize('100%', '100%');

    this.getAllEditorInstance = function () {
        var edIns = document.getElementsByClassName('CodeMirror');
        return edIns;
    }

    this.getEditorCount = function () {
        var edIns = document.getElementsByClassName('CodeMirror');
        return edIns.length;
    }

    this.getEditorInstance = function () {

        return this.newEditor;

    }

    this.getEditorValue = function () {

        return this.newEditor.getValue();

    }

    this.setEditorValue = function (data) {

        this.newEditor.setValue(data);

    }

    this.setTheme = function (theme) {

        this.newEditor.setOption('theme', theme);

    }

    this.refresh = function () {

        this.newEditor.refresh();
    }

    this.newEditor.refresh();

    return this;

}