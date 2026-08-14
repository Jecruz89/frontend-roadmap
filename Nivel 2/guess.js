// Generamos el número secreto entre 1 y 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Intentos del jugador
const maxIntentos = 10;

// Contador de intentos 
let intentosUsados = 0;

//Estado del juego
let juegoTerminado = false;

//Capturar el input del jugador de HTML
const inputNumero = document.getElementById('input-numero');
const btnAdivinar = document.getElementById('btn-adivinar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const mensaje = document.getElementById('mensaje');
const historial = document.getElementById('historial');
const intentosRestantes = document.getElementById('intentos-restantes');

function adivinar () {
    //Leer el número ingresado por el jugador
    const intento = Number(inputNumero.value);

    //Si el juego ya terminó, no permitir más intentos
    if (juegoTerminado) return;

    //validar que el jugador ingrese un número válido
    if (!intento || intento < 1 || intento > 100) {
        mensaje.textContent = "Ingrese un número válido entre 1 y 100.";
        return;
    }

    // Sumar un intento usado
    intentosUsados++;

//actualizar los intentos restantes
const restantes = maxIntentos - intentosUsados;
intentosRestantes.textContent = restantes;

//Agregar el intento al historial
const item = document.createElement("li");
item.textContent = `Intento ${intentosUsados}: dijiste ${intento}`;
historial.appendChild(item);

// Comparar el intento con el número secreto
if (intento === numeroSecreto) {
    mensaje.textContent = `¡Correcto! era el ${numeroSecreto}. Lo lograste en ${intentosUsados} intentos`;
    juegoTerminado = true;

} else if (intento < numeroSecreto) {
    mensaje.textContent = "Mi número es mayor, intenta de nuevo.";
} else {
    mensaje.textContent = "Mi número es menor, intenta de nuevo.";
}

//Si se acabaron los intentos, terminar el juego
if (restantes === 0 && !juegoTerminado) {
    mensaje.textContent = `¡se acabaron los intentos!. El número secreto era ${numeroSecreto}.`;
    juegoTerminado = true;
    btnAdivinar.disabled = true;
}

//Limpiar el input para el siguiente intento
inputNumero.value = "";
inputNumero.focus();
}

//función para reiniciar el juego
function reiniciar() {
    //Recargar la página para reiniciar el juego
    //Genera un nuevo número secreto
    location.reload();
}

//Escucha el clic de botón adivinar
btnAdivinar.addEventListener("click", adivinar);

//Escuchar si el jugador presiona la tecla Enter para adivinar
inputNumero.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        adivinar();
    }
});

//Escuchar el clic del botón reiniciar
btnReiniciar.addEventListener("click", reiniciar);