/**
 * Used to help the min-heap sort the edges in the graph.
 */
class PrimEdge {
    constructor(from, to, weight) {
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
function prim(graph) {
    // Use a heap to store the edges of a graph
    let start = Math.floor(Math.random() * graph.size);
    let costs = (new Heap()).insert(new PrimEdge(start, start, graph.vertices[start][start]));
    let unvisited = new Array(graph.vertices.length).fill(true);
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
                return primsGraph.vertices;
        } while (!unvisited[closest.from]);
        // Add the undirected pathway to the graph
        primsGraph.add(closest.from, closest.from, 0);
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
    return primsGraph.vertices;
}
function* primIter(graph) {
    let start = Math.floor(Math.random() * graph.size);
    let costs = (new Heap()).insert(new PrimEdge(start, start, graph.vertices[start][start]));
    let unvisited = new Array(graph.vertices.length).fill(true);
    let visited = 0;
    let primsGraph = new Graph(graph.size);
    do {
        let closest;
        do {
            closest = costs.findMin();
            costs = costs.deleteMin();
            if (closest === null)
                return primsGraph.vertices;
        } while (!unvisited[closest.from]);
        primsGraph.add(closest.from, closest.from, 0);
        primsGraph.duplexe(closest.from, closest.to, closest.weight);
        unvisited[closest.from] = false;
        visited++;
        graph.vertices[closest.from].forEach((weight, neighbor) => {
            if (unvisited[neighbor]) {
                costs = costs.insert(new PrimEdge(neighbor, closest.from, weight));
            }
        });
        yield primsGraph.vertices;
    } while (!costs.isEmpty() && visited < unvisited.length);
    return primsGraph.vertices;
}
