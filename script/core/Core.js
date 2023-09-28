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
        this.normalModePath = null;

        this.hiddenModePrevCell = [];
        this.hiddenModeFakeVisitedCell = [];

        this.devMode = devMode;
    }

    // init game
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

            const dim = "#dim" + d;
            this.mazeWidth = parseInt($(dim).val()) + 2;
            this.mazeHeight = parseInt($(dim).val()) + 2;
    
            //create the maze
            this.maze = new Maze(this.mazeWidth, this.mazeHeight, ".maze");
            
            //extract the template
            this.templateIterator = new TemplateIterator((this.mazeHeight-2) + "x" + (this.mazeWidth-2));

            
            //load the maze from the template
            this.templateIterator.loadAtIndex(this.maze, hiddenMode);
            // console.log("maze loaded");

            if(hiddenMode){
                this.maze.hideAll();
            }

            //the following block extract the graph from the maze
            this.graphExctractor = new GraphExtractor(this.maze, this.mazeWidth, this.mazeHeight, false);            
            this.graphExctractor.generateGraph(this.maze.getBeginX(), this.maze.getBeginY());

            this.graph = new Graph();
            this.graph = this.graphExctractor.getGraph;

            this.player = new Player(
                this.maze.getBeginX(),
                this.maze.getBeginY(),
                ".userMaze .cell_" + this.maze.getBeginY() + "_" + this.maze.getBeginX()
            );
            
            this.ai = new Computer(
                this.maze.getBeginX(),
                this.maze.getBeginY(),
                ".AImaze .cell_" + this.maze.getBeginY() + "_" + this.maze.getBeginX()
            );
            
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


    // start game
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
            this.normalModePath = [];
            let timers = [];
            
            let result;


    
            if (this.mazeWidth - 2 <= 5 && this.mazeHeight - 2 <= 5) {
                timers.push(300);
                timers.push(75);
                timers.push(20);
    
            } else if (this.mazeWidth - 2 <= 10 && this.mazeHeight - 2 <= 10) {
                timers.push(200);
                timers.push(75);
                timers.push(5);
    
            } else if (this.mazeWidth - 2 <= 20 && this.mazeHeight - 2 <= 20) {
                timers.push(100);
                timers.push(75);
                timers.push(5);
    
            } else if (this.mazeWidth - 2 <= 50 && this.mazeHeight - 2 <= 50) {
                timers.push(50);
                timers.push(50);
                timers.push(5);
    
            } else if (this.mazeWidth - 2 <= 100 && this.mazeHeight - 2 <= 100) {
                timers.push(25);
                timers.push(25);
                timers.push(5);
            }
    

            if (String($(algo).val()) == "aStarFaster") {
                let aStarResults = this.graph.aStarFaster(this.maze.getStartCell(), this.maze.getEndCell());
                result = JSON.parse(JSON.stringify(aStarResults.percorso));

                this.ai.pathSearch(
                    aStarResults.sequenzaVisite,
                    aStarResults.percorso,
                    aStarResults.events,
                    true,
                    timers.slice()
                );
                
            } else if (String($(algo).val()) == "aStar") {
                let aStarResults = this.graph.aStar(this.maze.getStartCell(), this.maze.getEndCell());
                result = JSON.parse(JSON.stringify(aStarResults.percorso));
                this.ai.pathSearch(
                    aStarResults.sequenzaVisite,
                    aStarResults.percorso,
                    aStarResults.events,
                    true,
                    timers.slice()
                );
            } else if (String($(algo).val()) == "dfs") {
                let dfsResults = this.graph.dfs(this.maze.getStartCell(), this.maze.getEndCell());
                result = JSON.parse(JSON.stringify(dfsResults.percorso));
    
                this.ai.pathSearch(
                    dfsResults.sequenzaVisite,
                    dfsResults.percorso,
                    dfsResults.events,
                    true,
                    timers
                );
            } else {
                let bfsResults = this.graph.bfs(this.maze.getStartCell(), this.maze.getEndCell());
                result = JSON.parse(JSON.stringify(bfsResults.percorso));
                this.ai.pathSearch(
                    bfsResults.sequenzaVisite,
                    bfsResults.percorso,
                    bfsResults.events,
                    true,
                    timers
                );
            }
            // rimuove la cella di partenza
            // console.log(result);
            this.normalModePath = result;
            this.normalModePath.pop();
    }
    }


    normalModeMove(){
        
        // console.log(this.normalModePath);

        // prende la posizione attuale dell'ai
        let aiOldPos = this.ai.getPos();

        for (let i = 0; i < aiOldPos.length; i++) {
            aiOldPos[i] = parseInt(aiOldPos[i]);
        }

        // ordine inverso, ultima cella in testa
        let aiNewPos = this.normalModePath.pop();


        this.ai.moveInPosNormale(String(".AImaze " + aiNewPos));

        if(this.normalModePath.length == 0){
            $("#computerWin").click();
            playerCanMove = false;
            this.player.clearPos();
            this.player.setPlayer();
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
        if(this.player.moveUp()){
            if(hiddenMode){
                this.hiddenModeMove(this.player.getCellPos());
            }else{
                this.normalModeMove();
            }
            this.playerWin();
        }
    }
    
    playerMoveRight(){

        if(this.player.moveRight()){
            if(hiddenMode){
                this.hiddenModeMove(this.player.getCellPos());
            }else{
                this.normalModeMove();
            }
            this.playerWin();
        }
    }
    
    playerMoveDown(){

        if(this.player.moveDown()){
            if(hiddenMode){
                this.hiddenModeMove(this.player.getCellPos());
            }else{
                this.normalModeMove();
            }
            this.playerWin();
        }
    }
    
    playerMoveLeft(){

        if(this.player.moveLeft()){
            if(hiddenMode){
                this.hiddenModeMove(this.player.getCellPos());
            }else{
                this.normalModeMove();
            }
            this.playerWin();
        }
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

