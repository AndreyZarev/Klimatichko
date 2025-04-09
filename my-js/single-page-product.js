import { setupImageGallery } from "../my-js/utils/imageGallery.js";
window.addEventListener("DOMContentLoaded", () => {

    let imagePaths = []
    const productData = JSON.parse(localStorage.getItem("selectedProduct"));
    const products = JSON.parse(localStorage.getItem("similarProduct"));

    console.log(productData);
    console.log(products);



    function singleProduct(productData, products) {


        let attachProduct = document.getElementById("attach-product")
        const productElement = document.createElement("div");
        // console.log(attachProduct);

        const sectionHTML = createSingleProduct(productData);
        productElement.innerHTML = sectionHTML

        attachProduct.appendChild(productElement)

        let otherProducts = document.getElementById("other-products")

        if (products.length > 0) {
            let h1 = document.createElement("h1")
            h1.classList.add("other-products-h1")
            h1.textContent = "Подобни продукти"
            let div = document.getElementsByClassName("if-h1")[0];
            div.appendChild(h1)


        }
        products.forEach(product => {

            let div = document.createElement("div")
            div.classList.add("col-lg-4", "col-md-6", "wow", "ac-products", "other-product");
            div.addEventListener("click", () => { getToSingleProductPage(product.id) })
            div.innerHTML = createProductSection(product)
            otherProducts.appendChild(div)

        });


        attachProduct.scrollIntoView({ behavior: "smooth" });
    }
    singleProduct(productData, products)


    function createSingleProduct(product) {
        let discoutPrice = `
                 <p class="price-p">Намалена цена:</p> 
        
        `
        let discoutH3 = `
                  <p class="price-p"> Нормална цена:</p> 
                        <h3 class="h3-price-single h3-first">${product.price}.00 лв.</h3>
        
        `
        let normalH3 = `
                  <p class="price-p">Цена:</p> 
                        <h3 class="h3-price-single">${product.price}.00 лв.</h3>
        
        `
        let secondImg = `${product?.img1 ? product?.img1 : ""}`
        let thirdImg = `${product?.img2 ? product?.img2 : ""}`
        let fourthImg = `${product?.img3 ? product?.img3 : ""}`
        let fifthImg = `${product?.img4 ? product?.img4 : ""}`


        imagePaths = [
            product.img,
            secondImg,
            thirdImg,
            fourthImg,
            fifthImg
        ]
        let details1 = `<li class="single-item-top-text">
        ${product.details1}
        </li>`
        let details2 = `<li class="single-item-top-text">
        ${product.details2}
        </li>`
        let details3 = `<li class="single-item-top-text">
        ${product.details3}
        </li>`
        let details4 = `<li class="single-item-top-text">
        ${product.details4}
        </li>`
        let details5 = `<li class="single-item-top-text">
        ${product.details5}
        </li>`

        let details6 = `<li class="single-item-top-text">
                    ${product.details6}
                    </li>`
        let coolingCapacity = `
         <tr>
                    <td>Препоръчителен обем (охлаждане) (куб. м.)</td>
                    <td>${product.recommendedCoolingCapacity}</td>
                </tr>
        `
        let heatingCapacity = `
         <tr>
                    <td>Препоръчителен обем (отопление) (куб. м.)</td>
                    <td>${product.recommendedheatingCapacity}</td>
                </tr>
        `
        return `
        
        <div class="container single-product">
        
      
        <div class="left-side">
           <div id="galleryContainer"></div>
                
              
            
        </div>

        <div class="right-side">
        <h4>${product.model}</h4>
            <h5>Описание:</h5>
                <ul>
                  
                    ${product.details1 ? details1 : ""}
                    
                    
                    ${product.details2 ? details2 : ""}

                   
                    
                    ${product.details3 ? details3 : ""}

                   
                    
                    ${product.details4 ? details4 : ""}

                   
                   
                    ${product.details5 ? details5 : ""}

                   
                    ${product.details6 ? details6 : ""}
                </ul>

                <div class="div-h3-span-price">
                 ${product.discount ? discoutH3 : normalH3}
                        
    
                </div>
    
                <div class="div-h3-span-price">

                ${product.discount ? discoutPrice : ""}
                  <h3 class="h3-price-single h3-second">
   
  
                    
                
                 ${product.discount ? (product.price * 0.95).toFixed(2) + " лв." : ""}

                 </h3>
                </div>
                <p class="single-item-top-text">За консултация или поръчка можете да се свържете с нас.</p> 
                
                <div class="call-us-block">

                    <a class="call-us big-btnbig-btn" href="tel: 0896081213">
                        <span>
                            <img class="call-us-icon" src="img/new/icons8-phone-50.png" alt="" srcset="">
                        </span>
                         Обади се</a>
                </div>
                <p class="single-item-top-text">Можете и да разгледата опцията за разсрочено плащане тук.</p>
        </div>
         
        </div>
        <h4 class="char-h4">Характеристики:</h4>

        <section class="details-table">
       <table>
            <tbody>
                <tr>
                    <td class="td-pre-build">За помещения (кв. м.)</td>
                    <td>${product.forPlaces}</td>
                </tr>
                ${product.recommendedCoolingCapacity ? coolingCapacity : ""}
                ${product.recommendedheatingCapacity ? heatingCapacity : ""}
                <tr>
                    <td class="td-pre-build">Мощност</td>
                    <td>${product.size} BTU</td>
                </tr>
                
                <tr>
                    <td class="td-pre-build">Отдавана мощност (охлаждане) (kW)</td>
                    <td>${product.coolingPowerExert}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Отдавана мощност (отопление) (kW)</td>
                    <td>${product.heatingPowerExert}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Консумирана мощност (охлаждане) (kW)</td>
                    <td>${product.coolingPowerConsumption}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Консумирана мощност (отопление) (kW)</td>
                    <td>${product.heatingPowerConsumption}</td>
                </tr>
                  <tr>
                    <td class="td-pre-build">Енергиен клас охлаждане</td>
                    <td>${product.coolingEnergyClass}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Енергиен клас отопление</td>
                    <td>${product.heatEnergyClass}</td>
                </tr>
                
                <tr>
                    <td class="td-pre-build">Захранващо напрежение (V)</td>
                    <td>${product.voltage}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">SEER (сезонна ефективност в режим на охлаждане)</td>
                    <td>${product.seer}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">SCOP (сезонна ефективност в режим на отопление)</td>
                    <td>${product.scop}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Ниво на шум (вътрешно тяло) (dB)</td>
                    <td>${product.insideNoise}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Ниво на шум (външно тяло) (dB)</td>
                    <td>${product.outsideNoise}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Размери Д х В х Ш (вътрешно тяло) (мм)</td>
                    <td>${product.sizeInsideBody}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Размери Д х В х Ш (външно тяло) (мм)</td>
                    <td>${product.sizeOutsideBody}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Тегло (вътрешно тяло) (кг.)</td>
                    <td>${product.weightInsideBody}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Тегло (външно тяло) (кг.)</td>
                    <td>${product.weightOutsideBody}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Работен диапазон при охлаждане (°C)</td>
                    <td>${product.workingTempraturesForCooling}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Работен диапазон при отопление (°C)</td>
                    <td>${product.workingTempraturesForHeating}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Хладилен агент</td>
                    <td>${product.agent}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Диаметър на тръбата – течност/газ (mm)</td>
                    <td>${product.diameter}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Захранване</td>
                    <td>${product.power}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Произход</td>
                    <td>${product.madeIn}</td>
                </tr>
                <tr>
                    <td class="td-pre-build">Гаранция</td>
                    <td>${product.warranty}</td>
                </tr>
            </tbody>
            </table>
        </section>

        `
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





    document.addEventListener("DOMContentLoaded", function () {
        setupImageGallery("galleryContainer", imagePaths);

    });
    setupImageGallery("galleryContainer", imagePaths);

})

