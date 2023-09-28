
class TemplateIterator{
    constructor(size){
        this._pathNormal = "./templates/normal/" + size + ".json";
        this._pathHidden = "./templates/hidden/" + size + ".json";
        
    }
    

    getAll(){
        $.getJSON(this._path, function(jd) {
            console.log(jd);
        });
    }

    loadAtIndex(maze, hidden){
        
        let url;

        if(hidden)
            url = this._pathHidden;
        else
            url = this._pathNormal;


        $.ajax({
            type: "get",
            url: url,
            async : false,
            dataType: "json",

            success: function (jd) {
                console.log(jd.length);
                let index = Math.floor(Math.random() * (jd.length));
                console.log(index);
                const template = jd[index];

                console.log(template);
                
                maze.generate(template);
                
                let spiltCoords = template["begin"].split("-");
                maze.beginCoords(spiltCoords[0], spiltCoords[1])

                let spiltCoords2 = template["end"].split("-");
                maze.endCoords(spiltCoords2[0], spiltCoords2[1])
            }

        });

    }
    
}