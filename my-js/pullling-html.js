window.addEventListener("DOMContentLoaded", () => {

    let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];
    let searchButton = document.getElementsByClassName("search-button")[0];


    // typeAcOptions.addEventListener("change", function () {
    //     var selectedTypeValue = typeAcOptions.value;
    //     console.log("Selected Type Value:", selectedTypeValue);
    //     console.log(selectedTypeValue);

    // });

    // // Get selected value for the second dropdown
    // labelsAcOptions.addEventListener("change", function () {
    //     var selectedLabelValue = labelsAcOptions.value;
    //     console.log("Selected Label Value:", selectedLabelValue);
    //     console.log(selectedLabelValue);
    // })

    searchButton.addEventListener("click", search)
    function search() {
        debugger
        let dynamicSection = document.getElementById("dynamic-section")

        let selectedTypeValue = typeAcOptions.value;
        let selectedLabelValue = labelsAcOptions.value;
        // console.log(selectedTypeValue, selectedLabelValue);

        if (selectedTypeValue == "Всички климатици") {
            console.log("all acs");

        } else if (selectedTypeValue == 1) {
            let container = document.createElement('div')
            container.classList.add("g-4", "row", "inventor-div")
            // Fetching the products from a JSON file
            fetch('data-json/types/inventor-ac.json')
                .then(response => response.json())
                .then(products => {
                    console.log(products);
                    let promoSection = document.getElementsByClassName("promo-div")[0]
                    let attachElement = document.getElementById("attach-promo")

                    attachElement.removeChild(promoSection)

                    products.forEach(product => {
                        const sectionHTML = createProductSection(product);
                        let sectionElement = document.createElement('div')

                        sectionElement.innerHTML = sectionHTML;
                        sectionElement.classList.add("col-lg-4", "col-md-6", "wow", "ac-products")
                        container.appendChild(sectionElement);


                        attachElement.appendChild(container)

                    });

                })
                .catch(error => console.error('Error fetching product data:', error));





        } else if (selectedTypeValue == "Конвектори") {
            console.log("convectors");


        } else if (selectedTypeValue == "Стенни климатици") {
            console.log("wall acs");


        } else if (selectedTypeValue == "Подови климатици") {
            console.log("flor acs");


        } else if (selectedTypeValue == "Колонни климатици") {
            console.log("colon acs");


        } else if (selectedTypeValue == "Касетъчни климатици") {
            console.log("kaset acs");


        } else if (selectedTypeValue == "Всички климатици") {
            console.log("all acs");

        }


        // Подово-таванни климатици</

        // За много ниски температури

        if (selectedLabelValue == "Всички марки") {
            console.log("all labels");

        } else if (selectedLabelValue == "ARATSU") {

        }

        // console.log("nothing");


    }



    function createProductSection(product) {
        return `
         
                            <div class="property-item rounded overflow-hidden " id="klb-24hrhi"
                                onclick="getToSingleProductPage(id)">
                                <div class="position-relative overflow-hidden img-ac-products ">
                                    <a href=""><img class="img-fluid img-ac-products"
                                            src="img/new/ac-types/inventor-ac/kaisai/KAISAI ICE KLB-24HRHI.jpg"
                                            alt=""></a>
                                
                                </div>
                                <div class=" pb-0 div-price">
                                    <h5 class="">${product.price}</h5>
                                    <a class="d-block" href="">${product.type} ${product.name}</a>
                                    <p><i class="fa fa-map-marker-alt text-primary "></i>${product.location}</p>
                                </div>
                                <div class="d-flex border-top">
                                    <small class="flex-fill text-center border-end py-2">${product.power}</small>
                                    <small class="flex-fill text-center border-end py-2">3 Bed</small>
                                    <small class="flex-fill text-center py-2">${product.energy}</small>
                                </div>
                            </div>
                   
            `;
    }



}

)
