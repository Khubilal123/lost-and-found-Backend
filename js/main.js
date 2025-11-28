const API_BASE = "https://lost-and-found-backend-nzre.onrender.com";

// ✅ Add Item
async function addItem(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    const newItem = { name, description, location };

    try {
        const res = await fetch(`${API_BASE}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        });

        if (!res.ok) throw new Error("Failed to add item");

        document.getElementById("itemForm").reset();
        loadItems();
    } catch (err) {
        console.error(err);
        alert("Error adding item");
    }
}

// ✅ Load Items
async function loadItems() {
    try {
        const res = await fetch(`${API_BASE}/items`);
        const items = await res.json();

        const list = document.getElementById("itemsList");
        list.innerHTML = "";

        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "item-card";

            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            `;

            list.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        alert("Error loading items");
    }
}

// ✅ Delete Item
async function deleteItem(id) {
    try {
        const res = await fetch(`${API_BASE}/items/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Failed to delete");

        loadItems();
    } catch (err) {
        console.error(err);
        alert("Error deleting item");
    }
}

document.addEventListener("DOMContentLoaded", loadItems);
document.getElementById("itemForm").addEventListener("submit", addItem);
