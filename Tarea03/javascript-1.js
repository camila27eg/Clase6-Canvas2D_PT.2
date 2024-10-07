const CANVAS = document.getElementById("lienzo");
const CTX = CANVAS.getContext("2d");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

function updateCanvasSize() {
    CANVAS.width = CANVAS.getBoundingClientRect().width;
    CANVAS.height = CANVAS.getBoundingClientRect().height;
}

/*///// 1. Definición de nuestra clase base Línea para generar objetos ///*/
class Linea {
    constructor(params = {}) {
        this.borderColor = params.borderColor || "#2715F5";
        this.borderWidth = 10;
        this.x1 = Math.random() * window.innerWidth;
        this.y1 = Math.random() * window.innerHeight;
        this.x2 = this.x1 + Math.random() * 200 - 50; // Longitud de la línea
        this.y2 = this.y1 + Math.random() * 100 - 50; // Longitud de la línea
        this.speed = {
            x: Math.random() * 5,
            y: Math.random() * 5
        };
    }

    checkDirection() {
        // Evaluar si las coordenadas de la línea se mantienen dentro de la pantalla
        if (this.x1 >= window.innerWidth || this.x2 >= window.innerWidth) {
            this.speed.x *= -1;
        } else if (this.x1 <= 0 || this.x2 <= 0) {
            this.speed.x *= -1;
        }

        if (this.y1 >= window.innerHeight || this.y2 >= window.innerHeight) {
            this.speed.y *= -1;
        } else if (this.y1 <= 0 || this.y2 <= 0) {
            this.speed.y *= -1;
        }
    }

    updatePosition() {
        this.checkDirection();

        this.x1 += this.speed.x;
        this.y1 += this.speed.y;
        this.x2 += this.speed.x;
        this.y2 += this.speed.y;
    }

    draw() {
        CTX.strokeStyle = this.borderColor;
        CTX.lineWidth = this.borderWidth;
        CTX.beginPath();
        CTX.moveTo(this.x1, this.y1);
        CTX.lineTo(this.x2, this.y2);
        CTX.stroke();

        this.updatePosition();
    }
}

/*///// Array conteniendo los objetos a dibujar. ///*/
let misLineas = [];

/*/////  Creación de líneas. ///*/
const TOTAL_LINEAS = 200;
for (let i = 0; i < TOTAL_LINEAS; i++) {
    let nuevaLinea = new Linea(); // Creación.
    misLineas.push(nuevaLinea); // Guardado dentro del Array.
}

/*///// Definimos la función de renderizado que estaremos repitiendo usando requestAnimationFrame() ///*/
function render() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    /*///// 7. Dibujar las líneas ///*/
    for (let i = 0; i < misLineas.length; i++) {
        misLineas[i].draw();
    }

    requestAnimationFrame(render);
}

/*/////Ejecutar código ///*/
window.addEventListener("resize", updateCanvasSize);
requestAnimationFrame(render);
