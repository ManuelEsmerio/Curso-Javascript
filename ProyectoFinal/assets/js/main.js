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

console.log(month[0]);

const formOrder = document.querySelector("#formOrder");

formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(document.forms.formOrder);

    let tbody = document.querySelector("#listOrders tbody");
    
    for (let i = 0; i <= 0; i++) {
        let row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = 1;
        row.insertCell(1).innerHTML = formData.get('txtName');
        row.insertCell(2).innerHTML = formData.get('txtPhone');
        row.insertCell(3).innerHTML = formData.get('txtAmount');
        row.insertCell(4).innerHTML = getStringDate();
        let groupButton = row.insertCell(5);

        let viewButton = document.createElement('button');
        viewButton.classList.add('btn', 'btn-primary', 'btn-xs', 'm-1');
        let iconView = document.createElement("i");
        iconView.classList.add('bi','bi-eye-fill');
        viewButton.appendChild(iconView);

        let updateButton = document.createElement('button');
        updateButton.classList.add('btn', 'btn-warning', 'btn-xs','m-1');
        let iconUpdate = document.createElement("i");
        iconUpdate.classList.add('bi','bi-pencil-fill');
        updateButton.appendChild(iconUpdate);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'm-1');
        let iconDelete = document.createElement("i");
        iconDelete.classList.add('bi','bi-trash');
        deleteButton.appendChild(iconDelete);

        groupButton.appendChild(viewButton);
        groupButton.appendChild(updateButton);
        groupButton.appendChild(deleteButton);

        clear();
    }
    
} );


const handledCalculateAmount = () => {
    let price    = (isNaN(parseFloat(document.querySelector("#txtPrice").value))) ? 0.00 : parseFloat(document.querySelector("#txtPrice").value);
    let quantity = (isNaN(parseInt(document.querySelector("#txtQuantity").value))) ? 0 : parseInt(document.querySelector("#txtQuantity").value);
    let valueAmount = multiplication(price,quantity);
    document.querySelector("#txtAmount").value = valueAmount;
}



// Algorithmic function //
const multiplication = (a,b) => a * b;

const getStringDate = () =>{
    let date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} `;
}

const clear = () => {
    document.querySelector("#txtName").value = "";
    document.querySelector("#txtPhone").value = "";
    document.querySelector("#txtAddress").value = "";
    document.querySelector("#txtQuantity").value = "0";
    document.querySelector("#txtProduct").value = "";
    document.querySelector("#txtPrice").value = "0.00";
    document.querySelector("#txtAmount").value = "0.00";
}