document.addEventListener("DOMContentLoaded", () => {
    let singleProduct = document.getElementsByClassName("ac-product")[0];
    let productsCategory = document.getElementById("products-section");
    let container = document.getElementsByClassName("container-wrap")[0]
    let singleProductSection = document.getElementsByClassName("single-product")
    function getToSingleProductPage(e, id) {
        e.preventDefault();
        debugger
        let currectProduct = document.getElementById(id);
        container.appendChild(currectProduct)
        productsCategory.classList.add("invisible");
        singleProductSection.classList.remove("invisible");
    }

    singleProduct.addEventListener("click", getToSingleProductPage);
});