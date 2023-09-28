let loadedScripts = 0;
let toLoad = 0;

let freezeClic = true;

document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

let loadInterval;

let scripts = [
    "./script/ds/PriorityQueue.js",
    "./script/ds/Queue.js",
    "./script/ds/Stack.js",

    "./script/templates/TemplateIterator.js",
    
    "./script/other/Variables.js",    
    "./script/other/Utils.js",
    "./script/other/Terminal.js",
    
    "./script/maze/Cell.js",
    "./script/maze/Maze.js",

    "./script/graph/GraphExtractor.js",
    "./script/graph/Graph.js",

    "./script/player/Player.js",
    "./script/player/Computer.js",

    "./script/game/Sfida.js",
    "./script/game/Test.js",


    "./script/core/Core.js",
    "./script/core/ButtonsClick.js",
    "./script/core/UserInput.js",
    "./script/core/Info.js",
    "./script/core/Other.js",

];




function checkLoaded(){

    if(toLoad == loadedScripts){
        
        if(loadedScripts != 0)
            console.log("Script " + scripts[loadedScripts-1] + " caricato");

        if(scripts[toLoad] != null && scripts[toLoad] != undefined)
            $.getScript(scripts[toLoad], loadedScripts++);
        
        toLoad++;
    }
    if(loadedScripts >= scripts.length){
        console.log("script completly loaded");
        clearInterval(loadInterval);
        begin();
    }
}


function begin(){
    main = new Core();
    main.init(false);
    freezeClic = false;
}


$(document).ready(async function(){
    
    freezeClic = true;

    // scripts loading
    await new Promise(resolve => {
        
        // check every 500 ms if all script are loaded
        loadInterval = setInterval(checkLoaded, 50);

    });


});