/**
 * Implementation of a pairing heap.
 * The lowest value in any given heap will always be
 * pointed to by Heap::elem;
 * source: https://en.wikipedia.org/wiki/Pairing_heap
 */
class Heap<E> {
    elem: E;
    subheaps: Heap<E>[];
    constructor(elem: E = null, subheaps: Heap<E>[] = []) {
        this.elem = elem;
        this.subheaps = subheaps;
    }

    private setSize(size: number){

        return this;
    }

    isEmpty() { 
        return this.subheaps.length === 0 && (this.elem === null || this.elem === undefined); 
    }

    findMin() { 
        return this.isEmpty() ? null : this.elem; 
    }

    merge(other: Heap<E>) {
        if (this.isEmpty())
            return other;
        else if (other.isEmpty()) 
            return this;
        else if (this.elem.valueOf() < other.elem.valueOf()) 
            return new Heap(this.elem, this.subheaps.concat([other]));
        else
            return new Heap(other.elem, other.subheaps.concat([this]));
    }

    insert(elem: E) { 
        return this.merge(new Heap(elem, []))
    }
   
    deleteMin() { 
        return Heap.mergePairs(this.subheaps)
    }

    static mergePairs<E>(list: Heap<E>[]) {
        if (list.length === 0) 
            return new Heap();
        else if (list.length === 1)
            return list[0];
        else {
            let [a, b, ...tail] = list;
            return a.merge(b).merge(Heap.mergePairs(tail))
        }
    }
}