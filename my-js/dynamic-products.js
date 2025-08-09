


window.addEventListener("DOMContentLoaded", () => {




    function getPromo() {

        let dynamicSection = document.getElementById("dynamic-section")
        // Update the "Още продукти" link to include current filters in the URL
        function updateMoreProductsLink() {
            const link = document.getElementById('more-products-link');
            if (!link) return;

            const keywordField1 = document.getElementsByClassName("search-field")[0];
            const keywordField2 = document.getElementsByClassName("search-field")[1];
            const typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
            const labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];
            const typeField = document.getElementsByClassName("type-field")[0];
            const labelField = document.getElementsByClassName("label-field")[0];

            let keyword = "";
            if (keywordField1 && keywordField1.value.trim()) keyword = keywordField1.value.trim();
            else if (keywordField2 && keywordField2.value.trim()) keyword = keywordField2.value.trim();

            let type = "Категории";
            if (typeField && typeField.value !== "Категории") type = typeField.value;
            else if (typeAcOptions && typeAcOptions.value !== "Категории") type = typeAcOptions.value;

            let label = "Марка";
            if (labelField && labelField.value !== "Марка") label = labelField.value;
            else if (labelsAcOptions && labelsAcOptions.value !== "Марка") label = labelsAcOptions.value;

            const url = `products.html?keyword=${encodeURIComponent(keyword)}&type=${encodeURIComponent(type)}&label=${encodeURIComponent(label)}&page=1`;
            link.setAttribute('href', url);
        }


        fetch("products/product-section.html")

            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load HTML file.");
                }
                return response.text(); // Get the HTML content as text
            })
            .then(data => {
                dynamicSection.innerHTML = data;
                // After injecting the HTML, wire up the More Products link with current filters
                updateMoreProductsLink();

                // Keep the link in sync if the user changes selections/inputs
                const keywordField1 = document.getElementsByClassName("search-field")[0];
                const keywordField2 = document.getElementsByClassName("search-field")[1];
                const typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
                const labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];
                const typeField = document.getElementsByClassName("type-field")[0];
                const labelField = document.getElementsByClassName("label-field")[0];

                keywordField1?.addEventListener('input', updateMoreProductsLink);
                keywordField2?.addEventListener('input', updateMoreProductsLink);
                typeAcOptions?.addEventListener('change', updateMoreProductsLink);
                labelsAcOptions?.addEventListener('change', updateMoreProductsLink);
                typeField?.addEventListener('change', updateMoreProductsLink);
                labelField?.addEventListener('change', updateMoreProductsLink);

                // Ensure click always navigates even if some overlay blocks default
                const moreLink = document.getElementById('more-products-link');
                moreLink?.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    updateMoreProductsLink();
                    const href = moreLink.getAttribute('href') || 'products.html';
                    window.location.href = href;
                });
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
                                    <h5 class="first-price">${product.price.toFixed(2)}лв / ${(product.price / 1.96).toFixed(2)}€</h5>
                                    <h5 class = "second-price">${currentPrice}лв / ${(currentPrice / 1.96).toFixed(2)}€</h5>

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
        // Simple navigation to single product page
        window.location.href = `single-product-page.html?id=${id}`;
    }


})
if (title.textContent == "Климатици на промоция") {
    getPromo()

}