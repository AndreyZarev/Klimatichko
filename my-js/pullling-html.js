
window.addEventListener("DOMContentLoaded", () => {

    let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

    let searchButton1 = document.getElementsByClassName("search-button")[0];
    let searchButton2 = document.getElementsByClassName("search-button")[1];







    searchButton1.addEventListener("click", search)
    searchButton2.addEventListener("click", search)


    const keywordDiv = document.getElementsByClassName("keyword-div")[0];
    const keywordInput = document.getElementsByClassName('search-field ')[1];

    const typeDiv = document.getElementsByClassName("type-div")[0]
    const typeField = document.getElementsByClassName('type-field')[0];

    const labelDiv = document.getElementsByClassName("label-div")[0]
    const labelField = document.getElementsByClassName('label-field')[0];

    if (keywordInput) {

        keywordInput.addEventListener('focus', () => {
            keywordInput.classList.add('expanded');
            keywordDiv.classList.add('expanded2');

            typeDiv.classList.add('contract');

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
        if (typeField.value !== "Категории") {
            selectedTypeValue = typeField.value
        } else {
            selectedTypeValue = typeAcOptions.value;
        }

        let selectedLabelValue = ""

        if (labelField.value != "Марка") {
            selectedLabelValue = labelField.value
        } else {
            selectedLabelValue = labelsAcOptions.value;

        }

        localStorage.setItem("type", JSON.stringify(selectedTypeValue))
        localStorage.setItem("label", JSON.stringify(selectedLabelValue))

        window.location.href = "products.html";


    }




    let typeAcDiv = document.getElementsByClassName("ac-categories")
    console.log(typeAcDiv);
    debugger
    for (const typeAc of typeAcDiv) {
        typeAc.addEventListener("click", typeSearch)

    }
});



function typeSearch(e) {
    debugger
    let selectedTypeValue = e.target.classList[0]
    console.log(selectedTypeValue);
    let seletedType = ''
    if (selectedTypeValue == "highWallAc") {
        seletedType = "Високостенни климатици"
    }
    if (selectedTypeValue == "floorAc") {

        seletedType = "Подови климатици"

    } else if (selectedTypeValue == "convectorAc") {
        seletedType = "Конвектори"


    } else if (selectedTypeValue == "columnsAc") {
        seletedType = "Колонни климатици"



    } else if (selectedTypeValue == "cassetteAc") {
        seletedType = "Касетъчни климатици"
    }

    else if (selectedTypeValue == "floorSealingAc") {
        seletedType = "Подово-таванни климатици"


    }
    else if (selectedTypeValue == "Касетъчни климатици") {
        seletedType = "Касетъчни климатици"
    }





    localStorage.setItem("type", JSON.stringify(seletedType))
    window.location.href = "products.html";
}








































