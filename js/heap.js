class Heap {
    constructor(elem = null, subheaps = []) {
        this.elem = elem;
        this.subheaps = subheaps;
    }
    isEmpty() {
        return this.subheaps.length === 0 && this.elem === null;
    }
    findMin() {
        return this.isEmpty() ? null : this.elem;
    }
    merge(other) {
        if (this.isEmpty())
            return other;
        else if (other.isEmpty())
            return this;
        else if (this.elem.valueOf() < other.elem.valueOf())
            return new Heap(this.elem, this.subheaps.concat([other]));
        else
            return new Heap(other.elem, other.subheaps.concat([this]));
    }
    insert(elem) {
        return this.merge(new Heap(elem, []));
    }
    deleteMin() {
        return Heap.mergePairs(this.subheaps);
    }
    static mergePairs(list) {
        if (list.length === 0)
            return new Heap();
        else if (list.length === 1)
            return list[0];
        else {
            let [a, b, ...tail] = list;
            return a.merge(b).merge(Heap.mergePairs(tail));
        }
    }
}
