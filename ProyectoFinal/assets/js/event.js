// Eventos //
const handledCalculateAmount = () => {
    let price = (isNaN(parseFloat(document.querySelector("#txtPrice").value))) ? 0.00 : parseFloat(document.querySelector("#txtPrice").value);
    let quantity = (isNaN(parseInt(document.querySelector("#txtQuantity").value))) ? 0 : parseInt(document.querySelector("#txtQuantity").value);
    let valueAmount = multiplication(price, quantity);
    document.querySelector("#txtAmount").value = valueAmount;
}

const handledView = (product) => {
    console.log(product);
}

const handledUpdate = (product) => {
    console.log(product);
}

const handledDelete = (id) => {
    console.log(id);
}
