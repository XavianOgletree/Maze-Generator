type Maze = {matrix: number[][], width: number, height: number};

/**
 * Used to help the min-heap sort the edges in the graph.
 */
class PrimEdge {
    from: number;
    to: number;
    weight: number
    constructor(from: number, to: number, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    valueOf() {
        return this.weight;
    }
}

/**
 * Takes a graph and runs Prim's Algorithm to construct
 * a maze.  Uses a min-heap to store the cost of each pathway.
 * 
 * @param graph input graph to generate maze from
 * @returns minimum spaning tree which is the generated maze
 */
function prim(graph: Graph): Graph {
    // Use a heap to store the edges of a graph
    let costs = (new Heap<PrimEdge>()).insert(new PrimEdge(0, 0, graph.vertices[0][0]));
    let unvisited = new Array<boolean>(graph.vertices.length).fill(true);
    let visited = 0;
    let primsGraph = new Graph(graph.size);
    // Build the graph until either there are no more 
    // costs to examine, or all the vertice have been
    // visited.
    do {
        let closest;
        // Remove values from the heap until it is empty
        // or until a nearby visited vertex is found.
        do {
            closest = costs.findMin();
            costs = costs.deleteMin();
            // If no more values are in the heap
            // return the graph.
            if (closest === null) 
                return primsGraph;
        } while (!unvisited[closest.from]);

        // Add the undirected pathway to the graph
        primsGraph.duplexe(closest.from, closest.to, closest.weight);
        unvisited[closest.from] = false;
        visited++;


        graph.vertices[closest.from].forEach((weight, neighbor) => {
            if (unvisited[neighbor]) {
                // Store the edge into the heap
                costs = costs.insert(new PrimEdge(neighbor, closest.from, weight));
            }
        });
    } while (!costs.isEmpty() && visited < unvisited.length);
    return primsGraph;
}

function generateMaze(width: number, height: number): Maze {
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
    
    // Run prims algorithm and return the maze
    return { matrix: prim(graph).vertices, width: width, height: height };
}

function drawMaze(maze: Maze, scale: number,  canvas: HTMLCanvasElement) {
    let {matrix, width, height} = maze;
    canvas.setAttribute("width", `${ width * scale * 2 + scale }`);
    canvas.setAttribute("height", `${ height * scale * 2 + scale }`);
    let context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.fillRect(0, 0, width * 2 + 1, height * 2 + 1);
    context.fillStyle = "#fff";
    context.translate(1, 1);
    for (let row = 0; row < matrix.length; row++) {
        let x = row % width;
        let y = Math.floor(row / width);
        context.fillRect(x * 2, y * 2, 1, 1);

        if (x + 1 < width && x - 1 >= 0) {
            if (matrix[row][y * width + x + 1] !== undefined)
                context.fillRect(x * 2 + 1, y  * 2, 1, 1);
                    
            if (matrix[row][y * width + x - 1] !== undefined)
                context.fillRect(x * 2 - 1, y * 2, 1, 1);
        }

        if (y + 1 < height && y - 1 >= 0) {
            if (matrix[row][(y + 1) * width + x] !== undefined)
                context.fillRect(x * 2, y * 2 + 1, 1, 1);

            if (matrix[row][(y - 1) * width + x] !== undefined)
                context.fillRect(x * 2, y * 2 - 1, 1, 1);
        }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
}