/*
     ######  ##       ####  ######  ##    ##  ######  
    ##    ## ##        ##  ##    ## ##   ##  ##    ## 
    ##       ##        ##  ##       ##  ##   ##       
    ##       ##        ##  ##       #####     ######  
    ##       ##        ##  ##       ##  ##         ## 
    ##    ## ##        ##  ##    ## ##   ##  ##    ## 
     ######  ######## ####  ######  ##    ##  ###### 
    */

    // selezione modalità (interfaccia più pulita)
    $("#modalita_scoperta").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaNormale").css("display", "flex");
    });

    $("#modalita_coperta").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaNascosta").css("display", "flex");
        $("#switchMode").click();
    });

    $("#modalita_sfida").click(function(){
        $(".switchModalita").css("display", "none");
        $(".controlliScelti").css("display", "flex");
        $(".modalitaSfida").css("display", "flex");
    });


    // per tornare alla scelta della modalità
    
    $("#tornaAlleModalita").click(function(){
        $(".modalita").css("display", "none");
        $(".controlliScelti").css("display", "none");
        $(".switchModalita").css("display", "flex");
        if(hiddenMode){
            $("#switchMode").click();
        }
    });
    
    // rilevazione clic del tasto per la generazione del labirinto
    $("#generateButton").click(function() {
        generateClick();
    });
    $("#generateButton2").click(function() {
        generateClick(2);
    });

    // rilevazione clic del tasto play
    $("#playButton").click(function() {
        playClick();
    });
    $("#playButton2").click(function() {
        playClick(2);
    });
    
    // rilevazione click del tasto stop
    $("#stopButton").click(function() {
        generable = true;
        playerCanMove = false;
        main.stopAI();

        mustGenerate = true;
        $(".inGame").css("display", "none");
        $(".outOfGame").css("display", "flex");
        $(".rightKeys").css("display", "none");
        $("#infoOpener").css("display", "flex");
        $(".leftKeys").css("display", "grid").css("visibility", "visible");
        $(".terminal").css("display", "flex").css("visibility", "visible");

        if(hiddenMode)
            main.showMaze();
        
    });
    
    // rilevazione click del tasto test
    $("#testButton").click(function(){
        hiddenMode = false;
        main = new Core(true);
        main.init(false);

        mustGenerate = true;
        generable = false;
    });

    // rilevazione click del tasto per la sfida
    $("#vsButton").click(function(){
        hiddenMode = false;
        $(".vsButton").css("display", "none");
        $(".reloadButton").css("display", "flex");

        main = new Core(true);
        main.init(true);
        
        $("#generateButton").removeClass("generateButton").addClass("disableButton");
        $("#playButton").removeClass("playButton").addClass("disableButton");
        $("#reloadButton").removeClass("reloadButton").addClass("disableButton");
        $("select").addClass("disableSelect").addClass("disableFromInteractions");
        $("#tornaAlleModalita").removeClass("tornaAlleModalita").addClass("disableButton");
        mustGenerate = false;
        generable = false;
    });
    
    // rileva chiusura risultati sfida
    $("#closeButtonAfterTest").click(function(){
        $(".afterTestInfo").css("display", "none");
        $("body > *").removeClass("disableFromInteractions");
    });

    $("#reloadButton").click(function(){
        if(vsEnd >= 2){
            mustGenerate = true;
            generable = true;
            vsEnd = 0;

            $("#vsButton").css("display", "flex");
            $("#reloadButton").css("display", "none");
            $("#generateButton").removeClass("disableButton").addClass("generateButton");

            $("select").removeClass("disableSelect").removeClass("disableFromInteractions");
            $("#tornaAlleModalita").removeClass("disableButton").addClass("tornaAlleModalita");
        
        }
    });

    
    // rileva movimento ai quindi possibilità movimento player
    $("#playerCanMove").click(function(){
        playerCanMove = true;
        $(".messageStartEnd").css("display", "flex").append('<h1 class="startMessage">Via</h1>');
        setTimeout(function(){
            $(".messageStartEnd").empty();
            $(".messageStartEnd").css("display", "none");
        }, 2000);
        
    });
    
    
    // rileva termine partita vittoria ai
    $("#computerWin").click(function(){
        pcWin = true;
        
        main.stopAI();
        playerCanMove = false;

        
        setTimeout(function(){
            let msg = "";
            if(playerWin)
                msg  += '<h1 class="drawMessage">Pareggio</h1>';
            else
                msg += '<h1 class="loseMessage">Hai perso...</h1>';

            $(".messageStartEnd").css("display", "flex").html(msg);
            setTimeout(function(){
                $(".messageStartEnd").empty();
                $(".messageStartEnd").css("display", "none");
                $("#stopButton").click();
                pcWin = false;
            }, 5000);
        }, 500);

        main.winAnimation(false);
        setTimeout(function(){
            if(hiddenMode){
                main.showMaze();
            }
        }, 4000);
    });

    // rileva termine partita vittoria player
    $("#playerWin").click(function(){
        playerWin = true;
        
        main.stopAI();
        playerCanMove = false;
        let msg = "";

        setTimeout(function(){
            if(pcWin)
                msg  += '<h1 class="drawMessage">Pareggio</h1>'
            else
                msg += '<h1 class="winMessage">Hai vinto</h1>'

            $(".messageStartEnd").css("display", "flex").html(msg);
            setTimeout(function(){
                $(".messageStartEnd").empty();
                $(".messageStartEnd").css("display", "none");
                $("#stopButton").click();
                playerWin = false;
            }, 5000);
        }, 500);
        
        main.winAnimation(true);
        setTimeout(function(){
            if(hiddenMode){
                main.showMaze();
            }
        }, 4000);
    });

    // rileva click fine modalità vs
    $("#vsEnd").click(function(){
        vsEnd++;
        // console.log("vsend click");
        if(vsEnd >= 2){
            generable = true;
            $("#reloadButton").removeClass("disableButton").addClass("reloadButton");
            $("#reloadButton").click();
            $(".afterTestInfo").css("display", "flex");
            $("body > *").addClass("disableFromInteractions");
            $(".afterTestInfo").css("display", "flex");
            $(".afterTestInfo").removeClass("disableFromInteractions");
            $(".afterTestInfo *").removeClass("disableFromInteractions");
        }
    })

    
    // effetto hover su genera labirinto quando play è inquadrato ma non disponibile
    $("#playButton").hover(function(){
        playButtonHover(true, 1);
    },function(){
        playButtonHover(false, 1);
    });

    $("#playButton2").hover(function(){
        playButtonHover(true, 2);
    },function(){
        playButtonHover(false, 2);
    });


    
    $("#switchMode").click(function(){
        if(hiddenMode){
            hiddenMode = false;
            $("#generateButton").click();
        }else{
            hiddenMode = true;
            $("#generateButton2").click();
        }
    });


    $("#dim1").change(function(){
        $("#generateButton").click();
    });

    $("#dim2").change(function(){
        $("#generateButton2").click();
    });
    