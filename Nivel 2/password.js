// Los 4 grupos de caracteres disponibles para generar la contraseña
const MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const NUMEROS = '0123456789';
const SIMBOLOS = '!@#$%^&*()_+[]{}|;:,.<>?';

// En JavaScript un string se comporta como array de caracteres
// Puedes acceder a cada letra por su índice:
console.log(MAYUSCULAS[0]); // 'A'
console.log(MAYUSCULAS[1]); // 'B'
console.log(MAYUSCULAS[25]); // 'Z'
console.log(MAYUSCULAS.length); // 26 - cuántos caracteres tiene

// Capturamos todos los elementos que necesitamos del HTML
const inputLongitud = document.getElementById('longitud');
const valorLongitud = document.getElementById('valor-longitud');
const checkMayusculas = document.getElementById('mayusculas');
const checkMinusculas = document.getElementById('minusculas');
const checkNumeros = document.getElementById('numeros');
const checkSimbolos = document.getElementById('simbolos');
const btnGenerar = document.getElementById('btn-generar');
const btnCopiar = document.getElementById('btn-copiar');
const passwordGenerado = document.getElementById('password-generado');
const mensajeCopia = document.getElementById('mensaje-copia');

// Actualizamos el número visible cuando el usuario mueve el slider
inputLongitud.addEventListener('input', function() {
    valorLongitud.textContent = inputLongitud.value;
});

// La funcion principal que construye la contraseña
function generarPassword() {
    
    //1. Leer la longitud seleccionada por el usuario
    const longitud = Number(inputLongitud.value)
    
    // 2. Construir con los caracteres disponibles
    let pool = '';

    if (checkMayusculas.checked) pool += MAYUSCULAS;
    if (checkMinusculas.checked) pool += MINUSCULAS;
    if (checkNumeros.checked) pool += NUMEROS;
    if (checkSimbolos.checked) pool += SIMBOLOS;

    // 3. Validar que el usuario eligió al menos 1 opción
    if (pool === '') {
        passwordGenerado.textContent = 'Elige al menos una opción';
        return;
    }

    // 4. Construir la contraseña
    let password = '';

    for (let i = 0; i < longitud; i++){
        const indiceAleatorio = Math.floor(Math.random() * pool.length);
        password += pool[indiceAleatorio];
    }

    // 5. Mostrar la contraseña
    passwordGenerado.textContent = password;
    mensajeCopia.textContent = '';
}

// 6. Funcion para copiar contraseña al portapapeles
async function copiarPassword() {
    

    // Verificar que hay una contraseña generada
    const password = passwordGenerado.textContent;

    if (password === '' || password === 'Tu contraseña aparecerá aquí') {
        mensajeCopia.textContent = 'Genera una contraseña antes de copiar';
        mensajeCopia.style.color = '#ff3b5c';
        return;
    }

    // Copiar al portapapeles
    await navigator.clipboard.writeText(password);

    //Mostrar mensaje de confirmación
    mensajeCopia.textContent = '¡Contraseña copiada con éxito!';
    mensajeCopia.style.color = '#6eb400';

    // Borrar el mensaje después de 2 segundos
    setTimeout(function(){
        mensajeCopia.textContent = '';
    }, 2000);
}

// 7. Conectar botones con funciones
btnGenerar.addEventListener('click', generarPassword);
btnCopiar.addEventListener('click', copiarPassword);

// 8. Generar una contraseña automatica al cargar la página
generarPassword();
