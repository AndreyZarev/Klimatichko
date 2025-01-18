


window.addEventListener("load", function () {

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



    function createProductSection(product) {
        return `
         
                            <div class="property-item rounded overflow-hidden " id="klb-24hrhi"
                                onclick="getToSingleProductPage(id)">
                                <div class="position-relative overflow-hidden img-ac-products ">
                                    <a href=""><img class="img-fluid img-ac-products"
                                            src="img/new/ac-types/inventor-ac/kaisai/KAISAI ICE KLB-24HRHI.jpg"
                                            alt=""></a>
                                    <div
                                        class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                                        ${product.discount}</div>

                                </div>
                                <div class=" pb-0 div-price">
                                    <h5 class="text-primary mb-3">${product.price}</h5>
                                    <a class="d-block mb-2" href="">${product.type} ${product.name}</a>
                                    <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${product.location}</p>
                                </div>
                                <div class="d-flex border-top">
                                    <small class="flex-fill text-center border-end py-2">${product.power}</small>
                                    <small class="flex-fill text-center border-end py-2">3 Bed</small>
                                    <small class="flex-fill text-center py-2">${product.energy}</small>
                                </div>
                            </div>
                   
            `;
    }
    let container = document.createElement('div')
    container.classList.add("g-4", "row")
    // Fetching the products from a JSON file
    fetch('data-json/promotion-ac.json')
        .then(response => response.json())
        .then(products => {
            console.log(products);

            products.forEach(product => {
                const sectionHTML = createProductSection(product);
                let sectionElement = document.createElement('div')

                sectionElement.innerHTML = sectionHTML;
                sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products")
                container.appendChild(sectionElement);

                let attachElement = document.getElementById("attach-promo")


                attachElement.appendChild(container)

            });
        })
        .catch(error => console.error('Error fetching product data:', error));


    let productList = document.getElementById("product-list")



})
