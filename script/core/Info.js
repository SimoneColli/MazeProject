loadInfoPage();
    $("#infoOpener").click();
    
    /* 
    #### ##    ## ########  #######   ######  
     ##  ###   ## ##       ##     ## ##    ## 
     ##  ####  ## ##       ##     ## ##       
     ##  ## ## ## ######   ##     ##  ######  
     ##  ##  #### ##       ##     ##       ## 
     ##  ##   ### ##       ##     ## ##    ## 
    #### ##    ## ##        #######   ######  
    */

    $(".closeButton").click(function(){
        $("body > *").removeClass("disableFromInteractions");
        $(".infoOnLoad").css("display", "none");
        $("#infoOpener").css("display", "flex");

        $("#infoOpener").css("transform", "scale(1.0)");

        $(".playerImg").css("display", "block");
        $(".robotImg").css("display", "block");
        $(".bacterialImg").css("display", "block");

        setTimeout(function(){
            $("#infoOpener").css("transform", "scale(1.1)");
            setTimeout(function(){
                $("#infoOpener").css("transform", "scale(1.0)");
            }, 500);
        }, 500);
        
        infoPageNumber = 0;
        loadInfoPage();
        if(!menuOpen)
            switchMenu();
    });

    $("#infoOpener").click(function(){
        if(generable){
            $("body > *").addClass("disableFromInteractions");
            $(".infoOnLoad").css("display", "flex");
            $(".infoOnLoad").removeClass("disableFromInteractions");
            $(".infoOnLoad *").removeClass("disableFromInteractions");
            $("#infoOpener").css("display", "none");
            $(".playerImg").css("display", "none");
            $(".robotImg").css("display", "none");
            $(".bacterialImg").css("display", "none");
            if(menuOpen){
                $(".menuMobile").click();
            }
        }
    });

    
    $(".infoNext").click(function(){

        infoPageNumber++;
        if(infoPageNumber > 3 -1){
            infoPageNumber = 0;
        }
        loadInfoPage();
    });
    $(".infoPrev").click(function(){

        infoPageNumber--;
        if(infoPageNumber < 0){
            infoPageNumber = 3 - 1;
        }
        loadInfoPage();
    });

    function loadInfoPage(){
        for(let i = 0; i < 3; i++){
            let tmpPage = ".page" + i;
            if(i == infoPageNumber){
                $(tmpPage).css("display", "flex");
            }else{
                $(tmpPage).css("display", "none");
            }
        }
    }
        