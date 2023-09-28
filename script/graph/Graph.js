
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
        // console.log(this._nodes);
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

        // console.log("source " + source + " destination " + destination);
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
        // console.log("source " + source + " destination " + destination);

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
        // console.log("source " + source + " destination " + destination);

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
        // console.log("source " + source + " destination " + destination);

        // console.log("dfs iterativa");

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

        // console.log(visit);
        // console.log(profondita);
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
        // console.log("source " + source + " destination " + destination);
        
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
        // console.log("source " + source + " destination " + destination);
        
        let steps = 0;
        let visit = [];
        let founded = false;
        let events = [];

        events.push("for each vertex u &#8712; G.V do:");
        const struttura = {};
        const nodes = Object.keys(this._nodes);
        // console.log(nodes);
        nodes.forEach(tmpNode => {
            struttura[tmpNode] = {
                "gScore" : Number.POSITIVE_INFINITY,//g
                "fScore" : Number.POSITIVE_INFINITY,//h
                "parent" : null
            };
        });
        // console.log(struttura);
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
            console.log(tmpNode);
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
                
                // console.log(nd + " " + this.aStarEuclidean(nd, destination));

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
