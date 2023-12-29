class Node {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
} 

// enum for heaptype (use Symbols to ensure no duplication) https://www.sohamkamani.com/javascript/enums/ 
// freeze the object 
const HeapType = Object.freeze(
    {
        MinHeap: Symbol("min"),
        MaxHeap: Symbol("max")
    })

class Heap {
    constructor(type) {
        this.type = type,
        this.root = null
    }

    sort() {

    }

    peek() {
        return this.data[0]
    }
}

const testHeap = new Heap(HeapType.MaxHeap) // initialize max heap


console.log(heapSort(arr))