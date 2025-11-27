
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("change", () => {
    const file = input.files[0];
    preview.innerHTML = "";

    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      showToast("Image too large (max 1.5 MB)");
      input.value = "";
      return;
    }

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
}

// Initialize previews
setupImagePreview("lost-item-image", "lost-image-preview");
setupImagePreview("found-item-image", "found-image-preview");

// -------------------------------
// Local Storage Helpers
// -------------------------------
function getItems() {
  return JSON.parse(localStorage.getItem("items") || "[]");
}

function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

// -------------------------------
// Add Item to List
// -------------------------------
function addItem(type, data) {
  const items = getItems();

  items.push({
    id: Date.now(),
    type,
    ...data
  });

  saveItems(items);
  renderItems();
  showToast(`${type.toUpperCase()} item added`);
}

// -------------------------------
// Render Items
// -------------------------------
function renderItems() {
  const list = document.getElementById("items-list-ul");
  const search = document.getElementById("search-input").value.toLowerCase();
  const filter = document.getElementById("filter-select").value;

  const items = getItems().filter(item => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search);

    const matchesFilter = filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li>No items found.</li>";
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item-meta"><strong>Type:</strong> ${item.type.toUpperCase()}</div>
      <strong>${item.itemName}</strong>
      <p><strong>Location:</strong> ${item.location}</p>
      <p>${item.description || ""}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      ${item.image ? `<img src="${item.image}" alt="Item Image">` : ""}
    `;

    list.appendChild(li);
  });
}

// -------------------------------
// Form Handlers
// -------------------------------
function handleForm(formId, type, imageInputId) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);
    const file = document.getElementById(imageInputId).files[0];

    let imageBase64 = "";

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageBase64 = reader.result;

        addItem(type, {
          itemName: formData.get("itemName"),
          location: formData.get("location"),
          description: formData.get("description"),
          contact: formData.get("contact"),
          image: imageBase64
        });

        form.reset();
        document.getElementById(imageInputId).value = "";
        document.getElementById(imageInputId.replace("image", "image-preview")).innerHTML = "";
      };
      reader.readAsDataURL(file);
    } else {
      addItem(type, {
        itemName: formData.get("itemName"),
        location: formData.get("location"),
        description: formData.get("description"),
        contact: formData.get("contact"),
        image: ""
      });

      form.reset();
    }
  });
}


handleForm("lost-item-form", "lost", "lost-item-image");
handleForm("found-item-form", "found", "found-item-image");


document.getElementById("search-input").addEventListener("input", renderItems);
document.getElementById("filter-select").addEventListener("change", renderItems);

renderItems();
