class Stack{
    constructor(){
        this._s = [];
        this._size = 0;
    }
    push(e){
        this._s.push(e);
        this._size++;
    }
    pop(){
        if(!this.isEmpity()){
            this._size--;
            return this._s.pop();
        }
    }
    get getSize(){
        return this._size;
    }
    isEmpity(){
        if(this._size == 0){
            return true;
        }
        return false;
    }
}