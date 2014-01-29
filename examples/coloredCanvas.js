var canvas = document.getElementById('resizableCanvas'),
    context = canvas.getContext('2d');;

ResizableCanvas.extend(canvas);
canvas.setSize();
colorCanvas(128, Math.floor(canvas.width/10), Math.floor(canvas.height/5));

// Handle canvas/window resizing
canvas.onResize(function (type, width, height) {
    var green = Math.floor(width/10),
        blue = Math.floor(height/5);
    colorCanvas(128, green, blue);
});

// Change canvas background color
function colorCanvas(red, green, blue) {
    context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    context.fillRect(0, 0, canvas.width, canvas.height);
}