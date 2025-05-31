window.addEventListener("DOMContentLoaded", () => {
    const searchButton1 = document.getElementsByClassName("search-button")[0];
    const searchButton2 = document.getElementsByClassName("search-button")[1];
    const keywordField1 = document.getElementsByClassName("search-field")[0];
    const keywordField2 = document.getElementsByClassName("search-field")[1];
    const typeField = document.getElementsByClassName("type-field")[0];
    const labelField = document.getElementsByClassName("label-field")[0];
    const typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    const labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

    const itemsPerPage = 12;
    let currentPage = getPageFromURL();
    let hasLoadedFromLocalStorage = false;
let hasLocaleStorage = true
debugger

    if(searchButton1 ||
        searchButton2 ||
        keywordField1 ||
        keywordField2 ||
        typeField ||
        labelField ||
        typeAcOptions ||
        labelsAcOptions){
            let selectedKeyword = JSON.parse(localStorage.getItem("keyword"))

            if (selectedKeyword) {
                if (window.innerWidth > 863) {
                    keywordField1.value = selectedKeyword
                } else {
    
                    keywordField2.value = selectedKeyword
                }
                localStorage.removeItem("keyword")
    
            }
    
            let selectedTypeValue = JSON.parse(localStorage.getItem("type"))
    
            if (selectedTypeValue) {
                if (window.innerWidth > 863) {
                    typeAcOptions.value = selectedTypeValue
    
                } else {
                    typeField.value = selectedTypeValue
    
                }
                localStorage.removeItem("type")
    
            }
    
            let selectedLabelValue = JSON.parse(localStorage.getItem("label"))
    debugger
            if (selectedLabelValue) {
                if (window.innerWidth > 863) {
    
                    labelsAcOptions.value = selectedLabelValue
                } else {
                    labelField.value = selectedLabelValue
                }
                localStorage.removeItem("label")
    
            }
    
        }

    function getPageFromURL() {
        const url = new URL(window.location);
        const pageParam = url.searchParams.get("page");
        const page = parseInt(pageParam, 10);
        return !isNaN(page) && page > 0 ? page : 1;
    }
    

    function getFiltersFromURL() {
        debugger
        if (hasLoadedFromLocalStorage || hasLocaleStorage) {
            triggerSearchFromInput()
        }
        const url = new URL(window.location);
        return {
            keyword: url.searchParams.get("keyword") || "",
            type: url.searchParams.get("type") || "Категории",
            label: url.searchParams.get("label") || "Марка",
        };
    }

    function setFiltersToURL(keyword, type, label, page = 1) {
        const url = new URL(window.location);
        url.searchParams.set("keyword", keyword);
        url.searchParams.set("type", type);
        url.searchParams.set("label", label);
        url.searchParams.set("page", page);
        history.pushState({}, "", url.toString());
    }
    function restoreFiltersOnce() {
        if (hasLoadedFromLocalStorage || window.location.search !== ""){
            hasLoadedFromLocalStorage = true;
            return;
        } 
   
        const keyword = localStorage.getItem("keyword") ;
        const type = localStorage.getItem("type");
        const label = localStorage.getItem("label");
   
        if (keyword || type || label) {
            setFiltersToURL(
                keyword ? JSON.parse(keyword) : "",
                type ? JSON.parse(type) : "Категории",
                label ? JSON.parse(label) : "Марка"
            );
        }
   
        localStorage.removeItem("keyword");
        localStorage.removeItem("type");
        localStorage.removeItem("label");
   
        hasLoadedFromLocalStorage = true;
    }

    function products(filters = getFiltersFromURL()) {
        restoreFiltersOnce();
    
        // 🔁 Ensure currentPage is always accurate
        currentPage = getPageFromURL();
    
        // ✅ Sync UI input fields based on screen size
        if (window.innerWidth < 863) {
            keywordField1.value = filters.keyword;
            typeField.value = filters.type;
            labelField.value = filters.label;
        } else {
            keywordField2.value = filters.keyword;
            typeAcOptions.value = filters.type;
            labelsAcOptions.value = filters.label;
        }
    
        const container = document.getElementsByClassName("product-div")[0];
        container.innerHTML = "";
    
        fetch("data-json/all-products.json")
            .then((response) => response.json())
            .then((products) => {
                const filteredResults = products.filter(item => {
                    return (
                        (filters.keyword === "" || item.keyword.toLowerCase().includes(filters.keyword.toLowerCase())) &&
                        (filters.type === "Категории" || item.type === filters.type) &&
                        (filters.label === "Марка" || item.label === filters.label)
                    );
                });
    
                const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
                const paginatedResults = filteredResults.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                );
    
                paginatedResults.forEach(product => {
                    const sectionHTML = createProductSection(product);
                    const sectionElement = document.createElement("div");
                    sectionElement.innerHTML = sectionHTML;
                    sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
                    sectionElement.addEventListener("click", () => getToSingleProductPage(product.id));
                    container.appendChild(sectionElement);
                });
    debugger
                renderPaginationControls(totalPages, filters); // ✅ Updated here
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
    function renderPaginationControls(totalPages, filters) {
        const paginationContainer = document.getElementById("pagination-controls");
        paginationContainer.innerHTML = "";
    console.log(totalPages);
    
        const dynamicSection = document.getElementById("products-section");
    debugger
        function goToPage(page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            setFiltersToURL(filters.keyword, filters.type, filters.label, page);
            products(filters); // Will re-sync currentPage again
            if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
        }
    
        const prevButton = document.createElement("button");
        prevButton.textContent = "Предишна";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    
        for (let i = 1; i <= totalPages; i++) {
            debugger
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            if (i === currentPage) pageButton.classList.add("active"); // ✅ Fix: Only now add 'active'
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

    if (keywordField2?.classList[0] === "keyword2") {
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

    function triggerSearchFromInput() {
        debugger
        let keyword;
        let type;
        let label;
        if(window.innerWidth < 863){
            keyword = keywordField2.value
            type = typeField.value
            label = labelField.value
        } else{
             keyword = keywordField1.value;
             type = typeAcOptions.value;
             label = labelsAcOptions.value;
        }
       
         
      
    
        // Set the updated filters to the URL
        setFiltersToURL(keyword, type, label, currentPage); 
    
        // Re-fetch the filtered products based on updated URL parameters
        const filters = { keyword, type, label };
    
        products(filters); // Call to re-fetch products with updated filters
        changeTitle();
    }
    searchButton1.addEventListener("click", triggerSearchFromInput);
    searchButton2.addEventListener("click", triggerSearchFromInput);

    
    window.addEventListener("popstate", () => {
        currentPage = getPageFromURL();
        const filters = getFiltersFromURL();
        products(filters);
        changeTitle();
        const dynamicSection = document.getElementById("products-section");
        if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
    });

    // Initial load
    products();
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