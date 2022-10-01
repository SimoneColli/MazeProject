
class TemplateIterator{
    constructor(size){
        this._path = "./templates/" + size + ".json";
        
    }
    

    getAll(){
        $.getJSON(this._path, function(jd) {
            console.log(jd);
        });
    }

    loadAtIndex(maze){

        $.ajax({
            type: "get",
            url: this._path,
            async : false,
            dataType: "json",

            success: function (jd) {
                let index = Math.floor(Math.random() * (jd.length));

                const template = jd[index];

                maze.generate(template);
                let spiltCoords = template["begin"].split("-");
                maze.beginCoords(spiltCoords[0], spiltCoords[1])

                let spiltCoords2 = template["end"].split("-");
                maze.endCoords(spiltCoords2[0], spiltCoords2[1])
            }

        });

    }
    
}

// 
// 
// 
// 
// 
// 


class Terminal{
    constructor(){
        this.id = ".terminal";
        this.empty();
        this.someSpaces();
    }
    write(text){
        
        $(this.id).append(
            '<code>'+ text +'</code>'
            );
            
    }
        
    someSpaces(){
        $(this.id).append(
            '<code></code><code></code>'
        );
    }
    empty(){
        $(this.id).empty();
    }
}


// 
// 
// 
// 
// 
// 


class Queue{
    constructor(){
        this._q = {}
        this._head = 0;
        this._tail = 0;
    }

    //method to add an element after the tail
    enqueue(e){
        this._q[this._tail] = e;
        this._tail++;
    }
    //method to remove an element from the head
    dequeue(){
        const tmp = this._q[this._head];
        delete this._q[this._head];
        this._head++;
        return tmp;
    }

    //method to get the lenght of the queue
    get length(){
        return this._head-this._tail;
    }
    isEmpity(){
        return this._q.length === 0;
    }
}



// 
// 
// 
// 
// 
// 


class Node{
    constructor(e, priority){
        this._value = e;
        this._priority = priority;
    }
    getVal(){
        return this._value;
    }
}
class PriorityQueue{
    constructor(){
        this._nodes = [];
        this._size = 0;
    }
    enqueue(e, priority){

        let newNode = new Node(e, priority);
        let contains = false;

        for (let i = 0; i < this._nodes.length; i++) {
            if(priority > this._nodes[i]._priority){
                this._nodes.splice(i, 0 , newNode);
                contains = true;
                break;
            }
        }
        if (!contains) {
            this._nodes.push(newNode);
        }
        this._size++;
    }
    dequeue(){
        if(!this.isEmpity()){
            this._size--;
            return this._nodes.shift();
        }
    }
    // more priority
    first(){
        if(!this.isEmpity()){
            return this._nodes[0];
        }
    }
    // less priority
    last(){
        if(!this.isEmpity()){
            return this._nodes[this._size];
        }
    }
    getLastAndRemove(){
        if(!this.isEmpity()){
            this._size--;
            return this._nodes.pop()._value;
        }
    }
    contains(value){
        for(let i = 0; i < this._nodes.length; i++){
            if(this._nodes[i].getVal() == value){
                return true;
            }
        }
        return false;
    }
    print(){
        console.log("coda:");
        for(let i = 0; i < this._nodes.length; i++){
            console.log(this._nodes[i]._value)
        }
    }
    
    isEmpity(){
        if(this._size == 0){
            return true;
        }
        return false;
    }
}

// 
// 
// 
// 
// 
// 


class Stack{
    constructor(){
        this._s = [];
        this._size = 0;
    }
    push(e){
        this._s.push(e);
        this._size++;
    }
    pop(){
        if(!this.isEmpity()){
            this._size--;
            return this._s.pop();
        }
    }
    get getSize(){
        return this._size;
    }
    isEmpity(){
        if(this._size == 0){
            return true;
        }
        return false;
    }
}


// 
// 
// 
// 
// 
// 



class Cell{

    constructor(valid, visit, pos, isStart, isEnd){

        this.valid = valid;

        this.isVisit = visit;

        this.isStart = isStart;
        this.isEnd = isEnd;

        this.pos = pos;
        this.hiddenPlayer = false;
        this.hiddenComputer = false;
        this.created = false;
        this.setBorders();
    }
    
    get cellClass(){
        return this.pos;
    }
    get infos(){
        return {
            "valid" : this.valid,
            "visit" : this.isVisit
        };
    }
    get getId(){
        return this.pos;
    }
    set setVisit(n){
        this.isVisit = n;
    }
    addVisitator(){
        $(this.pos).append(
            '<div class="visitator"></div>'
        );
    }
    removeVisitator(){
        this.isVisit = 0;
        $(this.pos).empty();
    }
    
    
        
    set start(start){
        this.isStart = start;
        this.pathPoints();
    }
    set end(end){
        this.isEnd = end;
        this.pathPoints();
    }

    pathPoints(){
        if(this.isEnd == 1){
            $(this.pos).addClass("mazeEnd");
            if(this.hiddenComputer && this.hiddenPlayer){
                $(this.pos).removeClass("mazeEnd");
            }
        }
    }

    getCellObj(){
        return {
            "valid" : this.valid,
            "start":  this.isStart,
            "end":  this.isEnd
        };
    }

    setBorders(position = this.pos){
        let cell = $(position);
        $(position).empty();
        let target = $(position);

        if(this.hiddenPlayer && this.hiddenComputer){
            if(target.hasClass("flipped")){
                target.removeClass("flipped");
            }
            cell.append(
                '<img src="./sources/cloud.png" class="cloudImg" alt="">'
            );
        }else{
            if(this.valid != 0){
                
                if(this.valid == 2){
                    cell.append(
                        '<img src="./sources/superSassone.png" class="wallImg" alt="">'
                    );
                    
                    if(!this.created){
                        let rand = getRandomIntInclusive(0, 3);
                        if(rand == 2){
                            target.addClass("rotated");
                        }else if(rand == 3){
                            target.addClass("rotated").addClass("rotated");
                        }
                        this.created = true;
                    }
                    
                }else{
                    if(!this.created){
                        let rand = getRandomIntInclusive(0, 2);
                        if(rand == 2){
                            target.addClass("flipped");
                        }
                        this.created = true;
                    }
                    cell.append(
                        '<img src="./sources/bush.png" class="bushImg" alt="">'
                    );
                }
            }
        }
        
        this.pathPoints();
    }

    // for the hidden mode
    hideCell(){
        this.hiddenPlayer = true;
        this.hiddenComputer = true;
        this.setBorders();
    }

    showCell(){
        this.hiddenComputer = false;
        this.hiddenPlayer = false;
        this.setBorders();
    }

    showHiddenCell(position){
        if(this.hiddenComputer && position.includes(".AImaze")){
            this.hiddenComputer = false;
            this.setBorders(position);
        }else if(this.hiddenPlayer && position.includes(".userMaze")){
            this.hiddenPlayer = false;
            this.setBorders(position);
        }else{
            this.hiddenComputer = false;
            this.hiddenPlayer = false;
            this.setBorders(position);
        }
        
    }
}

function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// 
// 
// 
// 
// 
// 


class Maze{
    constructor(w, h, id){
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
            this.createRandomMazeMoreIntelligent();
        }else{
            this.createRandomMazeFromTemplate(template);
        }
    }
    
    empity(){
        $(this._MazeDiv).empty();
    }
    beginCoords(y, x){
        this._beginX = x;
        this._beginY = y;
    }
    
    endCoords(y, x){
        this._endX = x;
        this._endY = y;
    }

    getBeginX(){
        return this._beginX;
    }
    getBeginY(){
        return this._beginY;
    }
    

    getEndX(){
        return this._endX;
    }
    getEndY(){
        return this._endY;
    }

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

    getMatrix(){
        return this._mazeMatrix;
    }

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
    getStartCell(){
        return ".cell_" + this._beginY + "_" + this._beginX;
    }
    getEndCell(){
        return ".cell_" + this._endY + "_" + this._endX;
    }
    printMatrix(){
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                console.log(this._mazeMatrix[i][j]);
            }
        }
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
    showAll(){
        for (let i = 1; i < this._height - 1; i++) {
            for (let j = 1; j < this._width - 1; j++){
                this._mazeMatrix[i][j].showCell();
            }
        }
    }
    freeNearCell(pos){

        const cell = pos.split("_");
        let cellY = parseInt(cell[1]);
        let cellX = parseInt(cell[2]);
        
        this._mazeMatrix[cellY-1][cellX].showHiddenCell(String(cell[0] + "_" + (parseInt(cellY)-1) + "_" + cellX));
        this._mazeMatrix[cellY+1][cellX].showHiddenCell(String(cell[0] + "_" + (parseInt(cellY)+1) + "_" + cellX));
        this._mazeMatrix[cellY][cellX-1].showHiddenCell(String(cell[0] + "_" + cellY + "_" + (parseInt(cellX) - 1)));
        this._mazeMatrix[cellY][cellX+1].showHiddenCell(String(cell[0] + "_" + cellY + "_" + (parseInt(cellX) + 1)));
    }

    // gett maze obj to save it
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
    showExit(){
        this._mazeMatrix[this._endY][this._endX].showHiddenCell(String(".cell_" + parseInt(this._endY) + "_" + parseInt(this._endX)));
    }
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}
function generateRandomIntegerCheated(perc){
    
    let numbers = [];
    for (let i = 0; i < perc; i++) {
        numbers.push(1);
    }
    for (let i = 0; i < 100-perc; i++) {
        numbers.push(0);
    }
    return numbers[Math.floor(Math.random() * numbers.length)];
}





// 
// 
// 
// 
// 
// 

class GraphExtractor{
    constructor(maze, width, height, visitatorRemove=true, timeOut=0){
        this._maze = maze;
        this._graph = null;
        this._width = width;
        this._height = height;
        this._visitatorRemove = visitatorRemove;
        this._timeOut = timeOut;
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


// 
// 
// 
// 
// 
// 





class Graph {
    constructor(){
        this._nodes = {};
        this._dfsCheatStop = false;
        this._dfsCheatSteps = 0;
    }
    addNode(node){
        let color = false;
        const tmp  = Object.keys(this._nodes);
        tmp.forEach(tmpNode => {
            if(tmpNode == node){
                color = "grey";
            }
        });
        if(!color){
            this._nodes[node] = [];
        }
    }
    addArches(source, n2){
        if(!this._nodes[source] || !this._nodes[n2]){
            return false;
        }

        if(!this._nodes[source].includes(n2)){
            this._nodes[source].push(n2);
        }
        if(!this._nodes[n2].includes(source)){
            this._nodes[n2].push(source);
        }
        return "grey";
    }

    consoleLogNodes(){
        console.clear();
        console.log(this._nodes);
    }

    get getAdjList(){
        return this._nodes;
    }

    contains(node){
        let color = false;
        const tmp  = Object.keys(this._nodes);
        tmp.forEach(tmpNode => {
            if(tmpNode == node){
                color = "grey";
            }
        });
        return color;
    }
    
    // ########  ########  ######  
    // ##     ## ##       ##    ## 
    // ##     ## ##       ##       
    // ########  ######    ######  
    // ##     ## ##             ## 
    // ##     ## ##       ##    ## 
    // ########  ##        ###### 


    bfs(source, destination){

        
        //memorizza la sequenza di celle da visitare per l'animazione
		let visit = [];
        //memorizza la sequenza di comandi da stampare sul terminale
        let events = [];
        //crea la struttura dati di supporto
        const struttura = {};
        // numero di passi
        let steps = 0;

        const nodes = Object.keys(this._nodes);
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "color" : "white",
                "profondita" : Number.POSITIVE_INFINITY,
                "parent" : null
            }
        });
        
        struttura[source].color = "grey";
        struttura[source].profondita = 0;
            
        events.push('for each vertex u &#8712; G.V - {s}<br>&nbsp;&nbsp;u.color = WHITE<br>&nbsp;&nbsp;u.d = &infin;<br>&nbsp;&nbsp;u.&pi; = NIL<br>&nbsp;s.color = GRAY<br>&nbsp;s.d = 0<br>&nbsp;s.&pi; = NIL');
        
        let queue = new Queue();
        queue.enqueue(source);
        events.push('<br>Q = {}<br>&nbsp;enqueue(Q, s)');


        while(queue.length != 0){
            steps++;

            events.push('<br>&nbsp;&nbsp;u = dequeue(Q)<br>&nbsp;&nbsp;for each v &#8712; G.Adj[u] do:');

            let tmp = queue.dequeue();

            if(tmp != source){
                visit.push(tmp);
            }
            
            if(tmp == destination){
                break;
            }
            let adjList = this._nodes[tmp];

            for (let i = 0; i < adjList.length; i++) {
                let nd = adjList[i];

                if(struttura[nd].color == "white"){
                    events.push('<br>&nbsp;&nbsp;&nbsp;&nbsp;u.color = GRAY<br>&nbsp;&nbsp;&nbsp;&nbsp;u.d = u.d + 1<br>&nbsp;&nbsp;&nbsp;&nbsp;u.&pi; = u<br>&nbsp;&nbsp;&nbsp;&nbsp;enqueue(Q, v)');
                    struttura[nd].color = "grey";
                    struttura[nd].profondita = struttura[tmp].profondita + 1;
                    struttura[nd].parent = tmp;
                    queue.enqueue(nd);
                }
            }
            events.push('<br>&nbsp;&nbsp;u.color = BLACK');
            struttura[tmp].color = "black";
        }

        let path = [];
        let pathNode = destination;

        while(pathNode != null && pathNode != undefined){
            path.push(pathNode);
            pathNode = struttura[pathNode].parent;
        }

        return {
            "profondita" : struttura[destination].profondita,
            "percorso" : path,
			"sequenzaVisite" : visit,
            "events" : events,
            "steps" : steps
        };
    }

    // ########  ########  ######  
    // ##     ## ##       ##    ## 
    // ##     ## ##       ##       
    // ##     ## ######    ######  
    // ##     ## ##             ## 
    // ##     ## ##       ##    ## 
    // ########  ##        ###### 

    dfs(source, destination){

        this._dfsCheatSteps = 0;
        let events = [];
        let visit = [];

        // crea la struttura di supporto per i nodi
        let struttura = {};

        // inizializa i nodi
        const nodes = Object.keys(this._nodes);
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "color" : "white",
                "parent" : null
            }
        });
        events.push('for each vertex u &#8712; G.V - {s} do:<br>&nbsp;&nbspu.color = WHITE<br>&nbsp;&nbspuu.&pi; = NIL<br>&nbsp;&nbsp;steps = 0');
        
        events.push('<br>DFS-VISIT(G, u)');
        this.dfsVisit(source, struttura, visit, events, destination, source);

        let path = [];
        let pathNode = destination;

        let profondita = -1;
        while(pathNode != null && pathNode != undefined){
            profondita++;
            path.push(pathNode);
            pathNode = struttura[pathNode].parent;
        }

        return {
            "profondita" : profondita,
            "percorso" : path,
			"sequenzaVisite" : visit,
            "events" : events,
            "steps" : this._dfsCheatSteps
        };
    }

    dfsVisit(tmpNode, struttura, visit, events, destination, source){

        this._dfsCheatSteps++;

        if(tmpNode != source){
            visit.push(tmpNode);
        }

        
        if(tmpNode == destination){
            this._dfsCheatStop = true;
        }
        
        events.push('<br>u.colo = GREY<br>for each v &#8712; G.Adj[u] do:');
        
        struttura[tmpNode].color = "grey";

        let adjList = this._nodes[tmpNode];
        adjList.forEach((nd) => {
            if(this._dfsCheatStop){
                return;
            }
            if(struttura[nd].color == "white") {
                events.push('<br>&nbsp;&nbsp;for each v &#8712; G.Adj[u] do:<br>&nbsp;&nbsp;if v.color == WHITE then:<br>&nbsp;&nbsp;&nbsp;&nbsp;v.&pi; = u<br>&nbsp;&nbsp;&nbsp;&nbsp;DFS-VISIT(G, v)');
                struttura[nd].parent = tmpNode;
                this.dfsVisit(nd, struttura, visit, events, destination);
            }
            
        });
        events.push('<br>&nbsp;&nbsp;u.color = BLACK');
        struttura[tmpNode].color = "black";
        if(this._dfsCheatStop){
            return;
        }
    }

    dfsIterative(source, destination){

        console.log("dfs iterativa");

        let events = [];
        let visit = [];
        let steps = 0;

        let struttura = {};

        const nodes = Object.keys(this._nodes);
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "color" : "white",
                "parent" : null
            }
        });

        // crea stack per chiamate ricorsive
        let stack = new Stack();
        stack.push(source);

        while(!stack.isEmpity()){

            steps++;
            let tmpNode = stack.pop();
            
            if(tmpNode == destination){
                break;
            }

            if(struttura[tmpNode].color == "white"){
                if(tmpNode != source){
                    visit.push(tmpNode);
                }
                struttura[tmpNode].color = "grey";
            }

            // scorre la lista di adiacenza
            let adjList = this._nodes[tmpNode];
            adjList.forEach((nd)=>{
                if(struttura[nd].color == "white"){
                    struttura[nd].parent = tmpNode;
                    stack.push(nd);
                }
            });
            struttura[tmpNode].color = "black";
        }

        let path = [];
        let pathNode = destination;

        let profondita = 0;
        while(pathNode != null && pathNode != undefined){
            profondita++;
            path.push(pathNode);
            pathNode = struttura[pathNode].parent;
        }

        console.log(visit);
        console.log(profondita);
        return {
            "profondita" : profondita,
            "percorso" : path,
			"sequenzaVisite" : visit,
            "events" : events,
            "steps" : steps
        };
    }


    //    ###              
    //   ## ##    ##   ##  
    //  ##   ##    ## ##   
    // ##     ## ######### 
    // #########   ## ##   
    // ##     ##  ##   ##  
    // ##     ##           
    
    // garantisce il percorso più rapido
    aStar(source, destination){
        
        let steps = 0;
        let visit = [];
        let founded = false;
        let events = [];

        const struttura = {};
        const nodes = Object.keys(this._nodes);
        events.push("for each vertex u &#8712; G.V do:");
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "gScore" : Number.POSITIVE_INFINITY,//g
                "fScore" : Number.POSITIVE_INFINITY,//h
                "parent" : null
            };
        });
        events.push("<br>&nbsp;&nbsp;u.g_score = + &infin;<br>&nbsp;&nbsp;u.f_score = + &infin;<br>&nbsp;&nbsp;u.&pi; = NIL");


        struttura[source].gScore = this.aStarEuclidean(source, source);
        struttura[source].fScore  = this.aStarEuclidean(source, destination);
        events.push("s.g_score = 0<br>s.f_score = Euclidean-Distance(s, d)<br>open_list = PriorityQueue = {}");



        let openList = new PriorityQueue();
        let closedList = [];
        events.push("closed_list = List<br>open_list.enqueue(s, s.f_score)");
        
        openList.enqueue(source, struttura[source].fScore);

        events.push("while open_list &ne; {} do:")
        while(!openList.isEmpity()){
            steps++;
            let tmpNode = openList.getLastAndRemove();
            events.push("<br>&nbsp;&nbsp;current = open_list.dequeue_less_priority()")
            

            if (tmpNode != source) {
                
                visit.push(tmpNode);
            }

            if (tmpNode == destination) {
                events.push("<br>&nbsp;&nbsp;&nbsp;&nbsp;return PRINT-PATH(G, s, d)")
                founded = true;
                break;
            }

            closedList.push(tmpNode);
            events.push("<br>&nbsp;&nbsp;closed_list.push(current)")

            let adjList = this._nodes[tmpNode];

            events.push("<br>&nbsp;&nbsp;for each neighbor &#8712; G.Adj[u] do:<br>&nbsp;&nbsp;&nbsp;tentative_score = current.g_score + Euclidean-Distance(current, neighbor)<br>&nbsp;&nbsp;&nbsp;if tentative_score < neighbor.g_score:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.&pi; = current<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.g_score = tentative_score<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.f_score = tentative_score + Euclidean-Distance(neighbor, d)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in open_list and neighbor not in closed_list:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;open_list.enqueue(neighbor, neighbor.f_score)")

            for (let i = 0; i < adjList.length; i++) {

                let nd = adjList[i];
                
                let tentativeScore = struttura[tmpNode].gScore + this.aStarEuclidean(tmpNode, nd); //1 perche gli archi non sono pesati
    
                if (tentativeScore < struttura[nd].gScore) {
                    
                    struttura[nd].parent = tmpNode;
                    struttura[nd].gScore = tentativeScore;

                    struttura[nd].fScore = tentativeScore + this.aStarEuclidean(nd, destination);
                }

                if (!openList.contains(nd) && !closedList.includes(nd)) {
                    openList.enqueue(nd, struttura[nd].fScore);
                }
            }
            

        }

        
        let path = [];
        let pathNode = destination;

        let profondita = -1;
        while(pathNode != null && pathNode != undefined){
            path.push(pathNode);
            pathNode = struttura[pathNode].parent;
            profondita++;
        }

        return {
            "profondita" : profondita,
            "percorso" : path,
            "sequenzaVisite" : visit,
            "events" : events,
            "steps" : steps
        }
        
    }



    // non garantisce il percorso più rapido
    aStarFaster(source, destination){
        
        let steps = 0;
        let visit = [];
        let founded = false;
        let events = [];

        events.push("for each vertex u &#8712; G.V do:");
        const struttura = {};
        const nodes = Object.keys(this._nodes);
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "gScore" : Number.POSITIVE_INFINITY,//g
                "fScore" : Number.POSITIVE_INFINITY,//h
                "parent" : null
            };
        });
        events.push("<br>&nbsp;&nbsp;u.g_score = + &infin;<br>&nbsp;&nbsp;u.f_score = + &infin;<br>&nbsp;&nbsp;u.&pi; = NIL");

        struttura[source].gScore = 0;
        struttura[source].fScore  = this.aStarEuclidean(source, destination);
        events.push("s.g_score = 0<br>s.f_score = Euclidean-Distance(s, d)<br>open_list = PriorityQueue = {}");

        

        let openList = new PriorityQueue();
        let closedList = [];
        
        openList.enqueue(source, this.aStarEuclidean(source, destination));
        events.push("closed_list = List<br>open_list.enqueue(s, s.f_score)");


        events.push("while open_list &ne; {} do:")
        while(!openList.isEmpity()){

            steps++;
            let tmpNode = openList.getLastAndRemove();
            events.push("<br>&nbsp;&nbsp;current = open_list.dequeue_less_priority()")
            

            if (tmpNode != source) {
                visit.push(tmpNode);
            }

            if (tmpNode == destination) {
                events.push("<br>&nbsp;&nbsp;&nbsp;&nbsp;return PRINT-PATH(G, s, d)")
                founded = true;
                break;
            }

            closedList.push(tmpNode);
            events.push("<br>&nbsp;&nbsp;closed_list.push(current)")

            let adjList = this._nodes[tmpNode];

            events.push("<br>&nbsp;&nbsp;for each neighbor &#8712; G.Adj[u] do:<br>&nbsp;&nbsp;&nbsp;tentative_score = current.g_score + Euclidean-Distance(current, neighbor)<br>&nbsp;&nbsp;&nbsp;if tentative_score < neighbor.g_score:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.&pi; = current<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.g_score = tentative_score<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neighbor.f_score = tentative_score + Euclidean-Distance(neighbor, d)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neighbor not in open_list and neighbor not in closed_list:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;open_list.enqueue(neighbor, Euclidean-Distance(neighbor, d))")

            for (let i = 0; i < adjList.length; i++) {

                let nd = adjList[i];
                
                let tentativeScore = struttura[tmpNode].gScore + this.aStarEuclidean(tmpNode, nd);
    
                if (tentativeScore < struttura[nd].gScore) {
                    
                    struttura[nd].parent = tmpNode;
                    struttura[nd].gScore = tentativeScore;
                    struttura[nd].fScore = tentativeScore + this.aStarEuclidean(nd, destination);
                    
                }

                if (!openList.contains(nd) && !closedList.includes(nd)) {
                    openList.enqueue(nd, this.aStarEuclidean(nd, destination));
                }
            }
            
        }

        let path = [];
        let pathNode = destination;

        let profondita = -1;
        while(pathNode != null && pathNode != undefined){
            path.push(pathNode);
            pathNode = struttura[pathNode].parent;
            profondita++;
        }
        return {
            "profondita" : profondita,
            "percorso" : path,
            "sequenzaVisite" : visit,
            "events" : events,
            "steps" : steps
        }
        
    }

    aStarEuclidean(source, destination){
        const strCell = source.split("_");
        const endCell = destination.split("_");
        let strCellIntY = parseInt(strCell[1]);
        let strCellIntX = parseInt(strCell[2]);

        let endCellIntY = parseInt(endCell[1]);
        let endCellIntX = parseInt(endCell[2]);

        return Math.sqrt(Math.pow(endCellIntX - strCellIntX, 2) + Math.pow(endCellIntY - strCellIntY, 2));
    }
    
    aStarHeuristic(source, destination){
        const strCell = source.split("_");
        const endCell = destination.split("_");
        let strCellIntY = parseInt(strCell[1]);
        let strCellIntX = parseInt(strCell[2]);

        let endCellIntY = parseInt(endCell[1]);
        let endCellIntX = parseInt(endCell[2]);

        return Math.abs(strCellIntX-endCellIntX) + Math.abs(strCellIntY-endCellIntY);
    }
    
}




// 
// 
// 
// 
// 
// 

class Players{
    constructor(x, y, content, location){
        this._x = x;
        this._y = y;
        this.content = content;
        this.pos = location;
        this.timerRun = true;
        this.terminal = new Terminal();
    }
    
    stopAI(){
        this.timerRun = false;
    }
    zoomPosition(times){
        
        $(this.pos).addClass("scaleAnimationClass");
        setTimeout(() => {
            $(this.pos).removeClass("scaleAnimationClass");
        }, times * 1000)

    }
    pathPrint(sequence, path, events = [], walk = false, timers){
        
        let completePath = path.slice();
        
        var completeSequence = sequence.slice();
        var timer;
        var timer2;
        var timer3;
        
        
        let maze = this.pos.split(" ")[0];
        
        var func = () =>{
            let tmp = sequence.shift();

            if(tmp == undefined){
                clearInterval(timer);
                timer2 = setInterval(func2, timers.shift());

            }else if(this.timerRun == false){
                clearInterval(timer);
            }else{

                if(sequence.length > 0){
                    $(maze + " " + tmp).addClass("visiting");
                    $(maze + " " + tmp).load(location.href + " " + maze + " " + tmp + " > *");
                }
                if(events.length > 0){
                    
                    this.terminal.write(events.shift());

                    
                }
            }
        }
        //remove the star ting cell
        path.pop();

        var func2 = () =>{

            let tmp = path.pop();

            if (tmp == undefined){
                clearInterval(timer2);
                setTimeout( ()=>{
                    timer3 = setInterval(func3, timers.shift());
                }, 3000)
            }else if(this.timerRun == false){
                clearInterval(timer2);
            
            }else{
                if(path.length > 0){
                    $(maze + " " + tmp).addClass("path");
                    $(maze + " " + tmp).load(location.href + " " + maze + " " + tmp + " > *");
                }
            }
            
        }

        var func3 = () =>{

            let tmp = completeSequence.shift();

            if (tmp == undefined){
                clearInterval(timer3);
                if(walk){
                    $("#playerCanMove").click();
                    setTimeout(() => {
                        this.pathFollow(completePath, timers.shift());
                    }, 1000)
                }else{
                    $("#vsEnd").click();
                }

            }else if(this.timerRun == false){
                clearInterval(timer3);
            
            }else{
                $(maze + " " + tmp).removeClass("visiting");
                $(maze + " " + tmp).removeClass("path");
                $(maze + " " + tmp).load(location.href + " " + maze + " " + tmp + " > *");
            }
            
        }

        timer = setInterval(func, timers.shift());
        
    }
    clearPos(){
        $(this.pos).empty();
    }

    moveInPos(pos){

        let tmpNewPos = pos.split("_");
        let oldPos = this.pos.split("_");
        let timeOut = 250;
        
        $(pos).empty();

        if(tmpNewPos[1] > oldPos[1]){
            $(".leftKeys .keyDown").css("border-color", "red").css("color", "red");
            setTimeout(function (){
                $(".leftKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        if(tmpNewPos[1] < oldPos[1]){
            $(".leftKeys .keyUp").css("border-color", "red").css("color", "red");
            setTimeout(function (){
                $(".leftKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        if(tmpNewPos[2] > oldPos[2]){
            $(".leftKeys .keyRight").css("border-color", "red").css("color", "red");
            if(this.content.includes("dietro")){
                this.content = '<img src="./sources/batterio_verso_destra_dietro.png" class="bacterialImg" alt=""></img>'
            }else{
                this.content = '<img src="./sources/batterio_verso_destra_davanti.png" class="bacterialImg" alt=""></img>'
            }
            setTimeout(function (){
                $(".leftKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        
        if(tmpNewPos[2] < oldPos[2]){
            $(".leftKeys .keyLeft").css("border-color", "red").css("color", "red");
            if(this.content.includes("dietro")){
                this.content = '<img src="./sources/batterio_verso_destra_dietro.png" class="bacterialImg" alt=""></img>'
            }else{
                this.content = '<img src="./sources/batterio_verso_sinistra_davanti.png" class="bacterialImg" alt=""></img>'
            }
            setTimeout(function (){
                $(".leftKeys .keyLeft").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        this._x = tmpNewPos[2];
        this._y = tmpNewPos[1];
        this.pos = pos;
        this.setPlayer();
    }
    

    pathFollow(path, timeOut){
        
        var func = ()  => {
            let newPos = path.pop();
            
            if (newPos == undefined){
                
                $("#computerWin").click();

                clearInterval(timer);
                

            }else if(this.timerRun == false){
                clearInterval(timer);

            }else{
                
                let tmpNewPos = newPos.split("_");

                let oldPos = this.pos.split("_");
                $(this.pos).empty();


                if(tmpNewPos[1] > oldPos[1]){
                    $(".leftKeys .keyDown").css("border-color", "red").css("color", "red");
                    this.content = '<img src="./sources/robot_fronte.png" class="robotImg" alt=""></img>'
                    setTimeout(function (){
                        $(".leftKeys .keyDown").css("border-color", "grey").css("color", "grey");
                    }, timeOut)
                }
                if(tmpNewPos[1] < oldPos[1]){
                    $(".leftKeys .keyUp").css("border-color", "red").css("color", "red");
                    this.content = '<img src="./sources/robot_dietro.png" class="robotImg" alt=""></img>'
                    setTimeout(function (){
                        $(".leftKeys .keyUp").css("border-color", "grey").css("color", "grey");
                    }, timeOut)
                }
                if(tmpNewPos[2] > oldPos[2]){
                    $(".leftKeys .keyRight").css("border-color", "red").css("color", "red");
                    if(this.content.includes("dietro")){
                        this.content = '<img src="./sources/robot_verso_destra_dietro.png" class="robotImg" alt=""></img>'

                    }else{
                        this.content = '<img src="./sources/robot_verso_destra_davanti.png" class="robotImg" alt=""></img>'
                    }
                    setTimeout(function (){
                        $(".leftKeys .keyRight").css("border-color", "grey").css("color", "grey");
                    }, timeOut)
                }
                
                if(tmpNewPos[2] < oldPos[2]){
                    $(".leftKeys .keyLeft").css("border-color", "red").css("color", "red");
                    if(this.content.includes("dietro")){
                        this.content = '<img src="./sources/robot_verso_destra_dietro.png" class="robotImg" alt=""></img>'
                    }else{
                        this.content = '<img src="./sources/robot_verso_sinistra_davanti.png" class="robotImg" alt=""></img>'
                    }
                    setTimeout(function (){
                        $(".leftKeys .keyLeft").css("border-color", "grey").css("color", "grey");
                    }, timeOut)
                }

                let tmpPos = oldPos[0] + "_" + tmpNewPos[1] + "_" + tmpNewPos[2];

                this.pos = tmpPos;
                this.setPlayer();

            }
        }

        let timer = setInterval(func, timeOut);

    }

    fakePos(pos){

        let tmpNewPos = pos.split("_");
        let oldPos = this.pos.split("_");
        let timeOut = 250;
        
        $(pos).empty();

        if(tmpNewPos[1] > oldPos[1]){
            $(".leftKeys .keyDown").css("border-color", "red").css("color", "red");
            // this.content = '<img src="./sources/batterio_fronte.png" class="bacterialImg" alt=""></img>'
            setTimeout(function (){
                $(".leftKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        if(tmpNewPos[1] < oldPos[1]){
            $(".leftKeys .keyUp").css("border-color", "red").css("color", "red");
            // this.content = '<img src="./sources/batterio_dietro.png" class="bacterialImg" alt=""></img>'
            setTimeout(function (){
                $(".leftKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        if(tmpNewPos[2] > oldPos[2]){
            $(".leftKeys .keyRight").css("border-color", "red").css("color", "red");
            if(this.content.includes("dietro")){
                this.content = '<img src="./sources/batterio_verso_destra_dietro.png" class="bacterialImg" alt=""></img>'
            }else{
                this.content = '<img src="./sources/batterio_verso_destra_davanti.png" class="bacterialImg" alt=""></img>'
            }
            setTimeout(function (){
                $(".leftKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        
        if(tmpNewPos[2] < oldPos[2]){
            $(".leftKeys .keyLeft").css("border-color", "red").css("color", "red");
            if(this.content.includes("dietro")){
                this.content = '<img src="./sources/batterio_verso_sinistra_dietro.png" class="bacterialImg" alt=""></img>'
            }else{
                this.content = '<img src="./sources/batterio_verso_sinistra_davanti.png" class="bacterialImg" alt=""></img>'
            }
            setTimeout(function (){
                $(".leftKeys .keyLeft").css("border-color", "grey").css("color", "grey");
            }, timeOut)
        }
        $(pos).append(this.content);
    }

    setPlayer(){
        $(this.pos).append(this.content);
    }

    changeContent(content){
        this.content = content;
        this.clearPos();
        this.setPlayer();
    }

    moveUp(){
        let oldPos = this.pos.split("_");
        let newPos = oldPos[0] + "_" + (parseInt(oldPos[1]) - 1) + "_" + oldPos[2];
        
        
        if(!($(newPos).has(".bushImg").length || $(newPos).has(".wallImg").length)){
            $(this.pos).empty();
            this.pos = newPos;
            this.content = '<img src="./sources/player_dietro.png" class="playerImg" alt=""></img>';

            this.setPlayer();
            
            this._y--;
        }
        
    }

    moveRight(){
        let oldPos = this.pos.split("_");
        let newPos = oldPos[0] + "_" + oldPos[1] + "_" + (parseInt(oldPos[2]) + 1);
        
        
        if(!($(newPos).has(".bushImg").length || $(newPos).has(".wallImg").length || $(newPos).has(".cloudImg").length)){
            $(this.pos).empty();
            this.pos = newPos;
            this.content = '<img src="./sources/player_verso_destra_davanti.png" class="playerImg" alt=""></img>';


            this.setPlayer();
            
            this._x++;
        }
    }
    moveDown(){
        let oldPos = this.pos.split("_");
        let newPos = oldPos[0] + "_" + (parseInt(oldPos[1]) + 1) + "_" + oldPos[2];
        
        if(!($(newPos).has(".bushImg").length || $(newPos).has(".wallImg").length || $(newPos).has(".cloudImg").length)){
            $(this.pos).empty();
            this.pos = newPos;
            this.content = '<img src="./sources/player_davanti.png" class="playerImg" alt=""></img>';
            
            this.setPlayer();
            this._y++;
        }
    }

    moveLeft(){
        let oldPos = this.pos.split("_");
        let newPos = oldPos[0] + "_" + oldPos[1] + "_" + (parseInt(oldPos[2]) - 1);
        
        if(!($(newPos).has(".bushImg").length || $(newPos).has(".wallImg").length || $(newPos).has(".cloudImg").length)){
            $(this.pos).empty();
            this.pos = newPos;
            this.content = '<img src="./sources/player_verso_sinistra_davanti.png" class="playerImg" alt=""></img>';

            this.setPlayer();
            this._x--;
        }
    }

    // player animation
    winAnimation(){
        
        let state = 10;
        let winAnimation = setInterval(() => {
            if(state < 0)
                clearInterval(winAnimation);
            if(state % 2 == 0)
                this.content = '<img src="./sources/player_su.png" class="playerImg" alt=""></img>';
            else
                this.content = '<img src="./sources/player_davanti.png" class="playerImg" alt=""></img>';
            
                
            $(this.pos).empty();
            this.setPlayer();
            
            state--;

        }, 245);
    }

    // computer animation

    computerWinAnimation(){
        let state = 10;
        let c1, c2;

        if(this.content.includes("batterio")){
            c1 = '<img src="./sources/batterio_verso_destra_davanti.png" class="bacterialImg" alt=""></img>';
            c2 = '<img src="./sources/batterio_verso_sinistra_davanti.png" class="bacterialImg" alt=""></img>';
        }else{
            c1 = '<img src="./sources/robot_su.png" class="robotImg" alt=""></img>';
            c2 = '<img src="./sources/robot_giu.png" class="robotImg" alt=""></img>';
        }
        
        let winAnimationComputer = setInterval(() => {
            if(state < 0)
                clearInterval(winAnimationComputer);
            if(state % 2 == 0)
                this.content = c1;
            else{
                
                this.content = c2;
            }

            $(this.pos).empty();
            this.setPlayer();
            

            state--;

        }, 255);
    }
    
    getPos(){
        return [this._y, this._x];
    }
    getCellPos(){
        return this.pos;
    }
}


// 
// 
// 
// 
// 
// 

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
        
        let aiLeft = new Players(this._maze.getBeginX(), this._maze.getBeginY(), '<img src="./sources/robot_fronte.png" class="playerImg" alt="">', ".AImaze");
        let aiRight = new Players(this._maze.getBeginX(), this._maze.getBeginY(), '<img src="./sources/robot_fronte.png" class="playerImg" alt="">', ".userMaze");
        
        
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

// 
// 
// 
// 
// 
// 


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
        var ge = new GraphExtractor(this._maze, this._width, this._height, false, 0);
        
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
                console.log("no sfida");

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
                let ai = new Players(strCellIntX, strCellIntY, '<img src="../sources/robot.png" class="playerImg" alt="">', ".maze");
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


// 
// 
// 
// 
// 
// 


