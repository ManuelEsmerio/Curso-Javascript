export const dataProduct = [{
    id: 1,
    name: 'Producto 1',
    description: "Description 1",
    price: 150.50,
    quantity: 2,
    actions: {
        delete : (id) => {
            const index = dataProduct.indexOf(id);
            if(index > -1){ 
                dataProduct.splice(index, 1);
                return {code: 200, response: "Producto eliminado con exito."}
            }else{
                return {code: 404, response: "Producto no encontrado."}
            }
        },
        update : (data) => {
            const index = dataProduct.indexOf(data.id);

            if(index > -1) { 
                dataProduct[index].name = data.name;
                dataProduct[index].description = data.description;
                dataProduct[index].price = data.price;
                dataProduct[index].actions = data.actions;
                return {code: 202, response: "Producto modificado con exito."}
            }else{
                return {code: 404, response: "El producto no se encuentra."}
            }
        }
    }
},
{
    id: 2,
    name: 'Producto 2',
    description: "Description 2",
    price: 250.50,
    quantity: 5,
    actions: {
        delete : (id) => {
            const index = dataProduct.indexOf(id);
            if(index > -1){ 
                dataProduct.splice(index, 1);
                return {code: 200, response: "Producto eliminado con exito."}
            }else{
                return {code: 404, response: "Producto no encontrado."}
            }
        },
        update : (data) => {
            const index = dataProduct.indexOf(data.id);

            if(index > -1) { 
                dataProduct[index].name = data.name;
                dataProduct[index].description = data.description;
                dataProduct[index].price = data.price;
                dataProduct[index].actions = data.actions;
                return {code: 202, response: "Producto modificado con exito."}
            }else{
                return {code: 404, response: "El producto no se encuentra."}
            }
        }
    }
},
{
    id: 3,
    name: 'Producto 3',
    description: "Description 3",
    price: 75.50,
    quantity: 1,
    actions: {
        delete : (id) => {
            const index = dataProduct.indexOf(id);
            if(index > -1){ 
                dataProduct.splice(index, 1);
                return {code: 200, response: "Producto eliminado con exito."}
            }else{
                return {code: 404, response: "Producto no encontrado."}
            }
        },
        update : (data) => {
            const index = dataProduct.indexOf(data.id);

            if(index > -1) { 
                dataProduct[index].name = data.name;
                dataProduct[index].description = data.description;
                dataProduct[index].price = data.price;
                dataProduct[index].actions = data.actions;
                return {code: 202, response: "Producto modificado con exito."}
            }else{
                return {code: 404, response: "El producto no se encuentra."}
            }
        }
    }
}]