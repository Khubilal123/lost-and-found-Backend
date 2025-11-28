const API_BASE = "https://lost-and-found-backend-nzre.onrender.com";

// ✅ Add Lost Item
async function addItem(event) {
    event.preventDefault();

    const name = document.getElementById("lost-item-name").value;
    const description = document.getElementById("lost-item-desc").value;
    const location = document.getElementById("lost-item-location").value;
    const contact = document.getElementById("lost-item-contact").value;

    const newItem = { name, description, location, contact, type: "lost" };

    try {
        const res = await fetch(`${API_BASE}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        });

        if (!res.ok) throw new Error("Failed to add item");

        document.getElementById("lost-item-form").reset();
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

        const list = document.getElementById("items-list-ul");
        list.innerHTML = "";

        items.forEach(item => {
            const li = document.createElement("li");
            li.className = "item-card";

            li.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Contact:</strong> ${item.contact}</p>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            `;

            list.appendChild(li);
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
document.getElementById("lost-item-form").addEventListener("submit", addItem);
