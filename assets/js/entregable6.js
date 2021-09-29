import Operation from './Operation.js'

let isNotComplete = true;
let listProducts = [];
let operation = new Operation();
let percentage = 10;

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

alert(`         ******      BIENVENIDO AL PUNTO DE VENTA (MEG)      ******
    Este sistema te permite agregar la cantidad, el producto y el precio del mismo. Al terminar te mostrara el total de productos y total a pagar.
`);

while (isNotComplete) {
    let product  = prompt(`Introduce el producto a comprar:`);
    let quantity = parseInt(prompt(`Introduzca la cantidad a comprar del producto ${product}:`));
    let price    = parseFloat(prompt(`Introduzca el precio unitario (con IVA) del producto ${product}`));
    
    let total = operation.multiplication(parseFloat(price), parseInt(quantity));

    // JSON
    let objectProduct = {
        product,
        quantity,
        price,
        total
    }

    listProducts.push(objectProduct);

    isNotComplete = confirm(`¿Desea agregar un nuevo producto?`);
}

//  Obtener total de productos y total a pagar 
let { quantity } = listProducts.reduce((a, b) => ({ quantity: a.quantity + b.quantity }));
let { total } = listProducts.reduce((a, b) => ({ total: a.total + b.total }));
let subtotal = operation.getIVA(total);
let iva = operation.subtraction(total, subtotal);
let discount = operation.getDiscount(subtotal, percentage);

total = (operation.subtraction(subtotal, discount)) + iva;

console.log(`  
***********  Ticket  ***********   
${listProducts.map(item => {
    return `
    ************************************
    Producto: ${item.product}
    Cantidad: ${item.quantity}
    Precio: ${formatter.format(item.price)}
    Total: ${formatter.format(item.total)}
    *************************************`
}).join("")}

Subtotal: ${formatter.format(subtotal)}
Descuento: ${formatter.format(discount)}    %Descuento : ${percentage}
IVA: ${formatter.format(iva)}
Total: ${formatter.format(total)}     Total de Productos: ${quantity}   
`)

alert(`  
***********  Ticket  ***********   
${listProducts.map(item => {
    return `
    ************************************
    Producto: ${item.product}
    Cantidad: ${item.quantity}
    Precio: ${formatter.format(item.price)}
    Total: ${formatter.format(item.total)}
    *************************************`
}).join("")}

Subtotal: ${formatter.format(subtotal)}
Descuento: ${formatter.format(discount)}  %Descuento : ${percentage}
IVA: ${formatter.format(iva)}
Total: ${formatter.format(total)}     Total de Productos: ${quantity}   
`);
