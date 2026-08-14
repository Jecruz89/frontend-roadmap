const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

document.getElementById("btn-calcular").addEventListener("click", function() {

    // 1. Leer y convertir números
    const num1 = Number(document.getElementById("numero1").value);
    const num2 = Number(document.getElementById("numero2").value);

    // 2. Validar que no estén vacíos
    if (document.getElementById("numero1").value === "" ||
        document.getElementById("numero2").value === "") {
        document.getElementById("resultado").textContent = "⚠️ Ingresa dos números";
        return;
    }

    // 3. Leer operación del select
    const operacion = document.getElementById("operacion").value;

    // 4. Calcular
    let resultado;

    if (operacion === "sumar") {
        resultado = sumar(num1, num2);
    } else if (operacion === "restar") {
        resultado = restar(num1, num2);
    } else if (operacion === "multiplicar") {
        resultado = multiplicar(num1, num2);
    } else if (operacion === "dividir") {
        if (num2 === 0) {
            document.getElementById("resultado").textContent = "⚠️ No se puede dividir entre cero";
            return;
        }
        resultado = dividir(num1, num2);
    }

    // 5. Mostrar resultado
    document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
});