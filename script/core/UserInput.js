
    /*
    ##     ##  ######  ######## ########     #### ##    ## ########  ##     ## ######## 
    ##     ## ##    ## ##       ##     ##     ##  ###   ## ##     ## ##     ##    ##    
    ##     ## ##       ##       ##     ##     ##  ####  ## ##     ## ##     ##    ##    
    ##     ##  ######  ######   ########      ##  ## ## ## ########  ##     ##    ##    
    ##     ##       ## ##       ##   ##       ##  ##  #### ##        ##     ##    ##    
    ##     ## ##    ## ##       ##    ##      ##  ##   ### ##        ##     ##    ##    
     #######   ######  ######## ##     ##    #### ##    ## ##         #######     ##   
    */

     $(document).keydown(function(event) {
        
        if(playerCanMove == true && (event.key == "ArrowUp" || event.key == "w")){
            $(".rightKeys .keyUp").css("border-color", "red").css("color", "red");
            main.playerMoveUp();
            setTimeout(function (){
                $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowRight" || event.key == "d")){
            $(".rightKeys .keyRight").css("border-color", "red").css("color", "red");
            main.playerMoveRight();
            setTimeout(function (){
                $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");

        }

        if(playerCanMove == true && (event.key == "ArrowDown" || event.key == "s")){
            main.playerMoveDown();
            $(".rightKeys .keyDown").css("border-color", "red").css("color", "red");
            setTimeout(function (){
                $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
        }else{
            $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
        }

        if(playerCanMove == true && (event.key == "ArrowLeft" || event.key == "a")){
            main.playerMoveLeft();
            $(".rightKeys .keyLeft").css("border-color", "red").css("color", "red");
            setTimeout(function (){
            $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
                }, 1000)
        }else{
            $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
        }
        if(playerCanMove){
            main.playerWin();
        }
    });