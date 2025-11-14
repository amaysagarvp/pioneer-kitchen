let products = [];

// Load JSON file
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data; // store the products
  });

document.getElementById("searchBtn").addEventListener("click", searchProduct);

function searchProduct() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let resultDiv = document.getElementById("searchResult");

  if (input.trim() === "") {
    resultDiv.innerHTML = "<p>Please type something.</p>";
    return;
  }

  // Filter JSON products
  let results = products.filter(p =>
    p.name.toLowerCase().includes(input)
  );

  if (results.length === 0) {
    resultDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  // Create product cards
  let html = "";
  results.forEach(p => {
    html += `
      <div class="card mb-2 p-2" style="width: 250px;">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p>₹${p.price}</p>
          <a href="product-view.html?id=${p.id}" class="btn btn-primary">View</a>
        </div>
      </div>
    `;
  });

  resultDiv.innerHTML = html;
}
