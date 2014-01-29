var canvas = document.getElementById('resizableCanvas'),
    context = canvas.getContext('2d'),
    options = {
        minWidth: 600,
        minHeight: 300,
        fullscreen: false
    };

ResizableCanvas.extend(canvas);
canvas.setSize(window.innerWidth - 40, window.innerHeight - 40);
canvas.style.backgroundColor = 'rgb(128, ' + Math.floor(canvas.width/10) + 
                                ', ' + Math.floor(canvas.height/5) + ')';

// Handle canvas/window resizing
canvas.onResize(options, function (width, height, type) {
    var green = Math.floor(width/10),
        blue = Math.floor(height/5);
    canvas.style.backgroundColor = 'rgb(128, ' + green + ', ' + blue + ')';
});