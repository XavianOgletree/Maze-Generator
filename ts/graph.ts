class Graph {
    vertices: number[][];
    size: number;
    constructor (size) {
        this.size = size;
        this.vertices = new Array(size);
    }
    add (from: number, to: number, weight: number) {
        if (this.vertices[from])
            this.vertices[from][to] =  weight;
        else {
            this.vertices[from] = new Array(this.size);
            this.vertices[from][to] = weight;
        }
    }

    duplexe (a: number, b:number, weight: number) {
        this.add(a, b, weight);
        this.add(b, a, weight);
    }
}