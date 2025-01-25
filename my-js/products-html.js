window.addEventListener("DOMContentLoaded", () => {
    let searchButton = document.getElementsByClassName("search-button")[0];

    let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

    let keywordField = document.getElementsByClassName("search-field")[0];
    let selectedKeyword = JSON.parse(localStorage.getItem("keyword"))
    if (selectedKeyword) {
        keywordField.value = selectedKeyword
        changeTitle()
    }

    let selectedTypeValue = JSON.parse(localStorage.getItem("type"))
    if (selectedTypeValue) {
        typeAcOptions.value = selectedTypeValue
        changeTitle()

    }

    let selectedLabelValue = JSON.parse(localStorage.getItem("label"))
    if (selectedLabelValue) {
        labelsAcOptions.value = selectedLabelValue
        changeTitle()

    }


    let currentPage = JSON.parse(localStorage.getItem("currentPage")) || 1;
    const itemsPerPage = 9;

    searchButton.addEventListener("click", products)
    searchButton.addEventListener("click", changeTitle)


    function changeTitle() {
        debugger
        let title = document.getElementsByClassName("h1-promo")[0]
        title.textContent = "Резултат от търсенето"
    }

    function products() {
        let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
        let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];
        let selectedTypeValue = typeAcOptions.value;
        let selectedLabelValue = labelsAcOptions.value;
        let container = document.getElementsByClassName("product-div")[0]
        let selectedKeyword = document.getElementsByClassName("search-field")[0].value;

        debugger
        container.innerHTML = "";
        // Clear previous content

        fetch("data-json/all-products.json")
            .then(response => response.json())
            .then(products => {
                const filteredResults = products.filter(item => {
                    return (
                        (selectedKeyword === "" || item.keyword.toLowerCase().includes(selectedKeyword.toLowerCase())) &&
                        (selectedTypeValue === "Категории" || item.type === selectedTypeValue) &&
                        (selectedLabelValue === "Избери марка" || item.label === selectedLabelValue)
                    );
                });

                // Paginate filtered results
                const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
                const paginatedResults = filteredResults.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                );

                // Display products for the current page
                paginatedResults.forEach(product => {
                    const sectionHTML = createProductSection(product);
                    let sectionElement = document.createElement('div');

                    sectionElement.innerHTML = sectionHTML;
                    sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
                    sectionElement.addEventListener("click", () => { getToSingleProductPage(product.id) })
                    container.appendChild(sectionElement);
                });



                // Update pagination controls

                renderPaginationControls(totalPages);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }

    products()

    function renderPaginationControls(totalPages) {
        const paginationContainer = document.getElementById("pagination-controls");
        paginationContainer.innerHTML = ""; // Clear existing controls

        const dynamicSection = document.getElementById("products-section"); // The section to scroll to

        // Previous Button
        const prevButton = document.createElement("button");
        prevButton.textContent = "Предишна";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                products();
                dynamicSection.scrollIntoView({ behavior: "smooth" });
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.toggle("active", i === currentPage);
            pageButton.addEventListener("click", () => {
                currentPage = i;
                products();
                dynamicSection.scrollIntoView({ behavior: "smooth" });
            });
            paginationContainer.appendChild(pageButton);
        }

        // Next Button
        const nextButton = document.createElement("button");
        nextButton.textContent = "Следваща";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                products();
                dynamicSection.scrollIntoView({ behavior: "smooth" });
            }
        });
        paginationContainer.appendChild(nextButton);
    }




    function createProductSection(product) {
        return `
           <div class="property-item rounded overflow-hidden" id="${product.id}">
                                <div class="position-relative overflow-hidden img-ac-products ">
                                    <a href="#"><img class="img-fluid img-ac-products"
                                            src="${product.img}"
                                            alt=""></a>
                                
                                <div class=" pb-0 div-price">
                
                                    <h5 class = "normal-price">${product.price.toFixed(2)}лв</h5>

                                    <a class="d-block " href="#">${product.name}</a>

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

    function getToSingleProductPage(id) {
        // let currentPage = document.getElementsByClassName('active')[2]
        localStorage.setItem("currentPage", JSON.stringify(currentPage));

        debugger

        fetch('data-json/all-products.json')
            .then(response => response.json())
            .then(data => {
                const specificItem = data.find(item => item.id === id);
                const specificItems = data.filter(item => (item.id == id + 1) ||
                    (item.id == id + 2) || (item.id == id - 1));


                let container = document.createElement('div')
                container.classList.add("g-4", "row", "promo-div")

                localStorage.setItem("selectedProduct", JSON.stringify(specificItem));
                localStorage.setItem("similarProduct", JSON.stringify(specificItems));

                // Navigate to the new page
                window.location.href = "single-product-page.html";

            })
            .catch(error => console.error('Error fetching JSON:', error));
    }
}

)