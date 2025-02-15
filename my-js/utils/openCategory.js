
window.addEventListener("DOMContentLoaded", () => {


    let linkArray = document.getElementsByClassName('category-link');



    for (let i = 0; i < linkArray.length; i++) {
        const link = linkArray[i];
        let selectedTypeValue = link.id



        link.addEventListener("click", () => {

            localStorage.setItem("type", JSON.stringify(selectedTypeValue))

            window.location.href = "products.html";
        });


    }
});
