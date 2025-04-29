window.addEventListener("DOMContentLoaded", () => {
    const searchButton1 = document.getElementsByClassName("search-button")[0];
    const searchButton2 = document.getElementsByClassName("search-button")[1];
    const keywordField2 = document.getElementsByClassName("search-field")[1];

    const itemsPerPage = 12;
    let currentPage = getPageFromURL();

    function getPageFromURL() {
        const url = new URL(window.location);
        const pageParam = url.searchParams.get("page");
        const page = parseInt(pageParam);
        return !isNaN(page) && page > 0 ? page : 1;
    }

    function products() {
        const typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
        const labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];
        const keywordField1 = document.getElementsByClassName("search-field")[0];
        const typeField = document.getElementsByClassName("type-field")[0];
        const labelField = document.getElementsByClassName("label-field")[0];
        const container = document.getElementsByClassName("product-div")[0];

        // Restore from localStorage
        let selectedKeyword = localStorage.getItem("keyword");
        if (selectedKeyword) {
            selectedKeyword = JSON.parse(selectedKeyword);
            if (window.innerWidth > 863) keywordField1.value = selectedKeyword;
            else keywordField2.value = selectedKeyword;
            localStorage.removeItem("keyword");
        }

        let selectedTypeValue = localStorage.getItem("type");
        if (selectedTypeValue) {
            selectedTypeValue = JSON.parse(selectedTypeValue);
            if (window.innerWidth > 863) typeAcOptions.value = selectedTypeValue;
            else typeField.value = selectedTypeValue;
            localStorage.removeItem("type");
        }

        let selectedLabelValue = localStorage.getItem("label");
        if (selectedLabelValue) {
            selectedLabelValue = JSON.parse(selectedLabelValue);
            if (window.innerWidth > 863) labelsAcOptions.value = selectedLabelValue;
            else labelField.value = selectedLabelValue;
            localStorage.removeItem("label");
        }

        // Gather current filter values
        selectedKeyword = keywordField1.value || keywordField2.value || "";
        selectedTypeValue = typeField.value !== "Категории" ? typeField.value : typeAcOptions.value;
        selectedLabelValue = labelField.value !== "Марка" ? labelField.value : labelsAcOptions.value;

        container.innerHTML = "";

        fetch("data-json/all-products.json")
            .then((response) => response.json())
            .then((products) => {
                const filteredResults = products.filter(item => {
                    return (
                        (selectedKeyword === "" || item.keyword.toLowerCase().includes(selectedKeyword.toLowerCase())) &&
                        (selectedTypeValue === "Категории" || item.type === selectedTypeValue) &&
                        (selectedLabelValue === "Марка" || item.label === selectedLabelValue)
                    );
                });

                const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
                const paginatedResults = filteredResults.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                );

                paginatedResults.forEach(product => {
                    const sectionHTML = createProductSection(product);
                    let sectionElement = document.createElement("div");
                    sectionElement.innerHTML = sectionHTML;
                    sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
                    sectionElement.addEventListener("click", () => getToSingleProductPage(product.id));
                    container.appendChild(sectionElement);
                });

                renderPaginationControls(totalPages);
            })
            .catch(error => console.error("Error fetching product data:", error));
    }

    function createProductSection(product) {
        return `
            <div class="property-item rounded overflow-hidden" id="${product.id}">
                <div class="position-relative overflow-hidden img-ac-products">
                    <a href="#"><img class="img-fluid img-ac-products" src="${product.img}" alt=""></a>
                </div>
                <div class="pb-0 div-price">
                    <h5 class="normal-price">${product.price.toFixed(2)}лв</h5>
                    <a class="d-block" href="#">${product.name}</a>
                </div>
                <a class="call-us" href="tel:0896081213">
                    <span><img class="call-us-icon" src="img/new/icons8-phone-50.png" alt=""></span>
                    Обади се
                </a>
                <div class="d-flex border-top">
                    <small class="flex-fill text-center border-end py-2">${product.size} BTU</small>
                    <small class="flex-fill text-center border-end py-2"><a class="label-link" href="#">${product.label}</a></small>
                    <small class="flex-fill text-center py-2">Клас: ${product.energy}</small>
                </div>
            </div>
        `;
    }

    function renderPaginationControls(totalPages) {
        const paginationContainer = document.getElementById("pagination-controls");
        paginationContainer.innerHTML = "";

        const dynamicSection = document.getElementById("products-section");

        function goToPage(page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            const url = new URL(window.location);
            url.searchParams.set("page", page);
            history.pushState({ page }, "", url.toString());

            products();
            if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
        }

        const prevButton = document.createElement("button");
        prevButton.textContent = "Предишна";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.toggle("active", i === currentPage);
            pageButton.addEventListener("click", () => goToPage(i));
            paginationContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement("button");
        nextButton.textContent = "Следваща";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", () => goToPage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }

    function changeTitle() {
        const title = document.getElementsByClassName("h1-promo")[0];
        title.textContent = "Резултат от търсенето";
    }

    function getToSingleProductPage(id) {
        window.location.href = `single-product-page.html?id=${id}`;
    }

    if (keywordField2.classList[0] === "keyword2") {
        const keywordDiv = document.getElementsByClassName("keyword-div")[0];
        const typeDiv = document.getElementsByClassName("type-div")[0];
        const labelDiv = document.getElementsByClassName("label-div")[0];

        keywordField2.addEventListener("focus", () => {
            keywordField2.classList.add("expanded");
            keywordDiv.classList.add("expanded2");
            typeDiv.classList.add("contract");
            labelDiv.classList.add("contract");
            searchButton2.classList.add("contract");
        });

        keywordField2.addEventListener("blur", () => {
            keywordField2.classList.remove("expanded");
            keywordDiv.classList.remove("expanded2");
            typeDiv.classList.remove("contract");
            labelDiv.classList.remove("contract");
            searchButton2.classList.remove("contract");
        });
    }

    // Attach search event handlers
    searchButton1.addEventListener("click", () => {
        currentPage = 1;
        products();
        changeTitle();
    });

    searchButton2.addEventListener("click", () => {
        currentPage = 1;
        products();
        changeTitle();
    });

    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
        currentPage = getPageFromURL();
        products();
        const dynamicSection = document.getElementById("products-section");
        if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
    });

    products(); // Initial load
});



// window.addEventListener("DOMContentLoaded", () => {
//     let searchButton1 = document.getElementsByClassName("search-button")[0];
//     let searchButton2 = document.getElementsByClassName("search-button")[1];

//     let keywordField2 = document.getElementsByClassName("search-field")[1];





//     function products() {

//         let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
//         let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

//         let keywordField1 = document.getElementsByClassName("search-field")[0];
//         let keywordField2 = document.getElementsByClassName("search-field")[1];




//         const typeField = document.getElementsByClassName('type-field')[0];

//         const labelField = document.getElementsByClassName('label-field')[0];





//         let selectedKeyword = JSON.parse(localStorage.getItem("keyword"))

//         if (selectedKeyword) {
//             if (window.innerWidth > 863) {
//                 keywordField1.value = selectedKeyword
//             } else {

//                 keywordField2.value = selectedKeyword
//             }
//             localStorage.removeItem("keyword")

//         }

//         let selectedTypeValue = JSON.parse(localStorage.getItem("type"))

//         if (selectedTypeValue) {
//             if (window.innerWidth > 863) {
//                 typeAcOptions.value = selectedTypeValue

//             } else {
//                 typeField.value = selectedTypeValue

//             }
//             localStorage.removeItem("type")

//         }

//         let selectedLabelValue = JSON.parse(localStorage.getItem("label"))

//         if (selectedLabelValue) {
//             if (window.innerWidth > 863) {

//                 labelsAcOptions.value = selectedLabelValue
//             } else {
//                 labelField.value = selectedLabelValue
//             }
//             localStorage.removeItem("label")

//         }

//         let container = document.getElementsByClassName("product-div")[0]
//         selectedKeyword = ''

//         if (keywordField1.value) {
//             selectedKeyword = keywordField1.value
//         } else {
//             selectedKeyword = keywordField2.value
//         }
//         selectedTypeValue = ""

//         if (typeField.value !== "Категории") {
//             selectedTypeValue = typeField.value
//         } else {
//             selectedTypeValue = typeAcOptions.value
//         }
//         selectedLabelValue = ""
//         if (labelField.value !== "Марка") {
//             selectedLabelValue = labelField.value
//         } else {
//             selectedLabelValue = labelsAcOptions.value
//         }
//         container.innerHTML = "";
//         // Clear previous content

//         fetch("data-json/all-products.json")
//             .then(response => response.json())
//             .then(products => {
//                 const filteredResults = products.filter(item => {


//                     return (

//                         (selectedKeyword === "" || item.keyword.toLowerCase().includes(selectedKeyword.toLowerCase())) &&
//                         (selectedTypeValue === "Категории" || item.type === selectedTypeValue) &&
//                         (selectedLabelValue === "Марка" || item.label === selectedLabelValue)
//                     );
//                 });

//                 // Paginate filtered results
//                 const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
//                 const paginatedResults = filteredResults.slice(
//                     (currentPage - 1) * itemsPerPage,
//                     currentPage * itemsPerPage
//                 );

//                 // Display products for the current page
//                 paginatedResults.forEach(product => {
//                     const sectionHTML = createProductSection(product);
//                     let sectionElement = document.createElement('div');

//                     sectionElement.innerHTML = sectionHTML;
//                     sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
//                     sectionElement.addEventListener("click", () => { getToSingleProductPage(product.id) })
//                     container.appendChild(sectionElement);
//                 });



//                 // Update pagination controls

//                 renderPaginationControls(totalPages);
//             })
//             .catch(error => console.error('Error fetching product data:', error));
//     }


//     // search bar functionallyty for phone fields



//     if (keywordField2.classList[0] === "keyword2") {

//         const keywordDiv = document.getElementsByClassName("keyword-div")[0];


//         const typeDiv = document.getElementsByClassName("type-div")[0]


//         const labelDiv = document.getElementsByClassName("label-div")[0]

//         keywordField2.addEventListener('focus', () => {
//             keywordField2.classList.add('expanded');
//             keywordDiv.classList.add('expanded2');
//             typeDiv.classList.add('contract');

//             labelDiv.classList.add('contract');

//             searchButton2.classList.add('contract');

//         });

//         keywordField2.addEventListener('blur', () => {
//             keywordField2.classList.remove('expanded');
//             keywordDiv.classList.remove('expanded2');

//             typeDiv.classList.remove('contract');

//             labelDiv.classList.remove('contract');

//             searchButton2.classList.remove('contract');
//         });


//     }



//     let currentPage = JSON.parse(localStorage.getItem("currentPage")) || 1;
//     const itemsPerPage = 12;

//     searchButton1.addEventListener("click", products)
//     searchButton1.addEventListener("click", changeTitle)
//     searchButton2.addEventListener("click", products)
//     searchButton2.addEventListener("click", changeTitle)

//     function changeTitle() {

//         let title = document.getElementsByClassName("h1-promo")[0]
//         title.textContent = "Резултат от търсенето"
//     }


//     products()

//     function renderPaginationControls(totalPages) {
//         const paginationContainer = document.getElementById("pagination-controls");
//         paginationContainer.innerHTML = ""; // Clear existing controls

//         const dynamicSection = document.getElementById("products-section"); // The section to scroll to

//         function goToPage(page) {
//             if (page < 1 || page > totalPages) return;

//             currentPage = page;
//             products(); // Load the products for this page
//             dynamicSection.scrollIntoView({ behavior: "smooth" });

//             // Push new state into history
//             const url = new URL(window.location);
//             url.searchParams.set('page', currentPage);
//             window.history.pushState({ page: currentPage }, "", url.toString());
//         }

//         // Previous Button
//         const prevButton = document.createElement("button");
//         prevButton.textContent = "Предишна";
//         prevButton.disabled = currentPage === 1;
//         prevButton.addEventListener("click", () => {
//             if (currentPage > 1) {
//                 goToPage(currentPage - 1);
//             }
//         });
//         paginationContainer.appendChild(prevButton);

//         // Page Numbers
//         for (let i = 1; i <= totalPages; i++) {
//             const pageButton = document.createElement("button");
//             pageButton.textContent = i;
//             pageButton.classList.toggle("active", i === currentPage);
//             pageButton.addEventListener("click", () => {
//                 goToPage(i);
//             });
//             paginationContainer.appendChild(pageButton);
//         }

//         // Next Button
//         const nextButton = document.createElement("button");
//         nextButton.textContent = "Следваща";
//         nextButton.disabled = currentPage === totalPages;
//         nextButton.addEventListener("click", () => {
//             if (currentPage < totalPages) {
//                 goToPage(currentPage + 1);
//             }
//         });
//         paginationContainer.appendChild(nextButton);
//     }

//     // Handle browser back and forward buttons
//     window.addEventListener('popstate', function (event) {
//         const url = new URL(window.location);
//         const pageParam = url.searchParams.get('page');
//         let page = parseInt(pageParam);

//         if (!isNaN(page)) {
//             currentPage = page;
//         } else {
//             currentPage = 1; // default
//         }

//         products(); // RELOAD products for the new page!
//         const dynamicSection = document.getElementById("products-section");
//         if (dynamicSection) {
//             dynamicSection.scrollIntoView({ behavior: "smooth" });
//         }
//     });

//     // Handle first page load (refresh or direct open)
//     document.addEventListener("DOMContentLoaded", function () {
//         const url = new URL(window.location);
//         const pageParam = url.searchParams.get('page');
//         let page = parseInt(pageParam);

//         if (!isNaN(page)) {
//             currentPage = page;
//         } else {
//             currentPage = 1;
//         }

//         products(); // Initial load of products
//     });

//     function createProductSection(product) {
//         return `
//            <div class="property-item rounded overflow-hidden" id="${product.id}">
//                                 <div class="position-relative overflow-hidden img-ac-products ">
//                                     <a href="#"><img class="img-fluid img-ac-products"
//                                             src="${product.img}"
//                                             alt=""></a>
                                
//                                 <div class=" pb-0 div-price">
                
//                                     <h5 class = "normal-price">${product.price.toFixed(2)}лв</h5>

//                                     <a class="d-block " href="#">${product.name}</a>

//                                 </div>
//                                 <a class="call-us" href="tel: 0896081213">
//                                  <span>
//                                     <img class="call-us-icon" src="img/new/icons8-phone-50.png" alt="" srcset="">
//                                 </span>
//                                 Обади се</a>
//                                 <div class="d-flex border-top">
//                                     <small class="flex-fill text-center border-end py-2">${product.size} BTU</small>
//                                     <small class="flex-fill text-center border-end py-2"><a class="label-link" href="#">${product.label}</a></small>
//                                     <small class="flex-fill text-center py-2">Клас: ${product.energy}</small>
//                                 </div>
//                             </div>
         
                          
                   
//             `;
//     }

//     function getToSingleProductPage(id) {
//         window.location.href = `single-product-page.html?id=${id}`;
//     }

// }

// )