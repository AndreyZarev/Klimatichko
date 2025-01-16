document.addEventListener("DOMContentLoaded", () => {
    // let singleProduct = document.getElementsByClassName("ac-product")[0];
    // let productsCategory = document.getElementById("products-section");
    // let container = document.getElementsByClassName("container-wrap")[0]
    // let singleProductSection = document.getElementsByClassName("single-product")
    // function getToSingleProductPage(e, id) {
    //     e.preventDefault();
    //     debugger
    //     let currectProduct = document.getElementById(id);
    //     container.appendChild(currectProduct)
    //     productsCategory.classList.add("invisible");
    //     singleProductSection.classList.remove("invisible");
    // }



    // singleProduct.addEventListener("click", getToSingleProductPage);


    // call Section starts here


    //     let divOfImgButtons = document.getElementById("call-us-section-righ-div")
    //     console.log(divOfImgButtons);

    //     debugger
    //     divOfImgButtons.addEventListener("mouseover", function () {
    //         let arrFromDivOfButtons = divOfImgButtons.children


    //         for (let index = 0; index < array.length; index++) {
    //             const element = arrFromDivOfButtons[index].classList.add("invisible");
    //             debugger

    //         }

    //     });

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
        let selectedTypeValue = typeAcOptions.value;
        let selectedLabelValue = labelsAcOptions.value;
        // console.log(selectedTypeValue, selectedLabelValue);

        if (selectedTypeValue == "Всички климатици") {
            console.log("all acs");

        } else if (selectedTypeValue == "Инверторни климатици") {
            console.log("inventar ac");


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


}

)
