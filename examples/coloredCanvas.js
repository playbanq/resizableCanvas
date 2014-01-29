var canvas = document.getElementById('resizableCanvas'),
    context = canvas.getContext('2d');;

ResizableCanvas.extend(canvas);
canvas.setSize(window.innerWidth - 100, window.innerHeight - 100);
canvas.style.backgroundColor = 'rgb(128, ' + Math.floor(canvas.width/10) + 
                                ', ' + Math.floor(canvas.height/5) + ')';

// Handle canvas/window resizing
canvas.onResize(function (width, height, type) {
    var green = Math.floor(width/10),
        blue = Math.floor(height/5);
    canvas.style.backgroundColor = 'rgb(128, ' + green + ', ' + blue + ')';
});