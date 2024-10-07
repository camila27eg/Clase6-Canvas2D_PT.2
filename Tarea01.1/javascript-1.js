const PI2 = Math.PI * 2; 
    const CANVAS = document.getElementById("lienzo");
    const CTX = CANVAS.getContext("2d");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    const radius = 20;
    const distanceY = 30; // Espacio entre círculos verticales
    const distanceX = 30; // Espacio entre círculos horizontales
    let listaCirculos = [];

    class Circulo {
        constructor(x, y, color) {
            this.borderColor = "#000000";  // Color del borde
            this.fillStyle = color;  // Color relleno
            this.borderWidth = 2;  // Ancho del borde
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

    // Alterna colores según columna
    function getColorForColumn(columnIndex, rowIndex) {
        // Alternar el color inicial de la columna y luego alternar cada fila dentro de la columna
        if (columnIndex % 2 === 0) {
            return rowIndex % 2 === 0 ? "#61A4F0" : "#F08150"; // Naranja en fila par, Verde en fila impar
        } else {
            return rowIndex % 2 === 0 ? "#F08150" : "#61A4F0"; // Verde en fila par, Naranja en fila impar
        }
    }

    function updateCanvasSize() {
        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight;
        calcularCirculos();
    }

    function calcularCirculos() {
        listaCirculos = [];  // Vaciar la lista de círculos
        let posActualY = radius;  // primera fila en la parte superior
        let posActualX = radius;  // primera columna en el lado izquierdo
        let columnIndex = 0;  // alternar los colores por columna

        // Mientras dibujar círculos dentro del ancho de la pantalla
        while (posActualX + radius <= CANVAS.width) {
            posActualY = radius;  // Reiniciamos la posición Y para cada nueva columna
            let rowIndex = 0;  // alternar los colores en las filas dentro de la columna
            while (posActualY + radius <= CANVAS.height) {
                // Obtener color para el círculo alternando por columna y fila
                let color = getColorForColumn(columnIndex, rowIndex);

                // Crear un nuevo círculo y agregarlo a la lista
                let nuevoCirculo = new Circulo(posActualX, posActualY, color);
                listaCirculos.push(nuevoCirculo);

                posActualY += (radius * 2 + distanceY);  // Avanzar en Y para la siguiente fila
                rowIndex++;  // Incrementa el índice de la fila
            }
            posActualX += (radius * 2 + distanceX);  // Avanzar en X para la siguiente columna
            columnIndex++;  // Incrementamo el índice de la columna
        }
    }

    function render() {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);  // Limpiar el canvas
        listaCirculos.forEach(circulo => circulo.draw());  // Dibujar cada círculo
        requestAnimationFrame(render);
    }

    // Redimensionar el canvas cuando la ventana cambia de tamaño
    window.addEventListener("resize", updateCanvasSize);

    // Inicializar el tamaño del canvas y comenzar el renderizado
    updateCanvasSize();
    requestAnimationFrame(render);