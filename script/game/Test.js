class Test{
    constructor(maze, width, height){
        this._maze = maze;
        this._width = width;
        this._height = height;
    }
    
    test(typeOfSearch, sfida){

        var tmpMatrix = this._maze.getMatrix();

        var g = new Graph();
        
        
        var startCell = 1;
        var ge = new GraphExtractor(this._maze, this._width, this._height, false);
        
        if(tmpMatrix[1][startCell].infos["valid"]==undefined){
            return false;
        }
        while(tmpMatrix[1][startCell].infos["valid"] != 0){
            startCell++;
        }


        ge.generateGraph(startCell , 1);
        g = ge.getGraph;

        let maxHeight = -1;
        let startCellMaxHeight, endCellMaxHeight;

        for(let i = startCell; i < this._width - 1; i++){

            if(tmpMatrix[1][i].infos["valid"] == 0){

                for (let j = 1; j < this._width; j++) {
                    
                    if(tmpMatrix[this._height-2][j].infos["valid"] == 0){

                        let tmpStart = ".cell_1_" + i.toString();
                        let tmpEnd = ".cell_" + (this._height - 2).toString() + "_" + j.toString();


                        if (g.contains(tmpStart) && g.contains(tmpEnd)) {

                            let tmpHeight;
                            
                            tmpHeight = g.aStar(tmpStart, tmpEnd).profondita;

                            

                            if (tmpHeight > maxHeight) {
                                maxHeight = tmpHeight;
                                startCellMaxHeight = tmpStart;
                                endCellMaxHeight = tmpEnd;
                            }
                        }

                    }
                        
                }

            }
        }
        
        
        if(startCellMaxHeight != undefined && startCellMaxHeight != null){

            const strCell = startCellMaxHeight.split("_");
            const endCell = endCellMaxHeight.split("_");
            let strCellIntY = parseInt(strCell[1]);
            let strCellIntX = parseInt(strCell[2]);
    
            let endCellIntY = parseInt(endCell[1]);
            let endCellIntX = parseInt(endCell[2]);

            
    
            tmpMatrix[strCellIntY][strCellIntX].start = 1;

            tmpMatrix[endCellIntY][endCellIntX].end = 1;
    
            
            
            tmpMatrix[strCellIntY][strCellIntX].start = 0;
            
            tmpMatrix[endCellIntY][endCellIntX].end = 0;
            

            
            this._maze.beginCoords(strCellIntY, strCellIntX);
            this._maze.endCoords(endCellIntY, endCellIntX);
            
            if(sfida){
                let sf = new Sfida(this._maze, this._width, this._height, g);
                sf.sfida();
            }else{
                // console.log("no sfida");

                // per l'animazione
                let timers = [];
                if (this._width - 2 <= 20 && this._height - 2 <= 20) {
                    timers.push(150);
                    timers.push(50);
                    timers.push(10);
                } else if (this._width - 2 <= 50 && this._height - 2 <= 50) {
                    timers.push(10);
                    timers.push(10);
                    timers.push(10);

                } else if (this._width - 2 <= 100 && this._height - 2 <= 100) {
                    timers.push(10);
                    timers.push(10);
                    timers.push(5);
                }
                let ai = new Player(
                    strCellIntX,
                    strCellIntY,
                    ".maze"
                );

                if(typeOfSearch === "aStar"){
                    
                }else if(typeOfSearch === "dfs"){
                    let dfsResults = g.dfs(".cell_" + strCellIntY + "_" + strCellIntX, ".cell_" + endCellIntY + "_" + endCellIntX);

                    ai.pathPrint(
                        dfsResults.sequenzaVisite,
                        dfsResults.percorso,
                        [],
                        false,
                        timers
                    );
                }else{
                    let bfsResults = g.bfs(".cell_" + strCellIntY + "_" + strCellIntX, ".cell_" + endCellIntY + "_" + endCellIntX);

                    ai.pathPrint(
                        bfsResults.sequenzaVisite,
                        bfsResults.percorso,
                        [],
                        false,
                        timers
                    );
                    
                }
            }

            // se il test è andato a buon fine
            return true;
        }
            // se il test non è andato a buon fine

        return false;
    }

}