function drawMaze(matrix, height, width, scale, canvas) {
    canvas.setAttribute("width", `${width * scale * 2 + scale}`);
    canvas.setAttribute("height", `${height * scale * 2 + scale}`);
    let context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.fillRect(0, 0, width * 2 + 1, height * 2 + 1);
    context.fillStyle = "#fff";
    context.translate(1, 1);
    for (let row = 0; row < matrix.length; row++) {
        let x = row % width;
        let y = Math.floor(row / width);
        if (matrix[row][row] !== undefined)
            context.fillRect(x * 2, y * 2, 1, 1);
        if (x + 1 < width && x - 1 >= 0) {
            if (matrix[row][y * width + x + 1] !== undefined)
                context.fillRect(x * 2 + 1, y * 2, 1, 1);
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
