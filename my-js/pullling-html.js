
window.addEventListener("DOMContentLoaded", () => {

    let typeAcOptions = document.getElementsByClassName("type-ac-options")[0];
    let labelsAcOptions = document.getElementsByClassName("labels-ac-options")[0];

    let searchButton1 = document.getElementsByClassName("search-button")[0];
    let searchButton2 = document.getElementsByClassName("search-button")[1];







    if (searchButton1) {
        searchButton1.addEventListener("click", search);
    }
    if (searchButton2) {
        searchButton2.addEventListener("click", search);
    }


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
        let keyword = "";
        let selectedTypeValue = "";
        let selectedLabelValue = "";

        // Get keyword from appropriate field
        const keywordField1 = document.getElementsByClassName("search-field")[0];
        const keywordField2 = document.getElementsByClassName("search-field")[1];

        if (keywordField1 && keywordField1.value.trim()) {
            keyword = keywordField1.value.trim();
        } else if (keywordField2 && keywordField2.value.trim()) {
            keyword = keywordField2.value.trim();
        }

        // Get type value - prioritize mobile field if it has a selection
        if (typeField && typeField.value !== "Категории") {
            selectedTypeValue = typeField.value;
        } else if (typeAcOptions && typeAcOptions.value !== "Категории") {
            selectedTypeValue = typeAcOptions.value;
        }

        // Get label value - prioritize mobile field if it has a selection
        if (labelField && labelField.value !== "Марка") {
            selectedLabelValue = labelField.value;
        } else if (labelsAcOptions && labelsAcOptions.value !== "Марка") {
            selectedLabelValue = labelsAcOptions.value;
        }

        // Store in localStorage for compatibility
        localStorage.setItem("keyword", JSON.stringify(keyword));
        localStorage.setItem("type", JSON.stringify(selectedTypeValue));
        localStorage.setItem("label", JSON.stringify(selectedLabelValue));

        // Navigate to products page with URL params so filters persist
        const page = 1;
        const url = `products.html?keyword=${encodeURIComponent(keyword)}&type=${encodeURIComponent(selectedTypeValue || 'Категории')}&label=${encodeURIComponent(selectedLabelValue || 'Марка')}&page=${page}`;
        window.location.href = url;
    }




    let typeAcDiv = document.getElementsByClassName("ac-categories")
    console.log(typeAcDiv);
    debugger
    for (const typeAc of typeAcDiv) {
        typeAc.addEventListener("click", typeSearch)

    }

    let labelAcDiv = document.getElementsByClassName("ac-labels")
    for (const labelAc of labelAcDiv) {
        labelAc.addEventListener("click", typeSearch)

    }
});



function typeSearch(e) {
    debugger
    e.preventDefault()

    let selectedTypeValue = e.target.classList[0]
    console.log(selectedTypeValue);
    let seletedType = ''
    let selectedLabel = ""
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
    else if (selectedTypeValue == "auratsu") {
        selectedLabel = "Auratsu"
    }

    else if (selectedTypeValue == "kaisai") {
        selectedLabel = "Kaisai"
    }
    else if (selectedTypeValue == "daikin") {
        selectedLabel = "Daikin"
    }
    else if (selectedTypeValue == "fujitsu") {
        selectedLabel = "Fujitsu"
    }
    else if (selectedTypeValue == "general") {
        selectedLabel = "Fujitsu General"
    }
    else if (selectedTypeValue == "mitsubishi-heavy") {
        selectedLabel = "Mitsubishi Heavy Industries"
    }
    else if (selectedTypeValue == "mitsubishi-electric") {
        selectedLabel = "Mitsubishi Electric"
    }
    else if (selectedTypeValue == "williams") {
        selectedLabel = "Williams"
    }





    // Keep localStorage for compatibility
    localStorage.setItem("type", JSON.stringify(seletedType))
    localStorage.setItem("label", JSON.stringify(selectedLabel))

    // Navigate with query params so the products page shows correct filters
    const page = 1;
    const url = `products.html?keyword=&type=${encodeURIComponent(seletedType || 'Категории')}&label=${encodeURIComponent(selectedLabel || 'Марка')}&page=${page}`;
    window.location.href = url;
}








































