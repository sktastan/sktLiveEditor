<!doctype html>
<html>
    <head>
        <meta charset="UTF8">
        <title>sktEditor</title>

        <!-- Code Mirror css  -->
        <link rel="stylesheet" type="text/css" href="css/codeMirror/codemirror.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/foldgutter.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/docs.css">
        <!-- Editor themes -->
        <!-- <link rel="stylesheet" type="text/css" href="css/codeMirror/monokai.css" /> -->
        <!-- <link rel="stylesheet" type="text/css" href="css/codeMirror/cobalt.css" />-->
        <link rel="stylesheet" type="text/css" href="css/codeMirror/material.css" /> 
        
        <link rel="stylesheet" type="text/css" href="css/preloader.css">
        <link rel="stylesheet" type="text/css" href="css/split.css" />
        <link rel="stylesheet" type="text/css" href="css/editor.css" />
        <link rel="stylesheet" type="text/css" href="css/tabs.css" />
        <link rel="stylesheet" type="text/css" href="css/iframe.css" />
        <link rel="stylesheet" type="text/css" href="css/fileManager.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="css/mainMenu.css" />       
    </head>
    <body> 

        <!--Preloader Section -->
        <div id="preloader">
            <div id="status">&nbsp;</div>
        </div>
     
        <!-- Main container -->
        <div class="splitContainer">
  
            <!-- Main menu section -->
            <div id="IDmainMenuContainer" class="mainMenuContainer">               
                <div id="IDmainMenuRightSide" class="mainMenuRightSide">
                    <nav id="IDsplitButtonContainer" class="splitButtonContainer"> 
                        <ul id="IDelemList" class="elementList">
                            <li id="IDprojectFullWidth" class="projectFullWidthIcon"></li>
                            <li id="IDcodeFullWidth" class="codeFullWidthIcon"></li>
                            <li id="IDliveFullWidth" class="liveFullWidthIcon"></li>
                            <li id="IDphpFullWidth" class="phpFullWidthIcon"></li>
                            <li id="IDcssFullWidth" class="cssFullWidthIcon"></li>
                            <li id="IDjsFullWidth" class="jsFullWidthIcon"></li>                        
                        </ul>  
                    </nav>
                    <nav id="IDliveContainer" class="liveContainer"></nav>
                </div>
                <div class="clear"></div>
            </div>

            <!-- Project section -->
            <div id="projectSection" class="split split-horizontal projectSection">

                <!-- Project split section -->
                <div id="projectSplit" class="split content"></div>

            </div>

            <!-- Code section -->
            <div id="codeSection" class="split split-horizontal">

                <!-- Backend code section -->
                <div id="phpSplit" class="split content"></div>

                <!-- Frontend css code section -->
                <div id="cssSplit" class="split content"></div>

                <!-- Frontend js code section -->
                <div id="jsSplit" class="split content"></div>

            </div>

            <!-- Live section -->
            <div id="liveSection" class="split split-horizontal"></div>

    </div>
        
        <script type="text/javascript" src="js/misc.js"></script>
        <script type="text/javascript" src="js/split.js"></script>
        <script type="text/javascript" src="js/editor.js"></script>
        <script type="text/javascript" src="js/tabs.js"></script>
        <script type="text/javascript" src="js/iframe.js"></script>
        <script type="text/javascript" src="js/fileManager.js"></script>
        <script type="text/javascript" src="js/run.js"></script>
        <script type="text/javascript" src="js/sktSplit.js"></script>
        <script type="text/javascript" src="js/domObject.js"></script>

        <script type="text/javascript" src="js/codeMirror/codemirror.js"></script>
        <script type="text/javascript" src="js/codeMirror/xml.js"></script>
        <script type="text/javascript" src="js/codeMirror/javascript.js"></script>
        <script type="text/javascript" src="js/codeMirror/htmlmixed.js"></script>
        <script type="text/javascript" src="js/codeMirror/css.js"></script>
        <script type="text/javascript" src="js/codeMirror/php.js"></script>
        <script type="text/javascript" src="js/codeMirror/sublime.js"></script>
        <script type="text/javascript" src="js/codeMirror/closebrackets.js"></script>
        <script type="text/javascript" src="js/codeMirror/closetag.js"></script>
        <script type="text/javascript" src="js/codeMirror/formatting.js"></script>
        <script type="text/javascript" src="js/codeMirror/matchbrackets.js"></script>
        <script type="text/javascript" src="js/codeMirror/clike.js"></script>

        <script type="text/javascript" src="js/codeMirror/fold/foldcode.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/foldgutter.js"></script> 
        <script type="text/javascript" src="js/codeMirror/fold/brace-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/xml-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/indent-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/markdown-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/comment-fold.js"></script>

        <script type="text/javascript" src="js/codeMirror/scroll/annotatescrollbar.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/matchesonscrollbar.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/searchcursor.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/match-highlighter.js"></script>
    </body>
</html> 