
class Cell{

    
    constructor(valid, visit, pos, isStart, isEnd){

        /*
            valid can be:
            - 0 = empty
            - 1 = bush
            - 2 = wall
            + another number for teleport
        */

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

    // get valit value
    getValid(){
        return this.valid;
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

    // returns current cell as object
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

    // hide cell (hidden mode)
    hideCell(){
        this.hiddenPlayer = true;
        this.hiddenComputer = true;
        this.setBorders();
    }

    // show cell (hidden mode)
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
