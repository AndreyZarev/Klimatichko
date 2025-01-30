window.addEventListener("DOMContentLoaded", () => {


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

        let title = document.getElementsByClassName("h3-promo")[0]

        title.textContent = `${productData.keyword}`;
        let otherProducts = document.getElementById("other-products")
        debugger
        if (products.length > 0) {
            let h1 = document.createElement("h1")
            h1.classList.add("other-products-h1")
            h1.textContent = "Подобни продукти"
            let div = document.getElementsByClassName("if-h1")[0];
            div.appendChild(h1)


        }
        products.forEach(product => {

            let div = document.createElement("div")
            div.classList.add("col-lg-4", "col-md-6", "wow", "ac-products");
            div.addEventListener("click", () => { getToSingleProductPage(product.id) })
            div.innerHTML = createProductSection(product)
            otherProducts.appendChild(div)

        });


        attachProduct.scrollIntoView({ behavior: "smooth" });
    }
    singleProduct(productData, products)

    function createSingleProduct(product) {
        let discoutPrice = `
                 <p class="">Намалена цена:</p> 
        
        `
        let discoutH3 = `
                  <p class=""> Нормална цена:</p> 
                        <h3 class="h3-price-single h3-first">${product.price}.00 лв.</h3>
        
        `
        let normalH3 = `
                  <p class="">Цена:</p> 
                        <h3 class="h3-price-single">${product.price}.00 лв.</h3>
        
        `
        return `
        
        <div class="container single-product">
        
      
        <div class="left-side">
            <img src="${product.img}" alt="AC image" srcset="">
        </div>

        <div class="right-side">
            <h4>Характеристики:</h4>
                <ul>
                    <li>${product.details1}
                    </li>
                    <li>
                    ${product.details2}

                    </li>
                    <li>
                    ${product.details3}

                    </li>
                    <li>
                    ${product.details4}

                    </li>
                    <li>
                    ${product.details5}

                    </li>
                    <li>
                    ${product.details6}
                    </li>
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

        </div>
        </div>

        <section class="details-table">
       <table>
            <tbody>
                <tr>
                    <td>За помещения (кв.м.)</td>
                    <td>${product.forPlaces}</td>
                </tr>
                <tr>
                    <td>Енергиен клас охлаждане</td>
                    <td>${product.coolingEnergyClass}</td>
                </tr>
                <tr>
                    <td>Енергиен клас отопление</td>
                    <td>${product.heatEnergyClass}</td>
                </tr>
                <tr>
                    <td>Мощност</td>
                    <td>${product.size} BTU</td>
                </tr>
                <tr>
                    <td>Препоръчителен обем (охлаждане) (куб. м.)</td>
                    <td>${product.recommendedCoolingCapacity}</td>
                </tr>
                <tr>
                    <td>Препоръчителен обем (отопление) (куб. м.)</td>
                    <td>${product.recommendedheatingCapacity}</td>
                </tr>
                <tr>
                    <td>Отдавана мощност (охлаждане) (kW)</td>
                    <td>${product.coolingPowerExert}</td>
                </tr>
                <tr>
                    <td>Отдавана мощност (отопление) (kW)</td>
                    <td>${product.heatingPowerExert}</td>
                </tr>
                <tr>
                    <td>Консумирана мощност (охлаждане) (kW)</td>
                    <td>${product.coolingPowerConsumption}</td>
                </tr>
                <tr>
                    <td>Консумирана мощност (отопление) (kW)</td>
                    <td>${product.heatingPowerConsumption}</td>
                </tr>
                <tr>
                    <td>Захранващо напрежение (V)</td>
                    <td>${product.voltage}</td>
                </tr>
                <tr>
                    <td>SEER (сезонна ефективност в режим на охлаждане)</td>
                    <td>${product.seer}</td>
                </tr>
                <tr>
                    <td>SCOP (сезонна ефективност в режим на отопление)</td>
                    <td>${product.scop}</td>
                </tr>
                <tr>
                    <td>Ниво на шум (вътрешно тяло) (dB)</td>
                    <td>${product.insideNoise}</td>
                </tr>
                <tr>
                    <td>Ниво на шум (външно тяло) (dB)</td>
                    <td>${product.outsideNoise}</td>
                </tr>
                <tr>
                    <td>Размери В х Ш х Д (вътрешно тяло) (мм)</td>
                    <td>${product.sizeInsideBody}</td>
                </tr>
                <tr>
                    <td>Размери В х Ш х Д (външно тяло) (мм)</td>
                    <td>${product.sizeOutsideBody}</td>
                </tr>
                <tr>
                    <td>Тегло (вътрешно тяло) (кг.)</td>
                    <td>${product.weightInsideBody}</td>
                </tr>
                <tr>
                    <td>Тегло (външно тяло) (кг.)</td>
                    <td>${product.weightOutsideBody}</td>
                </tr>
                <tr>
                    <td>Работен диапазон при охлаждане (°C)</td>
                    <td>${product.workingTempraturesForCooling}</td>
                </tr>
                <tr>
                    <td>Работен диапазон при отопление (°C)</td>
                    <td>${product.workingTempraturesForHeating}</td>
                </tr>
                <tr>
                    <td>Хладилен агент</td>
                    <td>${product.agent}</td>
                </tr>
                <tr>
                    <td>Диаметър на тръбата – течност/газ (mm)</td>
                    <td>${product.diameter}</td>
                </tr>
                <tr>
                    <td>Захранване</td>
                    <td>${product.power}</td>
                </tr>
                <tr>
                    <td>Произход</td>
                    <td>${product.madeIn}</td>
                </tr>
                <tr>
                    <td>Гаранция</td>
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




})