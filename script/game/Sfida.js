
class Sfida{
    constructor(maze, width, height, graph){

        this._maze = maze;

        this._width = width;
        this._height = height;
        
        this._algo1 = String($("#vs1").val());
        this._algo2 = String($("#vs2").val());
        
        this._graph = graph;
    }

    sfida(){
        
        each = 0;
        let aiLeft = new Computer(
            this._maze.getBeginX(),
            this._maze.getBeginY(),
            ".AImaze"
            );
        
        let aiRight = new Computer(
            this._maze.getBeginX(),
            this._maze.getBeginY(),
            ".userMaze"
            );
        
        
        let timers = [];
        
        if(this._width-2 <= 5 && this._height-2 <= 5){
            timers.push(500);
            timers.push(50);
            timers.push(10);
            timers.push(150);
        
        }else if(this._width-2 <= 20 && this._height-2 <= 20){
            timers.push(200);
            timers.push(50);
            timers.push(10);
            timers.push(150);
        
        }else if(this._width-2 <= 50 && this._height-2 <= 50){
            timers.push(100);
            timers.push(50);
            timers.push(10);
            timers.push(150);
        
        }else if(this._width-2 <= 100 && this._height-2 <= 100){
            timers.push(50);
            timers.push(50);
            timers.push(10);
            timers.push(150);
        
        }
        
        let algos = [];
        
        if(this._algo1 === "aStarFaster"){
            algos.push("Faster A*");
        }else if(this._algo1 === "aStar"){
            algos.push("A*");
        }else if(this._algo1 === "dfs"){
            algos.push("DFS");
        }else{
            algos.push("BFS");
        }
        
        if(this._algo2 === "aStarFaster"){
            algos.push("Faster A*");
        }else if(this._algo2 === "aStar"){
            algos.push("A*");
        }else if(this._algo2 === "dfs"){
            algos.push("DFS");
        }else{
            algos.push("BFS");
        }

        
        // aggiunge i nomi degli algoritmi alla tabella
        $(".firstAlgoCellName p").html(algos[0]);
        $(".secondAlgoCellName p").html(algos[1]);

        $(".messageStartEnd").css("display", "flex").append('<h1 class="vsMessage">' + algos[0] + '<br>vs<br>' + algos[1] + '</h1>');
        setTimeout(function(){
            $(".messageStartEnd").empty();
            $(".messageStartEnd").css("display", "none");
        }, 2000);

        // if(this._algo1 === "aStarFasterPerc"){
        //     let aStarResults = this._graph.aStarFasterPerc(this._maze.getStartCell(), this._maze.getEndCell(), this._graph.aStarEuclidean(".cell_1_1", ".cell_" + this._height + "_" + this._width));

        //     aiLeft.pathPrint(
        //         aStarResults.sequenzaVisite,
        //         aStarResults.percorso,
        //         [],
        //         false,
        //         timers.slice()
        //     );
        //     $(".firstPath").html(aStarResults.profondita);
        //     $(".firstSteps").html(aStarResults.steps);

        // }else
        if(this._algo1 === "aStarFaster"){
            let aStarResults = this._graph.aStarFaster(this._maze.getStartCell(), this._maze.getEndCell());

            aiLeft.pathPrint(
                aStarResults.sequenzaVisite,
                aStarResults.percorso,
                [],
                false,
                timers.slice()
            );
            $(".firstPath").html(aStarResults.profondita);
            $(".firstSteps").html(aStarResults.steps);

        }else if(this._algo1 === "aStar"){

            let aStarResults = this._graph.aStar(this._maze.getStartCell(), this._maze.getEndCell());
            aiLeft.pathPrint(
                aStarResults.sequenzaVisite,
                aStarResults.percorso,
                [],
                false,
                timers.slice()
            );
            $(".firstPath").html(aStarResults.profondita);
            $(".firstSteps").html(aStarResults.steps);

        }else if(this._algo1 === "dfs"){
            let dfsResults = this._graph.dfs(this._maze.getStartCell(), this._maze.getEndCell());

            aiLeft.pathPrint(
                dfsResults.sequenzaVisite,
                dfsResults.percorso,
                [],
                false,
                timers.slice()
            );

            $(".firstPath").html(dfsResults.profondita);
            $(".firstSteps").html(dfsResults.steps);

        }else{
            let bfsResults = this._graph.bfs(this._maze.getStartCell(), this._maze.getEndCell());

            aiLeft.pathPrint(
                bfsResults.sequenzaVisite,
                bfsResults.percorso,
                [],
                false,
                timers.slice()
            );
            $(".firstPath").html(bfsResults.profondita);
            $(".firstSteps").html(bfsResults.steps);

        }

        // if(this._algo2 === "aStarFasterPerc"){
        //     let aStarResults = this._graph.aStarFasterPerc(this._maze.getStartCell(), this._maze.getEndCell(), this._graph.aStarEuclidean(".cell_1_1", ".cell_" + this._height + "_" + this._width));

        //     aiRight.pathPrint(
        //         aStarResults.sequenzaVisite,
        //         aStarResults.percorso,
        //         [],
        //         false,
        //         timers.slice()
        //     );
        //     $(".secondPath").html(aStarResults.profondita);
        //     $(".secondSteps").html(aStarResults.steps);

        // }else
        if(this._algo2 === "aStarFaster"){

            let aStarResults = this._graph.aStarFaster(this._maze.getStartCell(), this._maze.getEndCell());//(this._maze.getStartCell(), this._maze.getEndCell());

            aiRight.pathPrint(
                aStarResults.sequenzaVisite,
                aStarResults.percorso,
                [],
                false,
                timers.slice()
            );
            
            $(".secondPath").html(aStarResults.profondita);
            $(".secondSteps").html(aStarResults.steps);

        }else if(this._algo2 === "aStar"){

            let aStarResults = this._graph.aStar(this._maze.getStartCell(), this._maze.getEndCell());

            aiRight.pathPrint(
                aStarResults.sequenzaVisite,
                aStarResults.percorso,
                [],
                false,
                timers.slice()
            );
            
            $(".secondPath").html(aStarResults.profondita);
            $(".secondSteps").html(aStarResults.steps);

        }else if(this._algo2 === "dfs"){
            let dfsResults = this._graph.dfs(this._maze.getStartCell(), this._maze.getEndCell());

            aiRight.pathPrint(
                dfsResults.sequenzaVisite,
                dfsResults.percorso,
                [],
                false,
                timers.slice()
            );
            $(".secondPath").html(dfsResults.profondita);
            $(".secondSteps").html(dfsResults.steps);
            

        }else{
            let bfsResults = this._graph.bfs(this._maze.getStartCell(), this._maze.getEndCell());

            aiRight.pathPrint(
                bfsResults.sequenzaVisite,
                bfsResults.percorso,
                [],
                false,
                timers.slice()
            );
            $(".secondPath").html(bfsResults.profondita);
            $(".secondSteps").html(bfsResults.steps);

        }

    }
}