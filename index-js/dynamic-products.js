


window.addEventListener("load", function () {

    let dynamicSection = document.getElementById("dynamic-section")

    fetch("inventor-ac/inventor-acs.html")

        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load HTML file.");
            }
            return response.text(); // Get the HTML content as text
        })
        .then(data => {
            dynamicSection.innerHTML = data;
        })
        .catch(error => console.error(error));


    let productList = document.getElementById("product-list")



})