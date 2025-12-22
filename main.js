const names = document.getElementById("name");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const tax = document.getElementById("tax");
const orderList = document.getElementById("orders");
const orders = [];

window.addOrder = () => {
    if (
        names.value &&
        !isNaN(parseInt(quantity.value, 10)) &&
        !isNaN(parseFloat(price.value)) &&
        !isNaN(parseFloat(tax.value))
    ) {
        orders.push({
            names: names.value,
            quantity: parseInt(quantity.value, 10),
            price: parseInt(price.value * 100, 10) / 100,
            tax: parseInt(tax.value * 100, 10) / 100,
        });
        names.value = "";
        quantity.value = "";
        price.value = "";
        tax.value = "";
        updateList();
    }
};

const updateList = () => {
    const total = orders.reduce(
        (totalPrice, order) =>
            totalPrice + order.quantity * order.price * (1 + order.tax / 100),
        0,
    );

    const table = document.createElement("table");
    const head = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Name", "Quantity", "Price", "Tax", "Total", ""].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    head.appendChild(headerRow);
    table.appendChild(head);

    const tbody = document.createElement("tbody");
    orders.forEach((order, i) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = order.names;
        tr.appendChild(tdName);

        const tdQty = document.createElement("td");
        tdQty.style.textAlign = "right";
        tdQty.textContent = order.quantity;
        tr.appendChild(tdQty);

        const tdPrice = document.createElement("td");
        tdPrice.style.textAlign = "right";
        tdPrice.textContent =
            "$" +
            order.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        tr.appendChild(tdPrice);

        const tdTax = document.createElement("td");
        tdTax.style.textAlign = "right";
        tdTax.textContent =
            order.tax.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + "%";
        tr.appendChild(tdTax);

        const tdTotal = document.createElement("td");
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

        const tdBtn = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => window.deleteOrder(i));
        tdBtn.appendChild(btn);
        tr.appendChild(tdBtn);

        tbody.appendChild(tr);
    });

    const totalRow = document.createElement("tr");
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

    orderList.replaceChildren(table);
};

window.deleteOrder = (i) => {
    if (
        confirm(
            "Are you sure you want to delete this task named " +
                orders[i].names +
                "?",
        )
    ) {
        orders.splice(i, 1);
        updateList();
    }
};
