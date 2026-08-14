class ShoppingItem {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
        this.purchased = false;
    }

    getDetails() {
        return `${this.name} - Quantity: ${this.quantity}`;
    }
}let shoppingItems = [];

function addItem() {
    const itemName = document.getElementById("itemName");
    const quantity = document.getElementById("quantity");

    const name = itemName.value.trim();
    const qty = parseInt(quantity.value);

    if (name === "") {
        alert("Please enter a shopping item.");
        return;
    }

    if (isNaN(qty) || qty < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    shoppingItems.push(new ShoppingItem(name, qty));
    });

    itemName.value = "";
    quantity.value = 1;

    displayItems();
}

function displayItems() {
    const list = document.getElementById("shoppingList");
    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    list.innerHTML = "";

    const filteredItems = shoppingItems.filter(item =>
        item.name.toLowerCase().includes(search)
    );

    filteredItems.forEach(item => {

        const originalIndex = shoppingItems.indexOf(item);

        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        const info = document.createElement("div");
        info.className = "item-info";

        if (item.purchased) {
            info.classList.add("purchased");
        }

        info.innerHTML = `
            ${item.name}<br>
            Quantity: ${item.quantity}
        `;

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const purchasedButton = document.createElement("button");
        purchasedButton.textContent = item.purchased
            ? "Unpurchase"
            : "Purchased";

        purchasedButton.onclick = function () {
            shoppingItems[originalIndex].purchased =
                !shoppingItems[originalIndex].purchased;

            displayItems();
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function () {
            editItem(originalIndex);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            deleteItem(originalIndex);
        };

        buttons.appendChild(purchasedButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);

        itemDiv.appendChild(info);
        itemDiv.appendChild(buttons);

        list.appendChild(itemDiv);
    });

    document.getElementById("totalItems").textContent =
        shoppingItems.length;
}

function deleteItem(index) {
    shoppingItems.splice(index, 1);
    displayItems();
}

function editItem(index) {

    const newName = prompt(
        "Enter the new item name:",
        shoppingItems[index].name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }

    const newQuantity = prompt(
        "Enter the new quantity:",
        shoppingItems[index].quantity
    );

    const qty = parseInt(newQuantity);

    if (isNaN(qty) || qty < 1) {
        alert("Invalid quantity.");
        return;
    }

    shoppingItems[index].name = newName.trim();
    shoppingItems[index].quantity = qty;

    displayItems();
}

displayItems();
