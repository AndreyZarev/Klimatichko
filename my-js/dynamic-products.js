


window.addEventListener("DOMContentLoaded", () => {




    function getPromo() {

        let dynamicSection = document.getElementById("dynamic-section")

        fetch("products/product-section.html")

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



        function createPromoProductSection(product) {
            let currentPrice = product.price * 0.95
            currentPrice = currentPrice.toFixed(2)
            return `
         
                            <div class="property-item rounded overflow-hidden " id="klb-24hrhi"
                                onclick="getToSingleProductPage(id)">
                                <div class="position-relative overflow-hidden img-ac-products ">
                                    <a href="#"><img class="img-fluid img-ac-products"
                                            src="${product.img}"
                                            alt=""></a>
                                    <div
                                        class="bg-primary discount rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                                        ${product.discount}</div>

                                </div>
                                <div class=" pb-0 div-price">
                                    <h5 class="first-price">${product.price.toFixed(2)}лв </h5>
                                    <h5 class = "second-price">${currentPrice}лв</h5>

                                    <a class="d-block" href="#">${product.type} ${product.name}</a>

                                </div>
                                <a class="call-us" href="tel: 0896081213">
                                 <span>
                                    <img class="call-us-icon" src="img/new/icons8-phone-50.png" alt="" srcset="">
                                </span>
                                Обади се</a>
                                <div class="d-flex border-top">
                                    <small class="flex-fill text-center border-end py-2">${product.size} BTU</small>
                                    <small class="flex-fill text-center border-end py-2"><a class="label-link" href="#">${product.label}</a></small>
                                    <small class="flex-fill text-center py-2">Клас: ${product.energy}</small>
                                </div>
                            </div>
                   
            `;
        }


        let container = document.createElement('div')
        container.classList.add("g-4", "row", "promo-div")

        fetch('data-json/types/promo-ac.json')
            .then(response => response.json())
            .then(products => {
                console.log(products);

                products.forEach(product => {
                    const sectionHTML = createPromoProductSection(product);
                    let sectionElement = document.createElement('div')

                    sectionElement.innerHTML = sectionHTML;
                    sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products")
                    sectionElement.addEventListener("click", () => { getToSingleProductPage(product.id) })
                    container.appendChild(sectionElement);

                    let attachElement = document.getElementById("attach-promo")


                    attachElement.appendChild(container)

                });
            })
            .catch(error => console.error('Error fetching product data:', error));

    }
    let title = document.getElementsByClassName("h1-promo")[0]
    console.log(title);




    getPromo()


    function getToSingleProductPage(id) {
        debugger

        fetch('data-json/types/promo-ac.json')
            .then(response => response.json())
            .then(data => {
                const specificItem = data.find(item => item.id === id);
                const specificItems = data.filter(item => (item.id == id + 1) ||
                    (item.id == id + 2) || (item.id == id - 1));


                let container = document.createElement('div')
                container.classList.add("g-4", "row", "promo-div")

                localStorage.setItem("selectedProduct", JSON.stringify(specificItem));
                localStorage.setItem("similarProduct", JSON.stringify(specificItems));


                debugger
                // Navigate to the new page
                window.location.href = "single-product-page.html";

            })
            .catch(error => console.error('Error fetching JSON:', error));
    }


})
if (title.textContent == "Климатици на промоция") {
    getPromo()

}