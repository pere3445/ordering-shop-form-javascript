const names = document.getElementById("name"); //order name
const quantity = document.getElementById("quantity"); //order quantity
const price = document.getElementById("price"); //order price
const tax = document.getElementById("tax"); //order tax in percent
const orderList = document.getElementById("orders"); //list of orders element
const orders = []; //list of orders

window.addOrder = () => {
    //function to add order to list
    if (
        names.value &&
        !isNaN(parseInt(quantity.value, 10)) &&
        !isNaN(parseFloat(price.value)) &&
        !isNaN(parseFloat(tax.value))
    ) {
        //check if input values are valid
        orders.push({
            names: names.value,
            quantity: parseInt(quantity.value, 10),
            price: parseInt(price.value * 100, 10) / 100,
            tax: parseInt(tax.value * 100, 10) / 100,
        });
        names.value = ""; //set all input values to blank (empty text)
        quantity.value = "";
        price.value = "";
        tax.value = "";
        updateList(); //update order list for each record
    }
};

const updateList = () => {
    //function to update order list
    const total = orders.reduce(
        (totalPrice, order) =>
            totalPrice + order.quantity * order.price * (1 + order.tax / 100),
        0,
    ); //calculate total price
    const table = document.createElement("table"); //build table using DOM APIs (avoid innerHTML for safety)
    const head = document.createElement("thead"); //header
    const headerRow = document.createElement("tr");

    ["Name", "Quantity", "Price", "Tax", "Total", ""].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header; //set HTML content output for all order records
        headerRow.appendChild(th);
    });
    head.appendChild(headerRow);
    table.appendChild(head);

    const tbody = document.createElement("tbody"); //body rows
    orders.forEach((order, i) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td"); //name
        tdName.textContent = order.names;
        tr.appendChild(tdName);

        const tdQty = document.createElement("td"); //quantity
        tdQty.style.textAlign = "right";
        tdQty.textContent = order.quantity;
        tr.appendChild(tdQty);

        const tdPrice = document.createElement("td"); //price
        tdPrice.style.textAlign = "right";
        tdPrice.textContent =
            "$" +
            order.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        tr.appendChild(tdPrice);

        const tdTax = document.createElement("td"); //tax
        tdTax.style.textAlign = "right";
        tdTax.textContent =
            order.tax.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + "%";
        tr.appendChild(tdTax);

        const tdTotal = document.createElement("td"); //total
        tdTotal.style.textAlign = "right";
        tdTotal.textContent =
            "$" +
            (
                order.quantity *
                order.price *
                (1 + order.tax / 100)
            ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        tr.appendChild(tdTotal);

        const tdBtn = document.createElement("td"); //delete button
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => window.deleteOrder(i));
        tdBtn.appendChild(btn);
        tr.appendChild(tdBtn);

        tbody.appendChild(tr);
    });

    const totalRow = document.createElement("tr"); //total row
    const tdEmpty = document.createElement("td");
    tdEmpty.setAttribute("colspan", "4");
    totalRow.appendChild(tdEmpty);
    const tdTotalLabel = document.createElement("td");
    tdTotalLabel.style.textAlign = "right";
    tdTotalLabel.textContent =
        "Total: $" +
        total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    totalRow.appendChild(tdTotalLabel);
    totalRow.appendChild(document.createElement("td"));
    tbody.appendChild(totalRow);

    table.appendChild(tbody);

    orderList.replaceChildren(table); //replace previous content safely without using innerHTML
};

window.deleteOrder = (i) => {
    //function to delete order from list
    if (
        confirm(
            "Are you sure you want to delete this task named " +
                orders[i].names +
                "?",
        )
    ) {
        orders.splice(i, 1); //remove order from index i
        updateList();
    }
};
