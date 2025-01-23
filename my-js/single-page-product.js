window.addEventListener("DOMContentLoaded", () => {


    const productData = JSON.parse(localStorage.getItem("selectedProduct"));

    if (productData) {
        singleProduct(productData)

    }

    function singleProduct(product) {
        debugger

        let attachProduct = document.getElementById("attach-product")
        const productElement = document.createElement("div");
        productElement.innerHTML = product.innerHTML0
        console.log(attachProduct);
        console.log(product);


        attachProduct.appendChild(product)

        let title = document.getElementsByClassName("h1-promo")[0]

        title.textContent = `Климатик ${product.name}`;
        window.location.href = "single-product-page.html";

    }

})