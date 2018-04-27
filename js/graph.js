class Graph {
    constructor(size) {
        this.size = size;
        this.vertices = new Array(size);
        for (let i = 0; i < this.size; i++)
            this.vertices[i] = new Array(size);
    }
    add(from, to, weight) {
        this.vertices[from][to] = weight;
    }
    duplexe(a, b, weight) {
        this.add(a, b, weight);
        this.add(b, a, weight);
    }
    static random(width, height) {
        let size = height * width;
        let graph = new Graph(size);
        for (let vertex = 0; vertex < size; vertex++) {
            graph.add(vertex, vertex, 0);
            // Convert the vertex number into a 2d-position.
            let x = vertex % width;
            let y = Math.floor(vertex / width);
            // Then use it to calculate the vertex number
            // of it's right, left, down, and up neighbors
            if (x + 1 < width && x - 1 >= 0) {
                graph.duplexe(vertex, y * width + x + 1, Math.random() * 100 + 1);
                graph.duplexe(vertex, y * width + x - 1, Math.random() * 100 + 1);
            }
            if (y + 1 < height && y - 1 >= 0) {
                graph.duplexe(vertex, (y + 1) * width + x, Math.random() * 100 + 1);
                graph.duplexe(vertex, (y - 1) * width + x, Math.random() * 100 + 1);
            }
        }
        return graph;
    }
}
