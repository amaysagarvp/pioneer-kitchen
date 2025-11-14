document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('menu-container');
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-item');
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <span class="price">₹${item.price}</span>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.log('Error:', error));
});
