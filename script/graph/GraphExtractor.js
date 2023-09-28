
class GraphExtractor{
    constructor(maze, width, height, visitatorRemove=true){
        this._maze = maze;
        this._graph = null;
        this._width = width;
        this._height = height;
        this._visitatorRemove = visitatorRemove;
        this._cells = [];
    }
    
    generateGraph(px, py){
        this._graph = new Graph();
        let tmpMatrix = this._maze.getMatrix();

        //estrae i nodi e gli archi
        this._cells.push([py ,px]);

        this.connectNeighbors(tmpMatrix, py, px);

        if(this._visitatorRemove){
            for (let i = 0; i < this._cells.length; i++) {
                let pop = this._cells[i];
                tmpMatrix[pop[0], pop[1]].removeVisitator;
                $(".visitator").remove();
            }
        }
        
    }

    get getGraph(){
        return this._graph;
    }
    
    connectNeighbors(cell, i, j){

        i = parseInt(i);
        j = parseInt(j);
        cell[i][j].setVisit = 1;
        this._cells.push([i ,j]);

        this._graph.addNode(cell[i][j].getId);
        
        if(cell[i-1][j].infos["valid"] === 0){
            
            //aggiunge il vicino come nodo
            this._graph.addNode(cell[i-1][j].getId);

            //aggiunge l'arco tra se stesso ed il vicino
            this._graph.addArches(cell[i][j].getId, cell[i-1][j].getId);

        }

        if(cell[i][j+1].infos["valid"] == 0){


            //aggiunge il vicino come nodo
            this._graph.addNode(cell[i][j+1].getId);
            
            //aggiunge l'arco tra se stesso ed il vicino
            this._graph.addArches(cell[i][j].getId, cell[i][j+1].getId);

        }

        if(cell[i+1][j].infos["valid"] === 0){
        
            
            //aggiunge il vicino come nodo
            this._graph.addNode(cell[i+1][j].getId);
            
            //aggiunge l'arco tra se stesso ed il vicino
            this._graph.addArches(cell[i][j].getId, cell[i+1][j].getId);

        }
        if(cell[i][j-1].infos["valid"] === 0){
            
            
            //aggiunge il vicino come nodo
            this._graph.addNode(cell[i][j-1].getId);
            
            //aggiunge l'arco tra se stesso ed il vicino
            this._graph.addArches(cell[i][j].getId, cell[i][j-1].getId);

            
        }
        if(cell[i-1][j].infos["valid"] == 0 &&  cell[i-1][j].infos["visit"] == 0){
            this.connectNeighbors(cell, i-1, j);
        }
        if(cell[i][j+1].infos["valid"] == 0 &&  cell[i][j+1].infos["visit"] == 0){
            this.connectNeighbors(cell, i, j+1);
        }
        if(cell[i+1][j].infos["valid"] == 0 &&  cell[i+1][j].infos["visit"] == 0){
            this.connectNeighbors(cell, i+1, j);
        }
        if(cell[i][j-1].infos["valid"] == 0 &&  cell[i][j-1].infos["visit"] == 0){
            this.connectNeighbors(cell, i, j-1);
        }

    }
}
