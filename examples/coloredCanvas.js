var canvas = document.getElementById('resizableCanvas'),
    context = canvas.getContext('2d');;

ResizableCanvas.extend(canvas);
canvas.setSize(500, 500);
canvas.style.backgroundColor = 'rgb(128, ' + Math.floor(canvas.width/10) + 
                                ', ' + Math.floor(canvas.height/5) + ')';

// Handle canvas/window resizing
canvas.onResize(300, 300, function (width, height, type) {
    var green = Math.floor(width/10),
        blue = Math.floor(height/5);
    canvas.style.backgroundColor = 'rgb(128, ' + green + ', ' + blue + ')';
});