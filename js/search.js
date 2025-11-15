document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    // Only your real website pages
    const pages = [
        { name: "home", url: "index.html" },
        { name: "menu", url: "menu.html" },
        { name: "booking", url: "booking.html" },
        { name: "contact", url: "contact.html" },
        { name: "gallery", url: "gallery.html" }
    ];

    // Search button click
    searchBtn.addEventListener("click", function () {
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            alert("Please type something to search!");
            return;
        }

        const found = pages.find(p => p.name === query);

        if (found) {
            window.location.href = found.url;
        } else {
            alert(`No results found for '${query}'`);
        }
    });

    // Enter key support
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });
});
