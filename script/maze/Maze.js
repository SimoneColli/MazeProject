
class Maze{

    constructor(w, h, id){
    
        // number of cell
        this._width = w;
        this._height = h;


        this._MazeDiv = id;

        this._mazeMatrix = new Array(h);
        for (let i = 0; i < h; i++) {
            this._mazeMatrix[i] = new Array(w);
        }
        
        this._beginX;
        this._beginY;

        this._endX;
        this._endY;
    }


    init(){
        this.drawMazeStructur();
        this.createRandomMazeMoreIntelligent();
    }
    
    generate(template){
        this.drawMazeStructur();
        if(template == undefined && template == null){
            // console.log("undefined");
            this.createRandomMazeMoreIntelligent();
        }else{
            // console.log("defined");
            this.createRandomMazeFromTemplate(template);
        }
    }



    // delete labirint from dom
    empity(){
        $(this._MazeDiv).empty();
    }

    // change begin coords
    beginCoords(y, x){
        this._beginX = x;
        this._beginY = y;
    }
    
    // change end coords
    endCoords(y, x){
        this._endX = x;
        this._endY = y;
    }

    // get begin x
    getBeginX(){
        return this._beginX;
    }
    // get begin y
    getBeginY(){
        return this._beginY;
    }
    
    // get end x
    getEndX(){
        return this._endX;
    }
    // get end y
    getEndY(){
        return this._endY;
    }


    // drow the structure
    drawMazeStructur(){
        this.empity();
        let tmp = $(this._MazeDiv);

        tmp.css("grid-template-columns", "repeat(" + this._height + ", 1fr)");
        tmp.css("grid-template-rows", "repeat(" + this._width + ", 1fr)");
        
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                tmp.append(
                    '<div class="cell cell_' + i + "_" + j + ' flexCenter"></div>'
                );
            }
        }
    }

    // return the maze matrix
    getMatrix(){
        return this._mazeMatrix;
    }

    // funcion to create random maze
    createRandomMaze(){
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++){
                
                var valid = generateRandomInteger(1);
                if(i === 0 || j === 0 || i === this._height -1 || j === this._width -1)
                    valid = 2
                this._mazeMatrix[i][j] = new Cell(valid, 0, ".cell_" + i + "_" + j, 0, 0);
                
            }
        }
    }


    // function to create random maze with probability
    createRandomMazeMoreIntelligent(){
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++){
                
                if(this._height > 60){
                    var valid = generateRandomIntegerCheated(28);
                }else{
                    var valid = generateRandomIntegerCheated(35);
                }

                
                
                if(i === 0 || j === 0 || i === this._height -1 || j === this._width -1){
                    valid = 2;
                }
                this._mazeMatrix[i][j] = new Cell(valid, 0, ".cell_" + i + "_" + j, 0, 0);
                
            }
        }
    }


    // load maze from template
    createRandomMazeFromTemplate(template){

        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++){

                if(i === 0 || j === 0 || i === this._height -1 || j === this._width -1){
                    this._mazeMatrix[i][j] = new Cell(2, 0, ".cell_" + i + "_" + j, 0, 0);
                }else{
                    const obj = template["i:"+i+"-j:"+j];
                    this._mazeMatrix[i][j] = new Cell(obj["valid"], 0, ".cell_" + i + "_" + j, obj["start"], obj["end"]);
                }
            }
        }
    }

    // get start cell id
    getStartCell(){
        return ".cell_" + this._beginY + "_" + this._beginX;
    }

    // get end cell id
    getEndCell(){
        return ".cell_" + this._endY + "_" + this._endX;
    }

    // print maze matrix
    printMatrix(){
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                console.log(this._mazeMatrix[i][j]);
            }
        }
    }
    
    // print maze matrix as value of cell class
    printMatrixValues(){
        let str = "";
        for(let i = 0; i < this._height; i++){
            for(let j = 0; j < this._width; j++){
                str = str + " " + this._mazeMatrix[i][j].getValid();
            }
            str += "\n";
        }
        console.log(str);
    }

    // for hidden mode
    hideAll(){

        for (let i = 1; i < this._height - 1; i++) {
            for (let j = 1; j < this._width - 1; j++){
                
                if(this._mazeMatrix[i][j].getId != this.getStartCell()){
                    this._mazeMatrix[i][j].hideCell();
                }
            }
        }
    }

    // show all maze cell 
    showAll(){
        for (let i = 1; i < this._height - 1; i++) {
            for (let j = 1; j < this._width - 1; j++){
                this._mazeMatrix[i][j].showCell();
            }
        }
    }


    // show near cell
    freeNearCell(pos){

        const cell = pos.split("_");
        let cellY = parseInt(cell[1]);
        let cellX = parseInt(cell[2]);
        
        this._mazeMatrix[cellY-1][cellX].showHiddenCell(String(cell[0] + "_" + (parseInt(cellY)-1) + "_" + cellX));
        this._mazeMatrix[cellY+1][cellX].showHiddenCell(String(cell[0] + "_" + (parseInt(cellY)+1) + "_" + cellX));
        this._mazeMatrix[cellY][cellX-1].showHiddenCell(String(cell[0] + "_" + cellY + "_" + (parseInt(cellX) - 1)));
        this._mazeMatrix[cellY][cellX+1].showHiddenCell(String(cell[0] + "_" + cellY + "_" + (parseInt(cellX) + 1)));
    }

    // get maze obj to save it
    getMazeObj(){
        var tmp = {};

        tmp["begin"] = "0-0";
        tmp["end"] = "0-0";
        for (let i = 1; i < this._height-1; i++) {
            for (let j = 1; j < this._width-1; j++) {
                
                tmp["i:" + i +"-j:" + j] = this._mazeMatrix[i][j].getCellObj();
                if(tmp["i:" + i +"-j:" + j].start != 0){
                    tmp["begin"] = i + "-" + j;
                }
                if(tmp["i:" + i +"-j:" + j].end != 0){
                    tmp["end"] = i + "-" + j;
                }
            }
        }
        const tmpObj = tmp;
        return tmpObj;
    }


    // show maze exit
    showExit(){
        this._mazeMatrix[this._endY][this._endX].showHiddenCell(String(".cell_" + parseInt(this._endY) + "_" + parseInt(this._endX)));
    }
}