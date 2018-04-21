class Edge {
    constructor(to, weight) {
        this.to = to;
        this.weight = weight;
    }
    valueOf() {
        return this.weight;
    }
}
class Graph {
    constructor(size) {
        this.size = size;
        this.vertices = new Array(size);
    }
    add(from, to, weight) {
        if (this.vertices[from])
            this.vertices[from][to] = weight;
        else {
            this.vertices[from] = new Array(this.size);
            this.vertices[from][to] = weight;
        }
    }
    duplexe(a, b, weight) {
        this.add(a, b, weight);
        this.add(b, a, weight);
    }
}
