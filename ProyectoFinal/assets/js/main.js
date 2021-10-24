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

let COUNTER_EXCHANGE_RATE = 0;

formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formOrder);

    if (formData.get('txtProduct') != "") {
        if (formData.get('txtAmount') != "0.00") {
            if (document.querySelector("#txtCountry").value != "") {

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
                    viewButton.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1');
                    viewButton.setAttribute('data-bs-toggle', 'modal');
                    viewButton.setAttribute('data-bs-target', '#exampleModal');
                    viewButton.addEventListener('click', () => handledView(item));
                    let iconView = document.createElement("i");
                    iconView.classList.add('bi', 'bi-eye-fill');
                    viewButton.appendChild(iconView);

                    let updateButton = document.createElement('button');
                    updateButton.classList.add('btn', 'btn-warning', 'btn-sm', 'm-1');
                    updateButton.addEventListener('click', () => handledUpdate(item, row));
                    let iconUpdate = document.createElement("i");
                    iconUpdate.classList.add('bi', 'bi-pencil-fill');
                    updateButton.appendChild(iconUpdate);

                    let deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'm-1');
                    deleteButton.addEventListener('click', () => handledDelete(index, row));
                    let iconDelete = document.createElement("i");
                    iconDelete.classList.add('bi', 'bi-trash');
                    deleteButton.appendChild(iconDelete);

                    groupButton.appendChild(viewButton);
                    groupButton.appendChild(updateButton);
                    groupButton.appendChild(deleteButton);
                })

                document.querySelector("#spanTotalProducts").innerHTML = countProducts();

                if (document.querySelector("#txtCountry").value == "Estados Unidos") {
                    document.querySelector("#spanTotalToPay").innerHTML = `${numberFormat2.format(getSubtotal())} USD`;
                }else{
                    document.querySelector("#spanTotalToPay").innerHTML = `${numberFormat2.format(getSubtotal())} MXN`;
                }                

                clearProduct();
                validateExchangeRate();

            } else {
                swal("Warning", "It's required to select a country by the exchange rate.", "warning");
            }

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

const validateExchangeRate = () => {
    if (products.length > 0) {
        $("#txtCountry").attr('disabled', 'disabled');
        $("#txtExchangeRate").attr('readonly', 'readonly');
    }
    else {
        $("#txtCountry").removeAttr('disabled');
        $("#txtExchangeRate").removeAttr('readonly');
    }
}

const changeCurrencyExchange = () => {

    if (COUNTER_EXCHANGE_RATE == 0) {
        let exchangeRate = document.querySelector("#txtExchangeRate").value;

        products.map(item => {
            item.price = parseFloat(item.price) * parseFloat(exchangeRate);
            item.amount = parseFloat(item.price) * parseFloat(item.quantity);
        })


        let tbody = document.querySelector("#noteProducts tbody");
        tbody.innerHTML = "";

        products.map((item, index) => {
            let row = tbody.insertRow(index);
            row.insertCell(0).innerHTML = item.id;
            row.insertCell(1).innerHTML = item.product;
            row.insertCell(2).innerHTML = item.quantity;
            row.insertCell(3).innerHTML = numberFormat2.format(item.price);
            row.insertCell(4).innerHTML = numberFormat2.format(item.amount);
        })

        document.querySelector("#noteTotalProducts").innerHTML = countProducts();

        document.querySelector("#noteSubtotal").innerHTML = `${numberFormat2.format(getSubtotal())} MXN`;
        document.querySelector("#noteTaxes").innerHTML = `${numberFormat2.format(getTaxes(true))} MXN`;
        document.querySelector("#noteTotal").innerHTML = `${numberFormat2.format(getTotalWithTaxes())} MXN`;

        COUNTER_EXCHANGE_RATE = 1;

    }
    else {
        let exchangeRate = document.querySelector("#txtExchangeRate").value;

        products.map(item => {
            item.price = parseFloat(item.price) / parseFloat(exchangeRate);
            item.amount = parseFloat(item.price) * parseFloat(item.quantity);
        })

        let tbody = document.querySelector("#noteProducts tbody");
        tbody.innerHTML = "";

        products.map((item, index) => {
            let row = tbody.insertRow(index);
            row.insertCell(0).innerHTML = item.id;
            row.insertCell(1).innerHTML = item.product;
            row.insertCell(2).innerHTML = item.quantity;
            row.insertCell(3).innerHTML = numberFormat2.format(item.price);
            row.insertCell(4).innerHTML = numberFormat2.format(item.amount);
        })

        document.querySelector("#noteTotalProducts").innerHTML = countProducts();

        document.querySelector("#noteSubtotal").innerHTML = `${numberFormat2.format(getSubtotal())} USD`;
        document.querySelector("#noteTaxes").innerHTML = `${numberFormat2.format(getTaxes(false))} USD`;
        document.querySelector("#noteTotal").innerHTML = `${numberFormat2.format(getTotalWithTaxes())} USD`;

        COUNTER_EXCHANGE_RATE = 0;

    }

}


// Este es un ejemplo consumir un servicio Rest, solo que el servicio que necesito para obtener el tipo de cambio es de paga por lo que hago una simulacion
const showExchangeRate = () => {
    let country = document.querySelector("#txtCountry").value;

    if (country == "Estados Unidos") {
        $.ajax(
            'https://manuelesmeriogarcia.000webhostapp.com/data/index.php',
            {
                success: function (data) {
                    console.log(data);
                    let parse = JSON.parse(data);
                    let date = new Date();
                    document.querySelector("#txtExchangeRate").value = parse.exchange;
                    $("#dateExchangeRate").text(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                    $("#divTypeOfChange").css('display', '');
                    $(".input-group-text").text("USD");
                    $(".input-group-text").css('display', '');
                },
                error: function (e) {
                    console.log(e);
                }
            }
        );
    }
    else if (country == "México") {
        $("#divTypeOfChange").css('display', 'none');
        $(".input-group-text").text("MXN");
        $(".input-group-text").css('display', '');
    }
    else {
        $("#divTypeOfChange").css('display', 'none');
        $(".input-group-text").text("");
        $(".input-group-text").css('display', 'none');
    }
}


$("#btnGenerateOrder").click(function () {
    // console.log(document.querySelector("#txtCountry").value);
    listCustomer = {
        name: $("#txtName").val(),
        lastname: $("#txtLastname").val(),
        company: $("#txtCompany").val(),
        phone: $("#txtPhone").val(),
        email: $("#txtEmail").val(),
        street: $("#txtStreet").val(),
        town: $("#txtTown").val(),
        zipcode: $("#txtZipcode").val(),
        country: $("#txtCountry").val()
    }

    if (products.length > 0) {
        if (listCustomer.name != "" && listCustomer.lastname != "" && listCustomer.company != "" && listCustomer.phone != "" && listCustomer.email != "") {

            $("#noteCustomer").text(` ${listCustomer.name.trim().toUpperCase()} ${listCustomer.lastname.trim().toUpperCase()}`);
            $("#noteCompany").text(` ${listCustomer.company.trim().toUpperCase()}`);
            $("#notePhone").text(`${listCustomer.phone}`);
            $("#noteEmail").text(`${listCustomer.email}`);
            $("#noteAddress").text(`${listCustomer.street} ${listCustomer.town}, ${listCustomer.zipcode} ${listCustomer.country}`);

            let tbody = document.querySelector("#noteProducts tbody");
            tbody.innerHTML = "";

            products.map((item, index) => {
                let row = tbody.insertRow(index);
                row.insertCell(0).innerHTML = item.id;
                row.insertCell(1).innerHTML = item.product;
                row.insertCell(2).innerHTML = item.quantity;
                row.insertCell(3).innerHTML = numberFormat2.format(item.price);
                row.insertCell(4).innerHTML = numberFormat2.format(item.amount);
            })

            document.querySelector("#noteTotalProducts").innerHTML = countProducts();

            if (document.querySelector("#txtCountry").value == 'Estados Unidos') {
                $("#btnChangeCurrency").css('display', '');
                document.querySelector("#noteSubtotal").innerHTML = `${numberFormat2.format(getSubtotal())} USD`;
                document.querySelector("#noteTaxes").innerHTML = `${numberFormat2.format(getTaxes(false))} USD`;
                document.querySelector("#noteTotal").innerHTML = `${numberFormat2.format(getTotalWithTaxes())} USD`;
            } else {
                $("#btnChangeCurrency").css('display', 'none');
                document.querySelector("#noteSubtotal").innerHTML = `${numberFormat2.format(getSubtotal())} MXN`;
                document.querySelector("#noteTaxes").innerHTML = `${numberFormat2.format(getTaxes(true))} MXN`;
                document.querySelector("#noteTotal").innerHTML = `${numberFormat2.format(getTotalWithTaxes())} MXN`;
            }

            $("#staticBackdrop").modal("show");
        }
        else {
            swal("Warning", "It's necessary to add the customer information", "warning");
        }

    } else {
        swal("Warning", "It's required to add at least one product, to complete de order sale", "warning");
    }
});

$("#generateInvoice").click(function () {
    swal({
        title: "Are you sure to generate the invoice?",
        text: "This process is irreversible",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {

            swal({
                title: "Good job!",
                text: "Invoice successfully generated",
                icon: "success",
                button: "Ok",
            });

            setTimeout(() => {
                location.reload();
            }, 3000);
        });
})

