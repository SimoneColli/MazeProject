class Player{
    constructor(x, y, location){
        this._x = x;
        this._y = y;
        this.content = '<img src="./sources/player_davanti.png" class="playerImg" alt="">';
        this.pos = location;
        this.timerRun = true;
        this.terminal = new Terminal();
    }
    
    // ok
    zoomPosition(times){
        
        $(this.pos).addClass("scaleAnimationClass");
        setTimeout(() => {
            $(this.pos).removeClass("scaleAnimationClass");
        }, times * 1000)

    }

    clearPos(){
        $(this.pos).empty();
    }

    // ok
    setPlayer(){
        $(this.pos).append(this.content);
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
        }else
            return false;

        
        return true;
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
        }else
            return false;

        return true;
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
        
        }else
            return false;

        return true;
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
        }else
            return false;
    
        return true;
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

    getPos(){
        return [this._y, this._x];
    }
    getCellPos(){
        return this.pos;
    }
}
