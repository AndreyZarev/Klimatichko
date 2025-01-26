
window.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("currentPage")
    let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

    let searchButton1 = document.getElementsByClassName("search-button")[0];
    let searchButton2 = document.getElementsByClassName("search-button")[1];




    let currentPage = 1;
    const itemsPerPage = 9;



    searchButton1.addEventListener("click", search)
    searchButton2.addEventListener("click", search)


    const keywordDiv = document.getElementsByClassName("keyword-div")[0];
    const keywordInput = document.getElementsByClassName('search-field ')[1];

    const typeDiv = document.getElementsByClassName("type-div")[0]
    const typeField = document.getElementsByClassName('type-field')[0];

    const labelDiv = document.getElementsByClassName("label-div")[0]
    const labelField = document.getElementsByClassName('label-field')[0];

    if (keywordInput) {
        console.log(keywordInput);

        debugger
        // Add focus event listener to the input field
        keywordInput.addEventListener('focus', () => {
            // Expand the input field
            keywordInput.classList.add('expanded');
            keywordDiv.classList.add('expanded2');
            // Hide the other fields
            // typeField.classList.add('contract');
            typeDiv.classList.add('contract');

            // labelField.classList.add('contract');
            labelDiv.classList.add('contract');

            searchButton2.classList.add('contract');

        });

        // Add blur event listener to the input field
        keywordInput.addEventListener('blur', () => {
            // Shrink the input field back to normal
            keywordInput.classList.remove('expanded');
            keywordDiv.classList.remove('expanded2');

            // Show the other fields
            typeField.classList.remove('contract');
            typeDiv.classList.remove('contract');

            labelField.classList.remove('contract');
            labelDiv.classList.remove('contract');

            searchButton2.classList.remove('contract');
        });


    }


    function search() {


        // pullProducts()
        let selectedKeyword1 = document.getElementsByClassName("search-field")[0].value;
        let selectedKeyword2 = document.getElementsByClassName("search-field")[1].value;

        if (selectedKeyword1) {
            localStorage.setItem("keyword", JSON.stringify(selectedKeyword1))
        } else {
            localStorage.setItem("keyword", JSON.stringify(selectedKeyword2))

        }

        let selectedTypeValue = ""
        if (typeField.value) {
            selectedTypeValue = typeField.value
        } else {
            selectedTypeValue = typeAcOptions.value;
        }

        let selectedLabelValue = ""

        if (labelField.value) {
            selectedLabelValue = labelField.value
        } else {
            selectedLabelValue = labelsAcOptions.value;

        }

        localStorage.setItem("type", JSON.stringify(selectedTypeValue))
        localStorage.setItem("label", JSON.stringify(selectedLabelValue))

        window.location.href = "products.html";


    }

    function pullProducts() {
        let container = document.getElementsByClassName("promo-div")[0];

        container.innerHTML = ""; // Clear previous content

        fetch("data-json/all-products.json")
            .then(response => response.json())
            .then(products => {
                const filteredResults = products.filter(item => {
                    return (
                        (selectedKeyword === "" || item.keyword.toLowerCase().includes(selectedKeyword.toLowerCase())) &&
                        (selectedTypeValue === "Категории" || item.type === selectedTypeValue) &&
                        (selectedLabelValue === "Марка" || item.label === selectedLabelValue)
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
                // let productHtml = document.getElementsByClassName("product-html")[0]

                let title = document.getElementsByClassName("h1-promo")[0]

                title.textContent = "Резултати от търсенето"



                // Update pagination controls

                renderPaginationControls(totalPages);


            })
            .catch(error => console.error('Error fetching product data:', error));
    }


    function renderPaginationControls(totalPages) {
        const paginationContainer = document.getElementById("pagination-controls");
        paginationContainer.innerHTML = ""; // Clear existing controls

        const dynamicSection = document.getElementById("dynamic-section"); // The section to scroll to

        // Previous Button
        const prevButton = document.createElement("button");
        prevButton.textContent = "Предишна";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                pullProducts(e);
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
                pullProducts();
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
                pullProducts();
                dynamicSection.scrollIntoView({ behavior: "smooth" });
            }
        });
        paginationContainer.appendChild(nextButton);
    }




    function createProductSection(product) {
        return `
           <div class="property-item rounded overflow-hidden product-html id= "${product.id}">
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







// if (selectedTypeValue == "Всички климатици") {
//     console.log("all acs");

// } else if (selectedTypeValue == 1) {
//     let container = document.createElement('div')
//     container.classList.add("g-4", "row", "inventor-div")
//     let url = 'data-json/types/inventor-ac.json'
//     pullProducts(url)


// } else if (selectedTypeValue == "Конвектори") {


// } else if (selectedTypeValue == "Стенни климатици") {
//     console.log("wall acs");


// } else if (selectedTypeValue == "Подови климатици") {
//     console.log("flor acs");


// } else if (selectedTypeValue == "Колонни климатици") {
//     console.log("colon acs");


// } else if (selectedTypeValue == "Касетъчни климатици") {
//     console.log("kaset acs");


// } else if (selectedTypeValue == "Всички климатици") {
//     console.log("all acs");

// }


// Подово-таванни климатици</

// За много ниски температури

// if (selectedLabelValue == "Всички марки") {
//     console.log("all labels");

// } else if (selectedLabelValue == 1) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Auratsu"
//     let url = 'data-json/labels/auratsu.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 2 || selectedLabelValue == 3) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Fujitsu"
//     let url = 'data-json/labels/fujitsu.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 4) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Midea"
//     let url = 'data-json/labels/midea.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 5 || selectedLabelValue == 6) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Mitsubishi"
//     let url = 'data-json/labels/mitsubishi.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 7) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Toshiba"
//     let url = 'data-json/labels/toshiba.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 8) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Daikin"
//     let url = 'data-json/labels/daikin.json'
//     pullProducts(url)

// } else if (selectedLabelValue == 9) {
//     let title = document.getElementsByClassName("h1-promo")[0]
//     title.textContent = "Климатици Williams"
//     let url = 'data-json/labels/williams.json'
//     pullProducts(url)

// }

// console.log("nothing");
