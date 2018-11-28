function initialize() {
    let canvas = document.getElementById("maze") as HTMLCanvasElement;
    let inputs = {
        width: document.getElementById("width") as HTMLInputElement,
        height: document.getElementById("height") as HTMLInputElement,
        scale: document.getElementById("scale") as HTMLInputElement,
        live: document.getElementById("live") as HTMLInputElement,
        validate:  (input: HTMLInputElement) => !Number.isInteger(Number.parseInt(input.value, 10)) || Number.parseInt(input.value) < Number.parseInt(input.min)
    }
    let button = document.getElementById("generate") as HTMLButtonElement;
    let height = 20;
    let width = 20;
    let state = {
        iter: primIter(Graph.random(width, height)),
        id: -1,
    }

    state.id = setInterval(() => {
        let step = state.iter.next(); 
        if (!step.done) 
            drawMaze(step.value, height, width, 5, canvas);
        else
            clearInterval(state.id);
    }, 1);

    inputs.width.onchange = () => button.disabled = inputs.validate(inputs.width);
    inputs.height.onchange = () => button.disabled = inputs.validate(inputs.height);
    inputs.scale.onchange = () => button.disabled = inputs.validate(inputs.scale);
    
    button.onclick = () => {
        let width = Number.parseInt(inputs.width.value);
        let height = Number.parseInt(inputs.height.value);
        let scale = Number.parseInt(inputs.scale.value);
        clearInterval(state.id);
        if (!inputs.live.checked){
            drawMaze(prim(Graph.random(width, height)), height, width,  scale, canvas);
        }
        else {
            state.iter = primIter(Graph.random(width, height));
            state.id = setInterval(() => {
                let step = state.iter.next(); 
                if (!step.done) 
                    drawMaze(step.value, height, width, scale, canvas);
                else
                    clearInterval(state.id);
            }, 1);
        }
    }

}
