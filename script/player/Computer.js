class Computer{
    constructor(x, y, location){
        this._x = x;
        this._y = y;
        this.content = '<img src="./sources/robot_fronte.png" class="robotImg" alt="">';
        this.pos = location;
        this.timerRun = true;
        this.terminal = new Terminal();
    }
    
    // ok
    stopAI(){
        this.timerRun = false;
    }

    // ok
    zoomPosition(times){
        
        $(this.pos).addClass("scaleAnimationClass");
        setTimeout(() => {
            $(this.pos).removeClass("scaleAnimationClass");
        }, times * 1000)

    }
    
    // ok
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
                each++;
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

    //ok
    clearPos(){
        $(this.pos).empty();
    }

    // ok
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
    

    // ok
    moveInPosNormale(pos){

        let tmpNewPos = pos.split("_");
        let oldPos = this.pos.split("_");
        let timeOut = 250;
        
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
                this.content = '<img src="./sources/robot_verso_sinistra_dietro.png" class="robotImg" alt=""></img>'
            }else{
                this.content = '<img src="./sources/robot_verso_sinistra_davanti.png" class="robotImg" alt=""></img>'
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
    

    // ok
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

    // ok
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

    // ok
    setPlayer(){
        $(this.pos).append(this.content);
    }

    // ok
    changeContent(content){
        this.content = content;
        this.clearPos();
        this.setPlayer();
    }


    // computer animation

    // ok
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
    
    // ok
    getPos(){
        return [this._y, this._x];
    }

    pathSearch(sequence, path, events = [], walk = false, timers){
        
        
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
                }, 500)
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
}
