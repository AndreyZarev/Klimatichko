
window.addEventListener("DOMContentLoaded", () => {
    let linkArray = document.getElementsByClassName('category-link');

    for (let i = 0; i < linkArray.length; i++) {
        const link = linkArray[i];
        const selectedTypeValue = link.id; // e.g., "Високостенни климатици"

        link.addEventListener("click", (e) => {
            e.preventDefault();
            // Build URL with query params so products page loads with filters applied
            const keyword = "";
            const type = selectedTypeValue || "Категории";
            const label = "Марка";
            const page = 1;

            const url = `products.html?keyword=${encodeURIComponent(keyword)}&type=${encodeURIComponent(type)}&label=${encodeURIComponent(label)}&page=${page}`;

            // Keep localStorage for backward compatibility
            localStorage.setItem("keyword", JSON.stringify(keyword));
            localStorage.setItem("type", JSON.stringify(type));
            localStorage.setItem("label", JSON.stringify(label));

            window.location.href = url;
        });
    }
});
