var playerCanMove = false;
var hiddenMode = false;

var main;

var generable = true;

var mustGenerate = false;

var vsEnd = 0;

var infoPageNumber = 0;

var pcWin = false;
var playerWin = false;

var menuOpen = false;


class Core{
    constructor(devMode=false){
        this.mazeWidth = null;
        this.mazeHeight = null;
        this.maze = null;
        this.graph = null;
        this.graphExctractor = null;
        this.templateIterator = null;
        this.test = null;
        this.player = null;
        this.ai = null;
        this.terminal = new Terminal();
        this.hiddenModeResult = null;

        this.hiddenModePrevCell = [];
        this.hiddenModeFakeVisitedCell = [];

        this.devMode = devMode;
    }

    init(sfida, d = 1){
        
        
        if(this.devMode){

            this.mazeWidth = parseInt($("#dimTest").val()) + 2;
            this.mazeHeight = parseInt($("#dimTest").val()) + 2;
            this.maze = new Maze(this.mazeWidth, this.mazeHeight, ".maze");
            
            this.maze.init();
            
            this.test = new Test(this.maze, this.mazeWidth, this.mazeHeight);
            
            // se il test non va a buon fine lo riesegue finchè non viene trovato un labirinto corretto da mostrare
            let retry = this.test.test(String($("#vs1").val()), sfida)

            if(!retry){
                this.init(sfida);
            }

        }else{
            let dim = "#dim" + d;
            this.mazeWidth = parseInt($(dim).val()) + 2;
            this.mazeHeight = parseInt($(dim).val()) + 2;
    
            //create the maze
            this.maze = new Maze(this.mazeWidth, this.mazeHeight, ".maze");
            
            //extract the template
            this.templateIterator = new TemplateIterator((this.mazeHeight-2) + "x" + (this.mazeWidth-2));
            
            //load the maze from the template
            this.templateIterator.loadAtIndex(this.maze);
            if(hiddenMode){
                this.maze.hideAll();
            }

            //the following block extract the graph from the maze
            this.graphExctractor = new GraphExtractor(this.maze, this.mazeWidth, this.mazeHeight, false, 0);            
            this.graphExctractor.generateGraph(this.maze.getBeginY(), this.maze.getBeginX());
            this.graph = new Graph();
            this.graph = this.graphExctractor.getGraph;

            this.player = new Players(this.maze.getBeginX(), this.maze.getBeginY(), '<img src="./sources/player_davanti.png" class="playerImg" alt="">', ".userMaze .cell_" + this.maze.getBeginY() + "_" + this.maze.getBeginX());
            this.ai = new Players(this.maze.getBeginX(), this.maze.getBeginY(), '<img src="./sources/robot_fronte.png" class="robotImg" alt="">', ".AImaze .cell_" + this.maze.getBeginY() + "_" + this.maze.getBeginX());
            
            this.player.setPlayer();
            this.ai.setPlayer();
            
            this.player.zoomPosition(5);
            this.ai.zoomPosition(5);

            if(hiddenMode){
                this.ai.changeContent(
                    '<img src="./sources/batterio_fronte.png" class="bacterialImg" alt=""></img>'
                );
            }
        }
    }


    run(display=1){
        let algo = "#algoritm" + display;
        
        if(hiddenMode){
            this.ai.changeContent(
                '<img src="./sources/batterio_fronte.png" class="bacterialImg" alt=""></img>'
            );
            playerCanMove = true;

            let result;
            if (String($(algo).val()) == "aStarFaster") {
                result = this.graph.aStarFaster(this.maze.getStartCell(), this.maze.getEndCell());
                this.maze.showExit();
            } else if (String($(algo).val()) == "aStar") {
                result = this.graph.aStar(this.maze.getStartCell(), this.maze.getEndCell());
                this.maze.showExit();
            } else if (String($(algo).val()) == "dfs") {
                result = this.graph.dfs(this.maze.getStartCell(), this.maze.getEndCell());
            } else {
                result = this.graph.bfs(this.maze.getStartCell(), this.maze.getEndCell());
            }

            this.hiddenModeResult = result;
            this.maze.freeNearCell(this.maze.getStartCell());

        }else{

            let timers = [];
    
            if (this.mazeWidth - 2 <= 5 && this.mazeHeight - 2 <= 5) {
                timers.push(500);
                timers.push(75);
                timers.push(20);
                timers.push(750);
    
            } else if (this.mazeWidth - 2 <= 10 && this.mazeHeight - 2 <= 10) {
                timers.push(500);
                timers.push(75);
                timers.push(5);
                timers.push(500);
    
            } else if (this.mazeWidth - 2 <= 20 && this.mazeHeight - 2 <= 20) {
                timers.push(400);
                timers.push(75);
                timers.push(5);
                timers.push(500);
    
            } else if (this.mazeWidth - 2 <= 50 && this.mazeHeight - 2 <= 50) {
                timers.push(50);
                timers.push(50);
                timers.push(5);
                timers.push(500);
    
            } else if (this.mazeWidth - 2 <= 100 && this.mazeHeight - 2 <= 100) {
                timers.push(25);
                timers.push(25);
                timers.push(5);
                timers.push(500);
            }
    
            if (String($(algo).val()) == "aStarFaster") {
                let aStarResults = this.graph.aStarFaster(this.maze.getStartCell(), this.maze.getEndCell());
                this.ai.pathPrint(
                    aStarResults.sequenzaVisite,
                    aStarResults.percorso,
                    aStarResults.events,
                    true,
                    timers.slice()
                );
            } else if (String($(algo).val()) == "aStar") {
                let aStarResults = this.graph.aStar(this.maze.getStartCell(), this.maze.getEndCell());
                this.ai.pathPrint(
                    aStarResults.sequenzaVisite,
                    aStarResults.percorso,
                    aStarResults.events,
                    true,
                    timers.slice()
                );
            } else if (String($(algo).val()) == "dfs") {
                let dfsResults = this.graph.dfs(this.maze.getStartCell(), this.maze.getEndCell());
    
                this.ai.pathPrint(
                    dfsResults.sequenzaVisite,
                    dfsResults.percorso,
                    dfsResults.events,
                    true,
                    timers
                );
            } else {
                let bfsResults = this.graph.bfs(this.maze.getStartCell(), this.maze.getEndCell());
                this.ai.pathPrint(
                    bfsResults.sequenzaVisite,
                    bfsResults.percorso,
                    bfsResults.events,
                    true,
                    timers
                );
            }
        }
    }

    hiddenModeMove(newPlayerPos){
        
        this.maze.freeNearCell(newPlayerPos);
        
        // se le celle precedentemente visitate hanno un vicino rimangono, sennò vengono tolte
        
        for (let i = 0; i < this.hiddenModePrevCell.length; i++) {
            let neig = false;
            for (let j = 0; j < this.hiddenModeResult.sequenzaVisite.length; j++) {
                let tmp = this.hiddenModeResult.sequenzaVisite[j];
                if((
                    ((parseInt(tmp.split("_")[1]) - 1 == parseInt(this.hiddenModePrevCell[i].split("_")[1])) && (parseInt(tmp.split("_")[2]) == parseInt(this.hiddenModePrevCell[i].split("_")[2]))) //se è sopra
                    ||
                    ((parseInt(tmp.split("_")[1]) + 1 == parseInt(this.hiddenModePrevCell[i].split("_")[1])) && (parseInt(tmp.split("_")[2]) == parseInt(this.hiddenModePrevCell[i].split("_")[2]))) //se è sotto
                    ||
                    ((parseInt(tmp.split("_")[1]) == parseInt(this.hiddenModePrevCell[i].split("_")[1])) && (parseInt(tmp.split("_")[2]) - 1 == parseInt(this.hiddenModePrevCell[i].split("_")[2]))) //se è a sinistra
                    ||
                    ((parseInt(tmp.split("_")[1]) == parseInt(this.hiddenModePrevCell[i].split("_")[1])) && (parseInt(tmp.split("_")[2]) + 1 == parseInt(this.hiddenModePrevCell[i].split("_")[2]))) //se è a destra
                )){
                    neig = true;
                }
                
            }
            if(!neig){
                $(this.hiddenModePrevCell[i]).empty();
                this.hiddenModePrevCell[i].slice(i, 1);
            }
        }
        
        if(this.hiddenModeResult.sequenzaVisite.length == 0){
            $("#computerWin").click();
            playerCanMove = false;
            this.player.clearPos();
            this.player.setPlayer();
        }

        // prende la posizione attuale dell'ai
        let aiOldPos = this.ai.getPos();

        for (let i = 0; i < aiOldPos.length; i++) {
            aiOldPos[i] = parseInt(aiOldPos[i]);
        }

        // guarda se nei successivi posti da visitare ce ne sta uno vicino
        for (let i = 0; i < this.hiddenModeResult.sequenzaVisite.length; i++) {
            // console.log("inizio ciclo");
            let tmp = this.hiddenModeResult.sequenzaVisite[i];
            // console.log(tmp.split("_"));
            if(
                ((parseInt(tmp.split("_")[1]) - 1 == aiOldPos[0]) && (parseInt(tmp.split("_")[2]) == aiOldPos[1])) //se è sopra
                ||
                ((parseInt(tmp.split("_")[1]) + 1 == aiOldPos[0]) && (parseInt(tmp.split("_")[2]) == aiOldPos[1])) //se è sotto
                ||
                ((parseInt(tmp.split("_")[1]) == aiOldPos[0]) && (parseInt(tmp.split("_")[2]) - 1 == aiOldPos[1])) //se è a sinistra
                ||
                ((parseInt(tmp.split("_")[1]) == aiOldPos[0]) && (parseInt(tmp.split("_")[2]) + 1 == aiOldPos[1])) //se è a destra
            ){
                // se c'è un posto vicino
                this.hiddenModeFakeVisitedCell.push(tmp);
                this.ai.fakePos(".AImaze " + tmp);
                this.maze.freeNearCell(String(".AImaze " + tmp));
            }
        }
        
        let aiNewPos = this.hiddenModeResult.sequenzaVisite.shift();

        this.maze.freeNearCell(String(".AImaze " + aiNewPos));

        this.ai.moveInPos(String(".AImaze " + aiNewPos));
        this.hiddenModePrevCell.push(String(".AImaze " + aiNewPos));

        if(this.hiddenModeResult.sequenzaVisite.length == 0){
            $("#computerWin").click();
            playerCanMove = false;
            this.player.clearPos();
            this.player.setPlayer();
        }
    }
    showMaze(){
        this.maze.showAll();
    }
    stopAI(){
        this.ai.stopAI();
    }
    
    playerMoveUp(){
        this.player.moveUp();
        if(hiddenMode){
            this.hiddenModeMove(this.player.getCellPos());
        }
        this.playerWin();
    }
    
    playerMoveRight(){

        this.player.moveRight();
        if(hiddenMode){
            this.hiddenModeMove(this.player.getCellPos());
        }
        this.playerWin();

    }
    
    playerMoveDown(){

        this.player.moveDown();
        if(hiddenMode){
            this.hiddenModeMove(this.player.getCellPos());

        }
        this.playerWin();

    }
    
    playerMoveLeft(){

        this.player.moveLeft();
        if(hiddenMode){
            this.hiddenModeMove(this.player.getCellPos());
        }
        this.playerWin();

    }



    playerWin(){
        let end = this.maze.getEndCell().split("_");
        let posPlayer = this.player.getPos();
        
        if(parseInt(end[1]) == parseInt(posPlayer[0]) && parseInt(end[2]) == parseInt(posPlayer[1])){
            $("#playerWin").click();
        }
    }

    winAnimation(isPlayer){
        if(isPlayer)
        this.player.winAnimation();
        if(!isPlayer)
        this.ai.computerWinAnimation();
        
    }
    
}


function loadInfoPage(){
    for(let i = 0; i < 3; i++){
        let tmpPage = ".page" + i;
        if(i == infoPageNumber){
            $(tmpPage).css("display", "flex");
        }else{
            $(tmpPage).css("display", "none");
        }
    }
}




function playClick(num = 1){
    if(!mustGenerate){
        generable = false;

        main.run(num);
        let toAdd = "";
        if(num == 2)
            toAdd = "2";
        mustGenerate = true;
        $("#infoOpener").css("display", "none");

        $("#playButton" + toAdd).removeClass("playButton").addClass("disableButton").addClass("disableButtonLeft");

        $(".outOfGame").css("display", "none");     
        $(".inGame").css("display", "flex");
        $(".rightKeys").css("display", "grid");

        if(hiddenMode)
            $(".terminal").css("display", "none").css("visibility", "hidden");
        else{
            $(".leftKeys").css("display", "none").css("visibility", "hidden");
        }

        $(".messageStartEnd").css("display", "flex").append('<h1 class="vsMessage">Computer AI<br>vs<br>Player</h1>');
        setTimeout(function(){
            $(".messageStartEnd").empty();
            $(".messageStartEnd").css("display", "none");
        }, 2000);
    }
}
function playButtonHover(hover = true, num = 1){
    let toAdd = "";
    if(num == 2)
        toAdd = "2";
    if(hover){
        if(mustGenerate){
            $("#generateButton" + toAdd).addClass("blueShadow");
            $("#vsButton").addClass("purpleShadow");
        }
        
    }else{
        $("#generateButton" + toAdd).removeClass("blueShadow");
        $("#vsButton").removeClass("purpleShadow");
        
    }
}

function generateClick(num = 1){

    if(generable){
        main = null;
        main = new Core();
        main.init(false, num);
        mustGenerate = false;

        if(num == 1){
            $("#playButton").removeClass("disableButton").removeClass("disableButtonLeft").addClass("playButton");
            $("#generateButton").addClass("disableButtonRight").addClass("disableButton").removeClass("generateButton");
            generable = false;
            setTimeout(() => {
                $("#generateButton").removeClass("disableButtonRight").removeClass("disableButton").addClass("generateButton");
                generable = true;
            }, 500);
        }
        
        if(num == 2){
            $("#playButton2").removeClass("disableButtonLeft").removeClass("disableBUtton").addClass("playButton");
            $("#generateButton2").addClass("disableButtonRight").addClass("disableButton").removeClass("generateButton");
            generable = false;
                setTimeout(() => {
                $("#generateButton2").removeClass("disableButtonRight").removeClass("disableButton").addClass("generateButton");
                generable = true;
            }, 500);
        }
    }
}

function switchMenu(){
    if(generable){
        if(menuOpen){
            menuOpen = false;
            $(".controls").css("display", "none");
            $("#tornaAlleModalita").click();
        }else{
            menuOpen = true;
            $(".controls").css("display", "flex");
        }
    }

}

$(document).ready(function () {

    main = new Core();
    main.init(false);
    
    
    loadInfoPage();
    $("#infoOpener").click();
    
    /* 
    #### ##    ## ########  #######   ######  
     ##  ###   ## ##       ##     ## ##    ## 
     ##  ####  ## ##       ##     ## ##       
     ##  ## ## ## ######   ##     ##  ######  
     ##  ##  #### ##       ##     ##       ## 
     ##  ##   ### ##       ##     ## ##    ## 
    #### ##    ## ##        #######   ######  
    */

    $(".closeButton").click(function(){
        $("body > *").removeClass("disableFromInteractions");
        $(".infoOnLoad").css("display", "none");
        $("#infoOpener").css("display", "flex");

        $("#infoOpener").css("transform", "scale(1.0)");

        $(".playerImg").css("display", "block");
        $(".robotImg").css("display", "block");
        $(".bacterialImg").css("display", "block");

        setTimeout(function(){
            $("#infoOpener").css("transform", "scale(1.1)");
            setTimeout(function(){
                $("#infoOpener").css("transform", "scale(1.0)");
            }, 500);
        }, 500);
        
        infoPageNumber = 0;
        loadInfoPage();
        if(!menuOpen)
            switchMenu();
    });

    $("#infoOpener").click(function(){
        if(generable){
            $("body > *").addClass("disableFromInteractions");
            $(".infoOnLoad").css("display", "flex");
            $(".infoOnLoad").removeClass("disableFromInteractions");
            $(".infoOnLoad *").removeClass("disableFromInteractions");
            $("#infoOpener").css("display", "none");
            $(".playerImg").css("display", "none");
            $(".robotImg").css("display", "none");
            $(".bacterialImg").css("display", "none");
            if(menuOpen){
                $(".menuMobile").click();
            }
        }
    });

    
    $(".infoNext").click(function(){

        infoPageNumber++;
        if(infoPageNumber > 3 -1){
            infoPageNumber = 0;
        }
        loadInfoPage();
    });
    $(".infoPrev").click(function(){

        infoPageNumber--;
        if(infoPageNumber < 0){
            infoPageNumber = 3 - 1;
        }
        loadInfoPage();
    });

    

    /*
     ######  ##       ####  ######  ##    ##  ######  
    ##    ## ##        ##  ##    ## ##   ##  ##    ## 
    ##       ##        ##  ##       ##  ##   ##       
    ##       ##        ##  ##       #####     ######  
    ##       ##        ##  ##       ##  ##         ## 
    ##    ## ##        ##  ##    ## ##   ##  ##    ## 
     ######  ######## ####  ######  ##    ##  ###### 
    */

    // selezione modalità (interfaccia più pulita)
    $("#modalita_scoperta").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaNormale").css("display", "flex");
    });

    $("#modalita_coperta").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaNascosta").css("display", "flex");
        $("#switchMode").click();
    });

    $("#modalita_sfida").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaSfida").css("display", "flex");
    });


    // per tornare alla scelta della modalità
    
    $("#tornaAlleModalita").click(function(){
        $(".modalita").css("display", "none");
        $(".controlliScelti").css("display", "none");
        $(".switchModalita").css("display", "flex");
        if(hiddenMode){
            $("#switchMode").click();
        }
    });
    
    // rilevazione clic del tasto per la generazione del labirinto
    $("#generateButton").click(function() {
        generateClick();
    });
    $("#generateButton2").click(function() {
        generateClick(2);
    });

    // rilevazione clic del tasto play
    $("#playButton").click(function() {
        playClick();
    });
    $("#playButton2").click(function() {
        playClick(2);
    });
    
    // rilevazione click del tasto stop
    $("#stopButton").click(function() {
        generable = true;
        main.stopAI();
        mustGenerate = true;
        $(".inGame").css("display", "none");
        $(".outOfGame").css("display", "flex");
        $(".rightKeys").css("display", "none");
        $("#infoOpener").css("display", "flex");
        $(".leftKeys").css("display", "grid").css("visibility", "visible");
        $(".terminal").css("display", "flex").css("visibility", "visible");

        if(hiddenMode)
            main.showMaze();
        
    });
    
    // rilevazione click del tasto test
    $("#testButton").click(function(){
        hiddenMode = false;
        main = new Core(true);
        main.init(false);

        mustGenerate = true;
        generable = false;
    });

    // rilevazione click del tasto per la sfida
    $("#vsButton").click(function(){
        hiddenMode = false;
        $(".vsButton").css("display", "none");
        $(".reloadButton").css("display", "flex");

        main = new Core(true);
        main.init(true);
        
        $("#generateButton").removeClass("generateButton").addClass("disableButton");
        $("#playButton").removeClass("playButton").addClass("disableButton");
        $("#reloadButton").removeClass("reloadButton").addClass("disableButton");
        $("select").addClass("disableSelect").addClass("disableFromInteractions");
        $("#tornaAlleModalita").removeClass("tornaAlleModalita").addClass("disableButton");
        mustGenerate = false;
        generable = false;
    });
    
    // rileva chiusura risultati sfida
    $("#closeButtonAfterTest").click(function(){
        $(".afterTestInfo").css("display", "none");
        $("body > *").removeClass("disableFromInteractions");
    });

    $("#reloadButton").click(function(){
        if(vsEnd >= 2){
            mustGenerate = true;
            generable = true;
            vsEnd = 0;

            $("#vsButton").css("display", "flex");
            $("#reloadButton").css("display", "none");
            $("#generateButton").removeClass("disableButton").addClass("generateButton");

            $("select").removeClass("disableSelect").removeClass("disableFromInteractions");
            $("#tornaAlleModalita").removeClass("disableButton").addClass("tornaAlleModalita");
        
        }
    });

    
    // rileva movimento ai quindi possibilità movimento player
    $("#playerCanMove").click(function(){
        playerCanMove = true;
        $(".messageStartEnd").css("display", "flex").append('<h1 class="startMessage">Via</h1>');
        setTimeout(function(){
            $(".messageStartEnd").empty();
            $(".messageStartEnd").css("display", "none");
        }, 2000);
        
    });
    
    
    // rileva termine partita vittoria ai
    $("#computerWin").click(function(){
        pcWin = true;
        
        main.stopAI();
        playerCanMove = false;

        
        setTimeout(function(){
            let msg = "";
            if(playerWin)
                msg  += '<h1 class="drawMessage">Pareggio</h1>';
            else
                msg += '<h1 class="loseMessage">Hai perso...</h1>';

            $(".messageStartEnd").css("display", "flex").html(msg);
            setTimeout(function(){
                $(".messageStartEnd").empty();
                $(".messageStartEnd").css("display", "none");
                $("#stopButton").click();
                pcWin = false;
            }, 5000);
        }, 500);

        main.winAnimation(false);
        setTimeout(function(){
            if(hiddenMode){
                main.showMaze();
            }
        }, 4000);
    });

    // rileva termine partita vittoria player
    $("#playerWin").click(function(){
        playerWin = true;
        
        main.stopAI();
        playerCanMove = false;
        let msg = "";

        setTimeout(function(){
            if(pcWin)
                msg  += '<h1 class="drawMessage">Pareggio</h1>'
            else
                msg += '<h1 class="winMessage">Hai vinto</h1>'

            $(".messageStartEnd").css("display", "flex").html(msg);
            setTimeout(function(){
                $(".messageStartEnd").empty();
                $(".messageStartEnd").css("display", "none");
                $("#stopButton").click();
                playerWin = false;
            }, 5000);
        }, 500);
        
        main.winAnimation(true);
        setTimeout(function(){
            if(hiddenMode){
                main.showMaze();
            }
        }, 4000);
    });

    // rileva click fine modalità vs
    $("#vsEnd").click(function(){
        vsEnd++;
        if(vsEnd >= 2){
            generable = true;
            $("#reloadButton").removeClass("disableButton").addClass("reloadButton");
            $(".afterTestInfo").css("display", "flex");
            $("body > *").addClass("disableFromInteractions");
            $(".afterTestInfo").css("display", "flex");
            $(".afterTestInfo").removeClass("disableFromInteractions");
            $(".afterTestInfo *").removeClass("disableFromInteractions");
        }
    })

    
    // effetto hover su genera labirinto quando play è inquadrato ma non disponibile
    $("#playButton").hover(function(){
        playButtonHover(true, 1);
    },function(){
        playButtonHover(false, 1);
    });

    $("#playButton2").hover(function(){
        playButtonHover(true, 2);
    },function(){
        playButtonHover(false, 2);
    });


    
    $("#switchMode").click(function(){
        if(hiddenMode){
            hiddenMode = false;
            $("#generateButton").click();
        }else{
            hiddenMode = true;
            $("#generateButton2").click();
        }
    });


    $("#dim1").change(function(){
        $("#generateButton").click();
    });

    $("#dim2").change(function(){
        $("#generateButton2").click();
    });


    /*
    ##     ##  ######  ######## ########     #### ##    ## ########  ##     ## ######## 
    ##     ## ##    ## ##       ##     ##     ##  ###   ## ##     ## ##     ##    ##    
    ##     ## ##       ##       ##     ##     ##  ####  ## ##     ## ##     ##    ##    
    ##     ##  ######  ######   ########      ##  ## ## ## ########  ##     ##    ##    
    ##     ##       ## ##       ##   ##       ##  ##  #### ##        ##     ##    ##    
    ##     ## ##    ## ##       ##    ##      ##  ##   ### ##        ##     ##    ##    
     #######   ######  ######## ##     ##    #### ##    ## ##         #######     ##   
    */

    $(document).keydown(function(event) {
        
        if(playerCanMove == true && (event.key == "ArrowUp" || event.key == "w")){
            $(".rightKeys .keyUp").css("border-color", "red").css("color", "red");
            main.playerMoveUp();
            setTimeout(function (){
                $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowRight" || event.key == "d")){
            $(".rightKeys .keyRight").css("border-color", "red").css("color", "red");
            main.playerMoveRight();
            setTimeout(function (){
                $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");

        }

        if(playerCanMove == true && (event.key == "ArrowDown" || event.key == "s")){
            main.playerMoveDown();
            $(".rightKeys .keyDown").css("border-color", "red").css("color", "red");
            setTimeout(function (){
                $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowLeft" || event.key == "a")){
            main.playerMoveLeft();
            $(".rightKeys .keyLeft").css("border-color", "red").css("color", "red");
            setTimeout(function (){
            $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
                }, 1000)
        }else{
            $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
        }
        if(playerCanMove){
            main.playerWin();
        }
    });
});




// click su schermo
function moveUpClick(){
    console.log("up");
    if(playerCanMove){
        $(".rightKeys .keyUp").css("border-color", "red").css("color", "red");
            main.playerMoveUp();
            setTimeout(function (){
                $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveRightClick(){
    console.log("right");
    if(playerCanMove){
        $(".rightKeys .keyRight").css("border-color", "red").css("color", "red");
            main.playerMoveRight();
            setTimeout(function (){
                $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveDownClick(){
    console.log("down");
    if(playerCanMove){
        $(".rightKeys .keyDown").css("border-color", "red").css("color", "red");
            main.playerMoveDown();
            setTimeout(function (){
                $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveLeftClick(){
    console.log("left");
    if(playerCanMove){
        $(".rightKeys .keyLeft").css("border-color", "red").css("color", "red");
            main.playerMoveLeft();

            setTimeout(function (){
                $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}