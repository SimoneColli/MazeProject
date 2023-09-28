class Terminal{
    constructor(){
        this.id = ".terminal";
        this.empty();
        this.someSpaces();
    }
    write(text){
        
        $(this.id).append(
            '<code>'+ text +'</code>'
            );
            
    }
        
    someSpaces(){
        $(this.id).append(
            '<code></code><code></code>'
        );
    }
    empty(){
        $(this.id).empty();
    }
}
