function run() {
    let canvas = document.getElementById("maze");
    let inputs = {
        width: document.getElementById("width"),
        height: document.getElementById("height"),
        scale: document.getElementById("scale")
    };
    let button = document.getElementById("generate");
    drawMaze(generateMaze(20, 20), 5, canvas);
    button.onclick = () => {
        let width = Number.parseInt(inputs.width.value);
        let height = Number.parseInt(inputs.height.value);
        let scale = Number.parseInt(inputs.scale.value);
        drawMaze(generateMaze(width, height), scale, canvas);
    };
}
