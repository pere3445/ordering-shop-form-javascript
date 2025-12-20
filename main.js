let names = document.getElementById("name");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let orderList = document.getElementById("orders");
let totalPriceText = document.getElementById("total-price");
let orders = [];

function addOrder() {
    if (
        names.value &&
        !isNaN(parseInt(quantity.value)) &&
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
}
function updateList() {
    let total = orders.reduce(
        (totalPrice, order) =>
            totalPrice + order.quantity * order.price * (1 + order.tax / 100),
        0,
    );
    totalPriceText.innerText = total;
}
