const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const numberFormat2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const customer = []
const products = []

const formOrder = document.querySelector("#formOrder");

formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formOrder);

    if (formData.get('txtProduct') != "") {
        if (formData.get('txtAmount') != "0.00") {

            let objectProduct = {
                id: products.length + 1,
                date: getStringDate(),
                product: formData.get('txtProduct'),
                quantity: formData.get('txtQuantity'),
                price: formData.get('txtPrice'),
                amount: formData.get('txtAmount')
            }

            products.push(objectProduct);

            let tbody = document.querySelector("#listOrders tbody");
            tbody.innerHTML = "";

            products.map((item, index) => {
                let row = tbody.insertRow(index);
                row.insertCell(0).innerHTML = item.id;
                row.insertCell(1).innerHTML = item.date;
                row.insertCell(2).innerHTML = item.product;
                row.insertCell(3).innerHTML = item.quantity;
                row.insertCell(4).innerHTML = numberFormat2.format(item.price);
                row.insertCell(5).innerHTML = numberFormat2.format(item.amount);
                let groupButton = row.insertCell(6);

                let viewButton = document.createElement('button');
                viewButton.classList.add('btn', 'btn-primary', 'btn-xs', 'm-1');
                viewButton.setAttribute('data-bs-toggle', 'modal');
                viewButton.setAttribute('data-bs-target', '#exampleModal');
                viewButton.addEventListener('click', () => handledView(item));
                let iconView = document.createElement("i");
                iconView.classList.add('bi', 'bi-eye-fill');
                viewButton.appendChild(iconView);

                let updateButton = document.createElement('button');
                updateButton.classList.add('btn', 'btn-warning', 'btn-xs', 'm-1');
                updateButton.addEventListener('click', () => handledUpdate(item, row));
                let iconUpdate = document.createElement("i");
                iconUpdate.classList.add('bi', 'bi-pencil-fill');
                updateButton.appendChild(iconUpdate);

                let deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'm-1');
                deleteButton.addEventListener('click', () => handledDelete(index, row));
                let iconDelete = document.createElement("i");
                iconDelete.classList.add('bi', 'bi-trash');
                deleteButton.appendChild(iconDelete);

                groupButton.appendChild(viewButton);
                groupButton.appendChild(updateButton);
                groupButton.appendChild(deleteButton);
            })

            clearProduct();
            calculateTotals();

        } else {
            swal("Warning", "The amount field must not be 0.", "warning");
        }
    } else {
        swal("Warning", "The product field must not be empty.", "warning");
    }

});


// Eventos //
const handledCalculateAmount = () => {
    let price = (isNaN(parseFloat(document.querySelector("#txtPrice").value))) ? 0.00 : parseFloat(document.querySelector("#txtPrice").value);
    let quantity = (isNaN(parseInt(document.querySelector("#txtQuantity").value))) ? 0 : parseInt(document.querySelector("#txtQuantity").value);
    let valueAmount = multiplication(price, quantity);
    document.querySelector("#txtAmount").value = valueAmount;
}

const handledView = (rowProduct) => {
    let { quantity, product, id, price, amount } = rowProduct;
    $("#txtQuantityView").val(quantity);
    $("#txtProductView").val(product);
    $("#txtPriceView").val(price);
    $("#txtAmountView").val(amount);
}

const handledUpdate = (rowProduct, index) => {
    let { quantity, product, price, amount } = rowProduct;
    $("#txtQuantity").val(quantity);
    $("#txtProduct").val(product);
    $("#txtPrice").val(price);
    $("#txtAmount").val(amount);

    products.splice(index, 1);
    loadTable();
}

const handledDelete = (id) => {
    swal({
        title: "Are you sure that you want to remove the product?",
        text: "This process is irreversible",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                products.splice(id, 1);
                loadTable();
            }
        });
}


$("#btnGenerateOrder").click(function () {
    if (products.length > 0) {
        listCustomer = {
            name: $("#txtName").val(),
            lastname: $("#txtLastname").val(),
            company: $("#txtCompany").val(),
            phone: $("#txtPhone").val(),
            email: $("#txtEmail").val(),
            street: $("#txtStreet").val(),
            town: $("#txtTown").val(),
            zipcode: $("#txtZipcode").val(),
            contry: $("#txtCountry").val()
        }

        customer.push(listCustomer);

        swal({
            title: "Are you sure that you want to generate you order?",
            text: "This process is irreversible",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                swal("Information", "In construction", "info");
            });
    } else {
        swal("Warning", "You need to add at least one product", "warning");
    }
});

