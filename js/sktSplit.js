/* 
   --------------------------------------------------------
                           Split section
   --------------------------------------------------------     
*/
class sktSplit {
    //------ Split constructor ------//
    constructor() {

        this.mainSplit;
        this.codeSplit;
        this.projectSplit;

        //------ Main sections ------//
        this.mainSplit = Split(['#projectSection', '#codeSection', '#liveSection'], {
            gutterSize: 6,
            cursor: 'col-resize',
            minSize: [0, 0, 0],
            sizes: [20, 50, 30]
        });

        //------ Project split section ------//
        this.projectSplit = Split(['#projectSplit'], {
            direction: 'vertical',
            cursor: 'row-resize',
            gutterSize: 6,
            minSize: [0],
            sizes: [100]
        });

        //------ Code split section ------//
        this.codeSplit = Split(['#phpSplit', '#cssSplit', '#jsSplit'], {
            direction: 'vertical',
            cursor: 'row-resize',
            gutterSize: 6,
            minSize: [0, 0, 0],
            sizes: [33.33, 33.33, 33.33]
        });

        //------ Events section start ------//
        this.projectSplitCollapse();
        this.liveSplitCollapse();
        this.projectFullWidth();
        this.codeFullWidth();
        this.liveFullWidth();
        this.phpFullWidth();
        this.jsFullWidth();
        this.cssFullWidth();
    }

    //------ Project section collapse click event ------//
    projectSplitCollapse() {
        let _this = this;
        let projectSplitClickState = 0;
        let projectSplit = document.getElementsByClassName("gutter")[0];
        projectSplit.addEventListener('dblclick', function () {
            if (projectSplitClickState == 0) {
                _this.mainSplit.collapse(0);
                projectSplitClickState = 1;
            } else {
                _this.mainSplit.setSizes([20, 50, 30]);
                //mainSplit.sizes[0] = 33.33;
                projectSplitClickState = 0;
            }
        });

        //this.projectFullWidth();
    }

    //------ Live code section collapse click event ------//
    liveSplitCollapse() {
        let _this = this;
        let liveSplitClickState = 0;
        let liveSplit = document.getElementsByClassName("gutter")[3];
        liveSplit.addEventListener('dblclick', function () {
            if (liveSplitClickState == 0) {
                _this.mainSplit.collapse(2);
                liveSplitClickState = 1;
            } else {
                _this.mainSplit.setSizes([20, 50, 30]);
                liveSplitClickState = 0;
            }
        });

        //this.liveFullWidth();        
    }

    //------ Project section full with click event ------//
    projectFullWidth() {
        let _this = this;
        let projectSplitClickState = 0;        

        const projectFullWidthObj = new domObject('IDprojectFullWidth');
        projectFullWidthObj.events({
            onclick: function () { 
                if (projectSplitClickState == 0) {
                    _this.mainSplit.setSizes([0, 49.10, 49.10]);
                    projectSplitClickState = 1;

                    this.codeSplitClickState = 0;
                    this.liveSplitClickState = 0;
                } else {
                    _this.mainSplit.setSizes([20, 50, 30]);
                    projectSplitClickState = 0;
                }                
            }
        });
    }

    //------ Code section full with click event ------//
    codeFullWidth() {
        let _this = this;
        let codeSplitClickState = 0;         

        const codeFullWidthObj = new domObject('IDcodeFullWidth');
        codeFullWidthObj.events({
            onclick: function () {
                if (codeSplitClickState == 0) { 
                    _this.mainSplit.setSizes([0, 99.40, 0]);
                    codeSplitClickState = 1;
                } else {
                    _this.mainSplit.setSizes([20, 50, 30]);
                    codeSplitClickState = 0;
                }
            }
        });
    }

    //------ Live section full with click event ------//
    liveFullWidth() {
        let _this = this; 
        let liveSplitClickState = 0;            

        const liveFullWidthObj = new domObject('IDliveFullWidth');
        liveFullWidthObj.events({
            onclick: function () {
                if (liveSplitClickState == 0) { 
                    _this.mainSplit.setSizes([0, 0, 99.40]);
                    liveSplitClickState = 1;
                } else {
                    _this.mainSplit.setSizes([20, 50, 30]);
                    liveSplitClickState = 0;
                }
            }
        });
    }

    //------ Php code section full height click event ------//
    phpFullWidth() {
        let _this = this;  
        let phpSplitClickState = 0;     

        const phpFullWidthObj = new domObject('IDphpFullWidth');
        phpFullWidthObj.events({
            onclick: function () {
                if (phpSplitClickState == 0) { 
                    _this.codeSplit.setSizes([99.10, 0, 0]);
                    phpSplitClickState = 1;                   
                    
                } else {
                    _this.codeSplit.setSizes([33.33, 33.33, 33.33]);
                    phpSplitClickState = 0;
                }
            }
        });
    }

    //------ Css code section full height click event ------//
    jsFullWidth() { 
        let _this = this; 
        let jsSplitClickState = 0;      

        const jsFullWidthObj = new domObject('IDjsFullWidth');
        jsFullWidthObj.events({
            onclick: function () {
                if (jsSplitClickState == 0) { 
                    _this.codeSplit.setSizes([0, 0, 99.10]);
                    jsSplitClickState = 1;                   
                    
                } else {
                    _this.codeSplit.setSizes([33.33, 33.33, 33.33]);
                    jsSplitClickState = 0;
                }
            }
        });
    }

    //------ Js code section full height click event ------//
    cssFullWidth() {
        let _this = this;  
        let cssSplitClickState = 0;     

        const cssFullWidthObj = new domObject('IDcssFullWidth');
        cssFullWidthObj.events({
            onclick: function () { 
                if (cssSplitClickState == 0) { 
                    _this.codeSplit.setSizes([0, 99.40, 0]);
                    cssSplitClickState = 1;                   
                    
                } else {
                    _this.codeSplit.setSizes([33.33, 33.33, 33.33]);
                    cssSplitClickState = 0;
                }
            }
        });
    }
}