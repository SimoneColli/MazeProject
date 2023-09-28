
function playClick(num = 1){

    if(!mustGenerate){
        generable = false;
        playerCanMove = false;
        main.run(num);
        let toAdd = "";

        if(num == 2)
            toAdd = "2";
        
        
        mustGenerate = true;
        
        
        $("#infoOpener").css("display", "none");

        $("#playButton" + toAdd).removeClass("playButton").addClass("disableButton").addClass("disableButtonLeft");

        $(".outOfGame").css("display", "none");     
        $(".inGame").css("display", "flex");
        $(".rightKeys").css("display", "grid");

        if(hiddenMode)
            $(".terminal").css("display", "none").css("visibility", "hidden");
        else{
            $(".leftKeys").css("display", "none").css("visibility", "hidden");
        }

        $(".messageStartEnd").css("display", "flex").append('<h1 class="vsMessage">Computer AI<br>vs<br>Player</h1>');

        setTimeout(function(){
            $(".messageStartEnd").empty();
            $(".messageStartEnd").css("display", "none");
        }, 2000);
    }

}

function playButtonHover(hover = true, num = 1){
    let toAdd = "";
    if(num == 2)
        toAdd = "2";
    if(hover){
        if(mustGenerate){
            $("#generateButton" + toAdd).addClass("blueShadow");
            $("#vsButton").addClass("purpleShadow");
        }
        
    }else{
        $("#generateButton" + toAdd).removeClass("blueShadow");
        $("#vsButton").removeClass("purpleShadow");
        
    }
}

function generateClick(num = 1){

    if(generable){
        
        main = null;
        main = new Core();
        main.init(false, num);
        mustGenerate = false;

        if(num == 1){
            $("#playButton").removeClass("disableButton").removeClass("disableButtonLeft").addClass("playButton");
            $("#generateButton").addClass("disableButtonRight").addClass("disableButton").removeClass("generateButton");
            generable = false;
            setTimeout(() => {
                $("#generateButton").removeClass("disableButtonRight").removeClass("disableButton").addClass("generateButton");
                generable = true;
            }, 500);
        }
        
        if(num == 2){
            $("#playButton2").removeClass("disableButtonLeft").removeClass("disableBUtton").addClass("playButton");
            $("#generateButton2").addClass("disableButtonRight").addClass("disableButton").removeClass("generateButton");
            generable = false;
                setTimeout(() => {
                $("#generateButton2").removeClass("disableButtonRight").removeClass("disableButton").addClass("generateButton");
                generable = true;
            }, 500);
        }
    }
}




function switchMenu(){
    if(generable){
        if(menuOpen){
            menuOpen = false;
            $(".controls").css("display", "none");
            $("#tornaAlleModalita").click();
        }else{
            menuOpen = true;
            $(".controls").css("display", "flex");
        }
    }

}
// click su schermo
function moveUpClick(){
    // console.log("up");
    if(playerCanMove){
        $(".rightKeys .keyUp").css("border-color", "red").css("color", "red");
            main.playerMoveUp();
            setTimeout(function (){
                $(".rightKeys .keyUp").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveRightClick(){
    // console.log("right");
    if(playerCanMove){
        $(".rightKeys .keyRight").css("border-color", "red").css("color", "red");
            main.playerMoveRight();
            setTimeout(function (){
                $(".rightKeys .keyRight").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveDownClick(){
    // console.log("down");
    if(playerCanMove){
        $(".rightKeys .keyDown").css("border-color", "red").css("color", "red");
            main.playerMoveDown();
            setTimeout(function (){
                $(".rightKeys .keyDown").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}
function moveLeftClick(){
    // console.log("left");
    if(playerCanMove){
        $(".rightKeys .keyLeft").css("border-color", "red").css("color", "red");
            main.playerMoveLeft();

            setTimeout(function (){
                $(".rightKeys .keyLeft").css("border-color", "grey").css("color", "grey");
            }, 1000)
    }
}