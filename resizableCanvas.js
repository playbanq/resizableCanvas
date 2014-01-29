/** 
 * @param {} -
 * @returns {} -
 */
var ResizableCanvas = Object.create({}, {
    'extend': {
        value: resizableCanvas
    }
});

function resizableCanvas(canvas) {
    // Validate that the canvas parameter is indeed an existing canvas element
    if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element provided is not a canvas element.');
        return;
    }

    // Track cursor position
    var cursor = { x: undefined, y: undefined },
        edges = {};

    // Define the canvas object interface
    var properties = {
        onResize: {
            value: function (minWidth, minHeight, callback) {
                var mousedown;
                window.addEventListener('resize', function () {
                    if (window.innerWidth < canvas.width && window.innerWidth >= minWidth) {
                        canvas.width = window.innerWidth;
                    }
                    if (window.innerHeight < canvas.height && window.innerHeight >= minHeight) {
                        canvas.height = window.innerHeight;
                    }
                    callback(canvas.width, canvas.height, 'window');
                });
                window.addEventListener('mousedown', function () {
                    mousedown = true;
                    lastEdges = {
                        top: edges.top,
                        left: edges.left,
                        bottom: edges.bottom,
                        right: edges.right
                    };
                });
                window.addEventListener('mouseup', function () {
                    mousedown = false;
                });
                window.addEventListener('mousemove', function (event) {
                    var container = canvas.getBoundingClientRect(),
                        x = event.clientX - container.left, 
                        y = event.clientY - container.top,
                        margin = 10,
                        canvasOffset;
                    edges = {};

                    if (x >= -margin && x <= margin) {
                        edges.left = true;
                    } else if (x >= canvas.width - margin && x <= canvas.width + margin) {
                        edges.right = true;
                    }

                    if (y >= -margin && y <= margin) {
                        edges.top = true;
                    } else if (y >= canvas.height - margin && y <= canvas.height + margin) {
                        edges.bottom = true;
                    }

                    if (edges.bottom && edges.right || edges.top && edges.left) {
                        canvas.style.cursor = 'nwse-resize';
                    } else if (edges.bottom && edges.left || edges.top && edges.right) {
                        canvas.style.cursor = 'nesw-resize';
                    } else if (edges.bottom || edges.top) {
                        canvas.style.cursor = 'ns-resize';
                    } else if (edges.right || edges.left) {
                        canvas.style.cursor = 'ew-resize';
                    } else {
                        canvas.style.cursor = 'auto';
                    }

                    if (mousedown && cursor.x && cursor.y) {
                        if (lastEdges.bottom && lastEdges.right) {
                            canvas.width -= cursor.x - event.clientX;
                            canvas.height -= cursor.y - event.clientY;
                        } else if (lastEdges.top && lastEdges.left) {
                            canvas.width += cursor.x - event.clientX;
                            canvas.height += cursor.y - event.clientY;
                            canvasOffset = parseInt(canvas.style.marginTop) || 0;
                            canvas.style.marginTop = parseInt(canvasOffset - cursor.y + event.clientY) + 'px';
                            canvasOffset = parseInt(canvas.style.marginLeft) || 0;
                            canvas.style.marginLeft = parseInt(canvasOffset - cursor.x + event.clientX) + 'px';
                        } else if (lastEdges.bottom && lastEdges.left) {
                            canvas.width += cursor.x - event.clientX;
                            canvas.height -= cursor.y - event.clientY;
                            canvasOffset = parseInt(canvas.style.marginLeft) || 0;
                            canvas.style.marginLeft = parseInt(canvasOffset - cursor.x + event.clientX) + 'px';
                        } else if (lastEdges.top && lastEdges.right) {
                            canvas.width -= cursor.x - event.clientX;
                            canvas.height += cursor.y - event.clientY;
                            canvasOffset = parseInt(canvas.style.marginTop) || 0;
                            canvas.style.marginTop = parseInt(canvasOffset - cursor.y + event.clientY) + 'px';
                        } else if (lastEdges.top) {
                            canvas.height += cursor.y - event.clientY;
                            canvasOffset = parseInt(canvas.style.marginTop) || 0;
                            canvas.style.marginTop = parseInt(canvasOffset - cursor.y + event.clientY) + 'px';
                        } else if (lastEdges.left) {
                            canvas.width += cursor.x - event.clientX;
                            canvasOffset = parseInt(canvas.style.marginLeft) || 0;
                            canvas.style.marginLeft = parseInt(canvasOffset - cursor.x + event.clientX) + 'px';
                        } else if (lastEdges.bottom) {
                            canvas.height -= cursor.y - event.clientY;
                        } else if (lastEdges.right) {
                            canvas.width -= cursor.x - event.clientX;
                        } 

                        if (canvas.width < minWidth) {
                            canvas.width = minWidth;
                        }
                        if (canvas.height < minHeight) {
                            canvas.height = minHeight;
                        }
                        callback(canvas.width, canvas.height, 'canvas');
                    }

                    cursor.x = event.clientX;
                    cursor.y = event.clientY;
                });
            }
        },
        setSize: {
            writable: true,
            value: function (newWidth, newHeight) {
                canvas.width = newWidth || window.innerWidth;
                canvas.height = newHeight || window.innerHeight;
            }
        }
    }
    
    Object.defineProperties(canvas, properties);
    
    return Object.create({}, properties);
}