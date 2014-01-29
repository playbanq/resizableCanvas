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

    // Define the canvas object interface
    var properties = {
        onResize: {
            value: function (callback) {
                var mousedown;
                window.addEventListener('resize', function () {
                    callback(window.innerWidth, window.innerHeight, 'window');
                });
                window.addEventListener('mousedown', function () {
                    mousedown = true;
                });
                window.addEventListener('mouseup', function () {
                    mousedown = false;
                });
                window.addEventListener('mousemove', function (event) {
                    var container = canvas.getBoundingClientRect();
                        x = event.clientX - container.left, 
                        y = event.clientY - container.top,
                        margin = 10,
                        edges = {};

                    if (x >= -margin && x <= margin) {
                        edges.left = true;
                    } else if (x >= canvas.width - margin && x <= canvas.width + margin) {
                        edges.right = true;
                    }

                    if (y >= -margin && y <= margin) {
                        edges.top = true;
                    } else if (y >= canvas.height - margin && x <= canvas.height + margin) {
                        edges.bottom = true;
                    }
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