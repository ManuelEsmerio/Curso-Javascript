let isNotComplete = true;
let listProducts = [];
alert(`         ******      BIENVENIDO AL PUNTO DE VENTA (MEG)      ******
    Este sistema te permite agregar la cantidad, el producto y el precio del mismo. Al terminar te mostrara el total de productos y total a pagar.
`);

while (isNotComplete) {
    let product = prompt(`Introduce el producto a comprar:`);
    let quantity = parseInt(prompt(`Introduzca la cantidad a comprar del producto ${product}:`));
    let price = parseFloat(prompt(`Introduzca el precio unitario del producto ${product}`));

    let total = parseFloat(price) * parseInt(quantity);

    let objectProduct = {
        product,
        quantity,
        price,
        total
    }

    listProducts.push(objectProduct);

    let next = confirm(`¿Desea agregar un nuevo producto (y/n)?`);

    isNotComplete = (next.toUpperCase().trim() === 'N') ? false : true;
}

//  Obtener total de productos y total a pagar 
const { quantity } = listProducts.reduce((a, b) => ({ quantity: a.quantity + b.quantity }));
const { total } = listProducts.reduce((a, b) => ({ total: a.total + b.total }));


console.log(`  
***********  Ticket  ***********   
${listProducts.map(item => {
    return `
    ************************************
    Producto: ${item.product}
    Cantidad: ${item.quantity}
    Precio: ${item.price}
    Total: ${item.total}
    *************************************`
}).join("")}

Total de Productos: ${quantity}        Total a pagar: ${total}   
`)

alert(`  
***********  Ticket  ***********   
${listProducts.map(item => {
    return `
    ************************************
    Producto: ${item.product}
    Cantidad: ${item.quantity}
    Precio: ${item.price}
    Total: ${item.total}
    *************************************`
}).join("")}

Total de Productos: ${quantity}        Total a pagar: ${total}
`);
