// Algorithmic function //
const multiplication = (a, b) => a * b;

const getStringDate = () => {
    let date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} `;
}

const calculateTotals = () => {
    document.querySelector("#spanTotalProducts").innerHTML = products.reduce((a,b) => parseInt(a) + parseInt(b.quantity), 0);
    document.querySelector("#spanTotalToPay").innerHTML = numberFormat2.format(products.reduce((a,b) => parseInt(a) + parseInt(b.amount), 0));
}

const clearProduct = () => {
    document.querySelector("#txtQuantity").value = "1";
    document.querySelector("#txtProduct").value = "";
    document.querySelector("#txtPrice").value = "0.00";
    document.querySelector("#txtAmount").value = "0.00";
}
