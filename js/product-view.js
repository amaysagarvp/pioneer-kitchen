// get product id from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("products.json")
  .then(response => response.json())
  .then(products => {
    const product = products.find(p => p.id == productId);

    if (!product) {
      document.getElementById("productContainer").innerHTML = "<h3>Product not found!</h3>";
      return;
    }

    const html = `
      <div class="row">
        <div class="col-md-6">
          <img src="${product.image}" class="img-fluid rounded">
        </div>

        <div class="col-md-6">
          <h2>${product.name}</h2>
          <h4 class="text-muted">${product.category}</h4>
          <h3 class="text-primary">₹ ${product.price}</h3>

          <p class="mt-3">${product.description}</p>

          <a href="index.html" class="btn btn-secondary mt-3">Back</a>
        </div>
      </div>
    `;

    document.getElementById("productContainer").innerHTML = html;
  });
