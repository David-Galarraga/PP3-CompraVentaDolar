const qtty = document.getElementById("quantityPesos");
const btnCon = document.getElementById("btnConvert");
const actDollar = document.getElementById("actualDollars");

const dollarConv = document.getElementById("dollarConverted");
const selecCard = document.getElementById("selectCard");

async function getData() { // fecht asincrono
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares');

        if (!response.ok) { // comprobar si responde 
            throw new Error(`Error de HTTP! estado: ${response.status}`);
        }
        
        const data = await response.json(); // convertir a .json

        // funciones que usan este fetch
        getActualDollars(data);
        // el evento solo funciona correctamente si se llama mediante una funcion flecha
        btnCon.addEventListener("click", () => getDollar(data)); 
    }
    catch (error) { console.log('Hubo un error', error); }
    
}

getData();

function getActualDollars(data){
    const bolsa = data.find(dollar => dollar.casa === "bolsa");
    const oficial = data.find(dollar => dollar.casa === "oficial");
    const blue = data.find(dollar => dollar.casa === "blue");

    actDollar.innerHTML=`
        <h3>Casa:${oficial.casa} Compra: ${oficial.compra} Venta: ${oficial.venta}</h3>
        <h3>Casa:${blue.casa} Compra: ${blue.compra} Venta: ${blue.venta}</h3>
        <h3>Casa:${bolsa.casa} Compra: ${bolsa.compra} Venta: ${bolsa.venta}</h3>`
    ;
}

function getDollar(data){
    const selector = document.getElementById('dolarSelector');
    const chosenDollar = selector.value; // captura el value actual

    if (qtty.value === "") {
        alert("El campo está vacío");
    } else if (isNaN(qtty.value)) {
        alert("Lo que ingresaste no es un número");
    } else {
        const valueConvert = parseFloat(qtty.value);

        if (chosenDollar && valueConvert) {
            const dollar = data.find(dollar => dollar.casa === chosenDollar)

            let convertCompra = valueConvert / dollar.compra;
            let convertVenta = valueConvert / dollar.venta;

            selecCard.classList.remove('activeCard');
            selecCard.classList.add('hidden');

            dollarConv.classList.remove('hidden')
            dollarConv.classList.add('activeCard')
            dollarConv.innerHTML =
                `<div class="${chosenDollar}">
                    <h1>${chosenDollar}</h1>
                    <h3>Comprando dólares: US$ ${convertVenta.toFixed(2)}</h3>
                    <p><small>Usando cotización de venta: $${dollar.venta}</small></p>
                    <hr>
                    <h3>Si vendieras tus dólares: $${(convertVenta * dollar.compra).toFixed(2)}</h3>
                    <p><small>Usando cotización de compra: $${dollar.compra}</small></p>
                </div>`;



        } else {
            alert("No ha seleccionado un tipo de dolar o ingreso 0 en el convertidor");
        }
    }
};

