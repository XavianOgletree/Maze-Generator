function run() {
    let canvas = document.getElementById("maze");
    let inputs = {
        width: document.getElementById("width"),
        height: document.getElementById("height"),
        scale: document.getElementById("scale"),
        validate: (input) => !Number.isInteger(Number.parseInt(input.value, 10)) || Number.parseInt(input.value) < Number.parseInt(input.min)
    };
    let button = document.getElementById("generate");
    drawMaze(generateMaze(20, 20), 5, canvas);
    inputs.width.onchange = () => button.disabled = inputs.validate(inputs.width);
    inputs.height.onchange = () => button.disabled = inputs.validate(inputs.height);
    inputs.scale.onchange = () => button.disabled = inputs.validate(inputs.scale);
    button.onclick = () => {
        let width = Number.parseInt(inputs.width.value);
        let height = Number.parseInt(inputs.height.value);
        let scale = Number.parseInt(inputs.scale.value);
        drawMaze(generateMaze(width, height), scale, canvas);
    };
}
