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
    let hasLocaleStorage = true;

    // Function to fetch products with CORS error handling
    async function fetchProducts() {
        try {
            // First try normal fetch
            const response = await fetch("data-json/all-products.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn('CORS error detected, trying alternative methods...', error.message);

            // If CORS error, show helpful message and provide fallback
            showCORSError();

            // Return a minimal set of products as fallback
            return getFallbackProducts();
        }
    }

    // Show CORS error message with solution
    function showCORSError() {
        const container = document.getElementsByClassName("product-div")[0];
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">⚠️ CORS Error Detected</h4>
                    <p>The website cannot load product data when opened directly as a file. This is a browser security feature.</p>
                    <hr>
                    <h5>🔧 Solutions:</h5>
                    <ol>
                        <li><strong>Use Local Server (Recommended):</strong>
                            <ul>
                                <li>Double-click <code>start-server.bat</code> in the project folder</li>
                                <li>Then open <a href="http://localhost:8000/products.html" target="_blank">http://localhost:8000/products.html</a></li>
                            </ul>
                        </li>
                        <li><strong>Use Live Server Extension:</strong>
                            <ul>
                                <li>Install "Live Server" extension in VS Code</li>
                                <li>Right-click on <code>products.html</code> → "Open with Live Server"</li>
                            </ul>
                        </li>
                        <li><strong>Upload to Web Server:</strong>
                            <ul>
                                <li>Upload the entire project to a web hosting service</li>
                                <li>Access via HTTP/HTTPS URL</li>
                            </ul>
                        </li>
                    </ol>
                    <p class="mb-0"><strong>Note:</strong> A few sample products are shown below for demonstration.</p>
                </div>
            </div>
        `;
    }

    // Fallback products for demonstration when CORS blocks the main file
    function getFallbackProducts() {
        return [
            {
                "id": 1,
                "img": "img/brands/auratsu/auratsu-default.png",
                "type": "Високостенни климатици",
                "name": "Инверторен климатик Auratsu AWX-09KTKI",
                "price": 789,
                "size": "9000",
                "label": "Auratsu",
                "model": "Auratsu AWX-09KTKI",
                "energy": "A++",
                "keyword": "Auratsu AWX-09KTKI 9000 BTU Инверторен стенен климатик"
            },
            {
                "id": 2,
                "img": "img/brands/auratsu/auratsu-default.png",
                "type": "Високостенни климатици",
                "name": "Инверторен климатик Auratsu AWX-12KTKI",
                "price": 839,
                "size": "12000",
                "label": "Auratsu",
                "model": "Auratsu AWX-12KTKI",
                "energy": "A++",
                "keyword": "Auratsu AWX-12KTKI 12000 BTU Инверторен стенен климатик"
            },
            {
                "id": 3,
                "img": "img/new/ac-types/inventor-ac/daikin/daikin.jpg",
                "type": "Високостенни климатици",
                "name": "Инверторен климатик Daikin FTXM20R",
                "price": 1200,
                "size": "7000",
                "label": "Daikin",
                "model": "Daikin FTXM20R",
                "energy": "A+++",
                "keyword": "Daikin FTXM20R 7000 BTU Инверторен стенен климатик"
            }
        ];
    }

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
                    if (keywordField1) keywordField1.value = selectedKeyword
                } else {
                    if (keywordField2) keywordField2.value = selectedKeyword
                }
                localStorage.removeItem("keyword")
            }

            let selectedTypeValue = JSON.parse(localStorage.getItem("type"))

            if (selectedTypeValue) {
                if (window.innerWidth > 863) {
                    if (typeAcOptions) typeAcOptions.value = selectedTypeValue
                } else {
                    if (typeField) typeField.value = selectedTypeValue
                }
                localStorage.removeItem("type")
            }

            let selectedLabelValue = JSON.parse(localStorage.getItem("label"))

            if (selectedLabelValue) {
                if (window.innerWidth > 863) {
                    if (labelsAcOptions) labelsAcOptions.value = selectedLabelValue
                } else {
                    if (labelField) labelField.value = selectedLabelValue
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
        // Purely read filters from the URL without causing side effects
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

        // Always show the products list on the products page.
        // If a promo/dynamic section exists (e.g., on other pages), hide it.
        const productsSection = document.getElementById("products-section");
        const dynamicSection = document.getElementById("dynamic-section");
        if (productsSection) productsSection.style.display = "block";
        if (dynamicSection) dynamicSection.style.display = "none";

        // ✅ Sync UI input fields based on screen size
        if (window.innerWidth < 863) {
            // Mobile view - sync mobile fields
            if (keywordField2) keywordField2.value = filters.keyword;
            if (typeField) typeField.value = filters.type;
            if (labelField) labelField.value = filters.label;
        } else {
            // Desktop view - sync desktop fields
            if (keywordField1) keywordField1.value = filters.keyword;
            if (typeAcOptions) typeAcOptions.value = filters.type;
            if (labelsAcOptions) labelsAcOptions.value = filters.label;
        }
    
        const container = document.getElementsByClassName("product-div")[0];
        container.innerHTML = "";
    
        // Try to fetch products with CORS handling
        fetchProducts()
            .then((products) => {
                console.log(`📊 Total products loaded: ${products.length}`);

                // Count products by brand for debugging
                const brandCounts = {};
                products.forEach(product => {
                    brandCounts[product.label] = (brandCounts[product.label] || 0) + 1;
                });
                console.log('📈 Products by brand:', brandCounts);

                // First, validate and clean the products data
                const validProducts = products.filter(item => {
                    const isValid = item &&
                                   item.id &&
                                   item.name &&
                                   item.price &&
                                   item.label &&
                                   item.keyword;

                    if (!isValid) {
                        console.warn('⚠️ Invalid product found:', item);
                    }
                    return isValid;
                });

                console.log(`✅ Valid products: ${validProducts.length} out of ${products.length}`);

                const filteredResults = validProducts.filter(item => {
                    const keywordMatch = filters.keyword === "" ||
                                       (item.keyword && item.keyword.toLowerCase().includes(filters.keyword.toLowerCase()));
                    const typeMatch = filters.type === "Категории" || item.type === filters.type;

                    // Enhanced label matching to handle brand variations
                    let labelMatch = filters.label === "Марка";
                    if (!labelMatch && filters.label) {
                        // Direct match
                        labelMatch = item.label === filters.label;

                        // Handle brand variations
                        if (!labelMatch) {
                            const filterLabelLower = filters.label.toLowerCase();
                            const itemLabelLower = item.label.toLowerCase();

                            // Fujitsu variations
                            if (filterLabelLower === "fujitsu") {
                                labelMatch = itemLabelLower === "fujitsu" ||
                                           itemLabelLower === "fujitsu general" ||
                                           itemLabelLower.includes("fujitsu");
                            }
                            // Kaisai variations
                            else if (filterLabelLower === "kaisai") {
                                labelMatch = itemLabelLower === "kaisai" || itemLabelLower === "kaisai";
                            }
                            // Williams - exact match should work
                            else if (filterLabelLower === "williams") {
                                labelMatch = itemLabelLower === "williams";
                            }
                            // Auratsu - exact match should work
                            else if (filterLabelLower === "auratsu") {
                                labelMatch = itemLabelLower === "auratsu";
                            }
                        }
                    }

                    return keywordMatch && typeMatch && labelMatch;
                });

                console.log(`🔍 Filtered results: ${filteredResults.length} products`);
                console.log(`📄 Current page: ${currentPage}, Items per page: ${itemsPerPage}`);

                const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
                console.log(`📊 Calculated total pages: ${totalPages} (${filteredResults.length} products ÷ ${itemsPerPage} per page)`);

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = currentPage * itemsPerPage;
                const paginatedResults = filteredResults.slice(startIndex, endIndex);

                console.log(`📋 Page ${currentPage}: Showing products ${startIndex + 1}-${Math.min(endIndex, filteredResults.length)} of ${filteredResults.length}`);
                console.log(`📦 Products on this page: ${paginatedResults.length}`);

                // Log the actual products being shown
                if (paginatedResults.length > 0) {
                    console.log('🏷️ Products on this page:', paginatedResults.map(p => `${p.name} (ID: ${p.id})`));
                } else {
                    console.warn('⚠️ No products to show on this page!');
                }

                paginatedResults.forEach((product, index) => {
                    try {
                        const sectionHTML = createProductSection(product);
                        const sectionElement = document.createElement("div");
                        sectionElement.innerHTML = sectionHTML;
                        sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
                        sectionElement.addEventListener("click", () => getToSingleProductPage(product.id));
                        container.appendChild(sectionElement);

                        if (index === 0) {
                            console.log(`🎯 First product on page ${currentPage}:`, product.name);
                        }
                    } catch (error) {
                        console.error(`❌ Error rendering product ${product.id}:`, error, product);
                    }
                });

                console.log(`✅ Successfully rendered ${paginatedResults.length} products on page ${currentPage}`);

                renderPaginationControls(totalPages, filters, filteredResults);
            })
            .catch(error => console.error("Error fetching product data:", error));
    }
    
    function createProductSection(product) {
        // Handle images based on product type
        let imageToShow = product.img;
        let fallbackImage;

        if (product.Teo === "new") {
            // For new products, always use generic 404 placeholder
            imageToShow = 'img/404-product-image.svg';
            fallbackImage = 'img/404-product-image.svg';
        } else {
            // For original products (Teo: "don't touch it's updated"), use brand-specific placeholders as fallback
            fallbackImage = getBrandPlaceholder(product.label);
        }

        function getBrandPlaceholder(brand) {
            switch(brand) {
                case 'Daikin': return 'img/brands/daikin/daikin-placeholder.svg';
                case 'KAISAI':
                case 'Kaisai': return 'img/brands/kaisai/kaisai-placeholder.svg';
                case 'Mitsubishi Electric':
                case 'Mitsubishi': return 'img/brands/mitsubishi/mitsubishi-placeholder.svg';
                case 'Toshiba': return 'img/brands/toshiba/toshiba-placeholder.svg';
                case 'Williams': return 'img/brands/williams/williams-placeholder.svg';
                case 'Fujitsu':
                case 'Fujitsu General': return 'img/brands/fujitsu/fujitsu-placeholder.svg';
                case 'Midea': return 'img/brands/midea/midea-placeholder.svg';
                default: return 'img/404-product-image.svg';
            }
        }

        return `
            <div class="property-item rounded overflow-hidden" id="${product.id}">
                <div class="position-relative overflow-hidden img-ac-products">
                    <a href="#"><img class="img-fluid img-ac-products"
                        src="${imageToShow}"
                        alt="${product.name}"
                        onerror="this.src='${fallbackImage}'; this.onerror=null;"></a>
                </div>
                <div class="pb-0 div-price">
                    <h5 class="normal-price">${product.price.toFixed(2)}лв / ${(product.price / 1.96).toFixed(2)}€</h5>
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
    function renderPaginationControls(totalPages, filters, filteredResults) {
        const paginationContainer = document.getElementById("pagination-controls");
        paginationContainer.innerHTML = "";

        console.log(`📄 Rendering pagination: ${totalPages} total pages, current page: ${currentPage}`);

        const dynamicSection = document.getElementById("products-section");
        const container = document.getElementsByClassName("product-div")[0];

        function goToPage(page) {
            if (page < 1 || page > totalPages) {
                console.warn(`Invalid page requested: ${page}. Valid range: 1-${totalPages}`);
                return;
            }
            console.log(`🔄 Navigating to page ${page}`);
            currentPage = page;
            setFiltersToURL(filters.keyword, filters.type, filters.label, page);

            // Instead of calling products() recursively, just re-render the current data
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = currentPage * itemsPerPage;
            const newPaginatedResults = filteredResults.slice(startIndex, endIndex);

            // Clear and re-render products for the new page
            container.innerHTML = "";
            newPaginatedResults.forEach((product, index) => {
                try {
                    const sectionHTML = createProductSection(product);
                    const sectionElement = document.createElement("div");
                    sectionElement.innerHTML = sectionHTML;
                    sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
                    sectionElement.addEventListener("click", () => getToSingleProductPage(product.id));
                    container.appendChild(sectionElement);
                } catch (error) {
                    console.error(`❌ Error rendering product ${product.id}:`, error, product);
                }
            });

            console.log(`✅ Rendered ${newPaginatedResults.length} products on page ${currentPage}`);

            // Update pagination controls
            renderPaginationControls(totalPages, filters, filteredResults);

            if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
        }

        const prevButton = document.createElement("button");
        prevButton.textContent = "Предишна";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);

        // Create page buttons with better logging
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add("active");
                console.log(`✅ Page ${i} marked as active`);
            }
            pageButton.addEventListener("click", () => goToPage(i));
            paginationContainer.appendChild(pageButton);
        }

        console.log(`📋 Created ${totalPages} page buttons`);

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
        // Build a back URL that reflects current UI selections (even if search wasn't clicked)
        let keyword = "";
        let type = "Категории";
        let label = "Марка";

        if (window.innerWidth < 863) {
            // Mobile fields
            keyword = keywordField2 ? keywordField2.value : "";
            type = typeField ? typeField.value : "Категории";
            label = labelField ? labelField.value : "Марка";
        } else {
            // Desktop fields
            keyword = keywordField1 ? keywordField1.value : "";
            type = typeAcOptions ? typeAcOptions.value : "Категории";
            label = labelsAcOptions ? labelsAcOptions.value : "Марка";
        }

        // Use currentPage from state; default to 1 if invalid
        const page = (typeof currentPage === 'number' && currentPage > 0) ? currentPage : 1;

        const url = new URL(window.location);
        url.searchParams.set("keyword", keyword || "");
        url.searchParams.set("type", type || "Категории");
        url.searchParams.set("label", label || "Марка");
        url.searchParams.set("page", page);

        const backUrl = url.toString();
        localStorage.setItem('backToProductsUrl', backUrl);
        // Also persist current filters as a fallback
        localStorage.setItem('keyword', JSON.stringify(keyword || ""));
        localStorage.setItem('type', JSON.stringify(type || "Категории"));
        localStorage.setItem('label', JSON.stringify(label || "Марка"));
        console.log('💾 Stored back URL (from UI):', backUrl);

        // Navigate to single product page
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
        let keyword = "";
        let type = "Категории";
        let label = "Марка";

        // Get values from the appropriate fields based on screen size
        if(window.innerWidth < 863){
            // Mobile view - use second search bar
            keyword = keywordField2 ? keywordField2.value : "";
            type = typeField ? typeField.value : "Категории";
            label = labelField ? labelField.value : "Марка";
        } else {
            // Desktop view - use first search bar
            keyword = keywordField1 ? keywordField1.value : "";
            type = typeAcOptions ? typeAcOptions.value : "Категории";
            label = labelsAcOptions ? labelsAcOptions.value : "Марка";
        }

        // Reset to page 1 when searching
        currentPage = 1;

        // Set the updated filters to the URL
        setFiltersToURL(keyword, type, label, currentPage);

        // Re-fetch the filtered products based on updated URL parameters
        const filters = { keyword, type, label };

        products(filters); // Call to re-fetch products with updated filters
        changeTitle();
    }
    // Add event listeners only if elements exist
    if (searchButton1) {
        searchButton1.addEventListener("click", triggerSearchFromInput);
    }
    if (searchButton2) {
        searchButton2.addEventListener("click", triggerSearchFromInput);
    }

    
    window.addEventListener("popstate", (event) => {
        console.log('🔙 Popstate event on products page');
        currentPage = getPageFromURL();
        const filters = getFiltersFromURL();
        products(filters);
        changeTitle();
        const dynamicSection = document.getElementById("products-section");
        if (dynamicSection) dynamicSection.scrollIntoView({ behavior: "smooth" });
    });

    // Initial load
    products();

    // Add debug functionality (press Ctrl+D to toggle debug panel)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDebugPanel();
        }
    });

    function toggleDebugPanel() {
        let debugPanel = document.getElementById('debug-panel');
        if (debugPanel) {
            debugPanel.remove();
        } else {
            createDebugPanel();
        }
    }

    function createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            background: white;
            border: 2px solid #007bff;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 9999;
            font-size: 12px;
            max-height: 400px;
            overflow-y: auto;
        `;

        debugPanel.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #007bff;">🔧 Debug Panel</h4>
            <button onclick="testAllPages()" style="margin: 2px; padding: 5px 10px;">Test All Pages</button>
            <button onclick="document.getElementById('debug-panel').remove()" style="margin: 2px; padding: 5px 10px; float: right;">✕</button>
            <div id="debug-content">Press "Test All Pages" to check pagination...</div>
        `;

        document.body.appendChild(debugPanel);

        // Add global test function
        window.testAllPages = function() {
            fetchProducts()
                .then(products => {
                    const validProducts = products.filter(item => {
                        return item && item.id && item.name && item.price && item.label && item.keyword;
                    });

                    const totalPages = Math.ceil(validProducts.length / 12);
                    let results = `<h5>📊 Test Results:</h5>`;
                    results += `<p>Total Products: ${validProducts.length}<br>Total Pages: ${totalPages}</p>`;

                    let emptyPages = [];
                    for (let page = 1; page <= totalPages; page++) {
                        const startIndex = (page - 1) * 12;
                        const endIndex = page * 12;
                        const pageProducts = validProducts.slice(startIndex, endIndex);

                        if (pageProducts.length === 0) {
                            emptyPages.push(page);
                        }

                        results += `<div style="margin: 2px 0; padding: 2px; background: ${pageProducts.length > 0 ? '#e6ffe6' : '#ffe6e6'};">
                            Page ${page}: ${pageProducts.length} products ${pageProducts.length > 0 ? '✅' : '❌'}
                        </div>`;
                    }

                    if (emptyPages.length > 0) {
                        results += `<p style="color: red;">❌ Empty pages: ${emptyPages.join(', ')}</p>`;
                    } else {
                        results += `<p style="color: green;">✅ All pages have products!</p>`;
                    }

                    document.getElementById('debug-content').innerHTML = results;
                })
                .catch(error => {
                    document.getElementById('debug-content').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                });
        };
    }
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