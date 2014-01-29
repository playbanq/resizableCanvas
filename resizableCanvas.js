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
                window.onresize = function () {
                    callback('window', window.innerWidth, window.innerHeight);
                }
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