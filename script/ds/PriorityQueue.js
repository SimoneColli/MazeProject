
class Node{
    constructor(e, priority){
        this._value = e;
        this._priority = priority;
    }
    getVal(){
        return this._value;
    }
}
// last is bigger
class PriorityQueue{
    constructor(){
        this._nodes = [];
        this._size = 0;
    }
    enqueue(e, priority){

        let newNode = new Node(e, priority);
        let contains = false;

        for (let i = 0; i < this._nodes.length; i++) {
            if(priority > this._nodes[i]._priority){
                this._nodes.splice(i, 0 , newNode);
                contains = true;
                break;
            }
        }
        if (!contains) {
            this._nodes.push(newNode);
        }
        this._size++;
    }
    dequeue(){
        if(!this.isEmpity()){
            this._size--;
            return this._nodes.shift();
        }
    }
    // more priority
    first(){
        if(!this.isEmpity()){
            return this._nodes[0];
        }
    }
    // less priority
    last(){
        if(!this.isEmpity()){
            return this._nodes[this._size - 1];
        }
    }
    firstVal(){
        if(!this.isEmpity()){
            return this._nodes[0]._value;
        }
    }
    // less priority
    lastVal(){
        if(!this.isEmpity()){
            return this._nodes[this._size - 1]._value;
        }
    }
    getLastAndRemove(){
        if(!this.isEmpity()){
            this._size--;
            return this._nodes.pop()._value;
        }
    }
    getFirstAndRemove(){
        if(!this.isEmpity()){
            this._size--;
            return this._nodes.shift()._value;
        }
    }
    contains(value){
        for(let i = 0; i < this._nodes.length; i++){
            if(this._nodes[i].getVal() == value){
                return true;
            }
        }
        return false;
    }
    print(){
        console.log("coda:");
        for(let i = 0; i < this._nodes.length; i++){
            console.log(this._nodes[i]._value)
        }
    }
    
    isEmpity(){
        if(this._size == 0){
            return true;
        }
        return false;
    }
}