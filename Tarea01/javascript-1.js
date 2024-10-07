const PI2 = Math.PI * 2; // Para hacer círculos
const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

const radius = 20;
const distanceY = 30; // Espacio entre círculos
let listaCirculos = [];

class Circulo {
    constructor(x, y) {
        this.borderColor = "#006884";
        this.fillStyle = "7AA2C4";
        this.borderWidth = 20;
        this.radiusX = radius;
        this.radiusY = radius;
        this.x = x;
        this.y = y;
    }

    draw() {
        CTX.strokeStyle = this.borderColor;
        CTX.fillStyle = this.fillStyle;
        CTX.lineWidth = this.borderWidth;
        CTX.beginPath();
        CTX.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, PI2);
        CTX.closePath();
        CTX.stroke();
        CTX.fill();
    }
}

function updateCanvasSize() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    calcularCirculos();
}

function calcularCirculos() {
    listaCirculos = [];
    let posActualY = radius;

    while (posActualY + radius <= CANVAS.height) {
        let nuevoCirculo = new Circulo(CANVAS.width / 28, posActualY);
        listaCirculos.push(nuevoCirculo);
        posActualY += (radius * 2 + distanceY);
    }
}

function render() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    listaCirculos.forEach(circulo => circulo.draw());
    requestAnimationFrame(render);
}

window.addEventListener("resize", updateCanvasSize);

updateCanvasSize();
requestAnimationFrame(render);