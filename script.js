const qtty = document.getElementById("quantityPesos");
const btnCon = document.getElementById("btnConvert");
const actDollar = document.getElementById("actualDollars");

async function getData() { // fecht asincrono
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares');

        if (!response.ok) { // comprobar si responde 
            throw new Error(`Error de HTTP! estado: ${response.status}`);
        }
        
        const data = await response.json(); // convertir a .json
        
        console.log(data);

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
    const valueConvert = Math.max(1, parseInt(qtty.value) || 1);

    const selector = document.getElementById('dolarSelector');
    const chosenDollar = selector.value; // Captura el value actual
    
    if (chosenDollar && valueConvert) {
        alert(chosenDollar);    
    } else {
        alert("Seleccione un tipo de dolar");
    }
    


};

