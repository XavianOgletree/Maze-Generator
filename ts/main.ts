function run() {
    let canvas = document.getElementById("maze") as HTMLCanvasElement;
    let inputs = {
        width: document.getElementById("width") as HTMLInputElement,
        height: document.getElementById("height") as HTMLInputElement,
        scale: document.getElementById("scale") as HTMLInputElement
    }
    let button = document.getElementById("generate") as HTMLButtonElement;
    drawMaze(generateMaze(20, 20), 5, canvas);
    button.onclick = () => {
        let width = Number.parseInt(inputs.width.value);
        let height = Number.parseInt(inputs.height.value);
        let scale = Number.parseInt(inputs.scale.value);
        drawMaze(generateMaze(width, height), scale, canvas);
    }
}
