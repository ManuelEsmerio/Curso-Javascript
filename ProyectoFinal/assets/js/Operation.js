// Algorithmic function //
const multiplication = (a, b) => a * b;

const getStringDate = () => {
    let date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} `;
}

const countProducts = () => {
    return products.reduce((a,b) => parseInt(a) + parseInt(b.quantity), 0);
}

const getSubtotal = () => {
    return products.reduce((a,b) => parseInt(a) + parseInt(b.amount), 0);
}
 
const getTaxes = (validate) => {
    return (validate) ? parseFloat(getSubtotal()) * 0.16 : 0.00;
}

const getTotalWithTaxes = () => {
    return parseFloat(getSubtotal()) + parseFloat(getTaxes());
}

const clearProduct = () => {
    document.querySelector("#txtQuantity").value = "1";
    document.querySelector("#txtProduct").value = "";
    document.querySelector("#txtPrice").value = "0.00";
    document.querySelector("#txtAmount").value = "0.00";
    $( "#txtQuantity" ).focus();
}

const loadTable = () => {

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
        updateButton.addEventListener('click', () => handledUpdate(item, index));
        let iconUpdate = document.createElement("i");
        iconUpdate.classList.add('bi', 'bi-pencil-fill');
        updateButton.appendChild(iconUpdate);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'm-1');
        deleteButton.addEventListener('click', () => handledDelete(index));
        let iconDelete = document.createElement("i");
        iconDelete.classList.add('bi', 'bi-trash');
        deleteButton.appendChild(iconDelete);

        groupButton.appendChild(viewButton);
        groupButton.appendChild(updateButton);
        groupButton.appendChild(deleteButton);
    })

    document.querySelector("#spanTotalProducts").innerHTML = countProducts();
    document.querySelector("#spanTotalToPay").innerHTML = numberFormat2.format(getSubtotal());
    validateExchangeRate();
}


const validatePhone = () => {
    let phone = $("#txtPhone").val();
    (phone.length  != 10) &&
        swal("Warning", "invalid value for the phone field. \n The phone field must be 10 number.", "warning"); $("#txtPhone").focus()
}

const validateEmail = () => {
    let email = $("#txtEmail").val();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    (!re.test(String(email).toLowerCase())) &&
        swal("Warning", "invalid value for the email field. \n The email field must contain at @ and . to be successfully validated.", "warning"); $("#txtEmail").focus();
    
}