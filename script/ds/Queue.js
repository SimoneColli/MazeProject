
class Queue{
    constructor(){
        this._q = {}
        this._head = 0;
        this._tail = 0;
    }

    //method to add an element after the tail
    enqueue(e){
        this._q[this._tail] = e;
        this._tail++;
    }
    //method to remove an element from the head
    dequeue(){
        const tmp = this._q[this._head];
        delete this._q[this._head];
        this._head++;
        return tmp;
    }

    //method to get the lenght of the queue
    get length(){
        return this._head-this._tail;
    }
    isEmpity(){
        return this._q.length === 0;
    }
}