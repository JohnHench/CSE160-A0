// asgn0.js

var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Faild to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    // Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
    
    var v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, "red")
}

function drawVector(v, color) {
    // Lets color be chosen
    ctx.strokeStyle = color;
    ctx.beginPath();

    // Defaults start of drawing to center of canvas
    let cx = canvas.width/2
    let cy = canvas.height/2
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx+v.elements[0]*20, cy-v.elements[1]*20);
    ctx.stroke();
}

function handleDrawEvent() {    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gather input
    var V1x = document.getElementById('V1_x_input').value;
    var V1y = document.getElementById('V1_y_input').value;
    var V2x = document.getElementById('V2_x_input').value;
    var V2y = document.getElementById('V2_y_input').value;

    // Draw vectors with input from user
    var V1draw = new Vector3([V1x, V1y, 0]);
    var V2draw = new Vector3([V2x, V2y, 0])
    drawVector(V1draw, "red");
    drawVector(V2draw, "blue");
}

function handleDrawOperationEvent() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gather input
    var V1x = document.getElementById('V1_x_input').value;
    var V1y = document.getElementById('V1_y_input').value;
    var V2x = document.getElementById('V2_x_input').value;
    var V2y = document.getElementById('V2_y_input').value;

    // Draw vectors with input from user
    var V1draw = new Vector3([V1x, V1y, 0]);
    var V2draw = new Vector3([V2x, V2y, 0])
    drawVector(V1draw, "red");
    drawVector(V2draw, "blue");

    // Gather input from operations drop-down menu
    var operation = document.getElementById('Operations_List').value;

    // Gather input from scalar slot
    var scalar = document.getElementById('Scalar').value;

    // Logic for all operations
    if (operation == "Add") {
        V1draw.add(V2draw);
        drawVector(V1draw, "green");
    }
    if (operation == "Sub") {
        V1draw.sub(V2draw);
        drawVector(V1draw, "green");
    }
    if (operation == "Div") {
        V1draw.div(scalar);
        drawVector(V1draw, "green");
        V2draw.div(scalar);
        drawVector(V2draw, "green");
    }
    if (operation == "Mul") {
        V1draw.mul(scalar);
        drawVector(V1draw, "green");
        V2draw.mul(scalar);
        drawVector(V2draw, "green");
    }
    if (operation == "Mag") {
        console.log("Magnitude v1: "+ V1draw.magnitude());
        console.log("Magnitude v2: "+ V2draw.magnitude());
    }
    if (operation == "Norm") {
        V1draw.normalize();
        drawVector(V1draw, "green");
        V2draw.normalize();
        drawVector(V2draw, "green");
    }

    // Output for angle to console to 5 decimal places
    if (operation == "Angle") {
        console.log("Angle: " + (angleBetween(V1draw, V2draw)).toFixed(5));
    }

    // Output for area to console to 5 decimal places
    if (operation == "Area") {
        console.log("Area: " + (areaTriangle(V1draw, V2draw)).toFixed(5));
    }
}
    
function angleBetween(v1, v2) { // Chat GPT helped with figuring out the math and formatting
    const v1mag = v1.magnitude();
    const v2mag = v2.magnitude();
    const dot = Vector3.dot(v1, v2);
    const mult = v1mag * v2mag;
    const angle = Math.acos(dot / mult) * (180 / Math.PI);
    return angle;
}

function areaTriangle(v1, v2) {
    var crossProduct = Vector3.cross(v1, v2); // Calculate cross product
    var area = crossProduct.magnitude() / 2; // Calculate magnitude and divide by 2
    return area;
}

