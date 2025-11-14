fetch("products.json")
  .then(response => response.json())
  .then(products => {
    const productRow = document.getElementById("productRow");

    products.forEach(product => {
      const card = `
        <div class="col-md-4" style="margin-bottom: 20px;">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.category}</p>
               <a href="product-view.html?id=${product.id}" class="btn btn-outline-primary">View</a>
            </div>
          </div>
        </div>
      `;

      productRow.innerHTML += card;
    });
  })
  .catch(error => console.error("Error loading products:", error));
