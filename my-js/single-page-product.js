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

        let title = document.getElementsByClassName("h1-promo")[0]

        title.textContent = `${productData.name}`;
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

        // if (window.location.href != "single-product-page.html") {
        //     window.location.href = "single-product-page.html";

        // }

    }
    singleProduct(productData, products)

    function createSingleProduct(product) {
        return `
        
        <div class="container single-product">
        
      
        <div class="left-side">
            <img src="${product.img}" alt="" srcset="">
        </div>

        <div class="right-side">
            <h4>Характеристики:</h4>
                <ul>
                    <li>Икономичен
                    </li>
                    <li>
                        С вграден онлайн контролер

                    </li>
                    <li>
                        Безшумен /19db/ за вътрешно тяло

                    </li>
                    <li>
                        Самодиагностика при проява на проблем

                    </li>
                    <li>
                        Авторестарт

                    </li>
                    <li>
                        Турбо режим
                    </li>
                </ul>
        </div>
        </div>

        <section class="details-table">
       <table>
            <tbody>
                <tr>
                    <td>За помещения (кв.м.)</td>
                    <td>&nbsp;до 10-12 кв.м.</td>
                </tr>
                <tr>
                    <td>Енергиен клас охлаждане</td>
                    <td>А++</td>
                </tr>
                <tr>
                    <td>Енергиен клас отопление</td>
                    <td>А++</td>
                </tr>
                <tr>
                    <td>Мощност</td>
                    <td>7 000 BTU</td>
                </tr>
                <tr>
                    <td>Препоръчителен обем (охлаждане) (куб. м.)</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Препоръчителен обем (отопление) (куб. м.)</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>Отдавана мощност (охлаждане) (kW)</td>
                    <td>1.30 – 2.00 – 2.60</td>
                </tr>
                <tr>
                    <td>Отдавана мощност (отопление) (kW)</td>
                    <td>1.30 – 2.50 – 3.50</td>
                </tr>
                <tr>
                    <td>Консумирана мощност (охлаждане) (kW)</td>
                    <td>0.50</td>
                </tr>
                <tr>
                    <td>Консумирана мощност (отопление) (kW)</td>
                    <td>0.59</td>
                </tr>
                <tr>
                    <td>Захранващо напрежение (V)</td>
                    <td>220-240</td>
                </tr>
                <tr>
                    <td>SEER (сезонна ефективност в режим на охлаждане)</td>
                    <td>6.79 – клас А++</td>
                </tr>
                <tr>
                    <td>SCOP (сезонна ефективност в режим на отопление)</td>
                    <td>4.65 – клас А++</td>
                </tr>
                <tr>
                    <td>Ниво на шум (вътрешно тяло) (dB)</td>
                    <td>20 – 25 – 39</td>
                </tr>
                <tr>
                    <td>Ниво на шум (външно тяло) (dB)</td>
                    <td>46</td>
                </tr>
                <tr>
                    <td>Размери В х Ш х Д (вътрешно тяло) (мм)</td>
                    <td>286 x 770 x 225</td>
                </tr>
                <tr>
                    <td>Размери В х Ш х Д (външно тяло) (мм)</td>
                    <td>550 x 658 x 275</td>
                </tr>
                <tr>
                    <td>Тегло (вътрешно тяло) (кг.)</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>Тегло (външно тяло) (кг.)</td>
                    <td>32</td>
                </tr>
                <tr>
                    <td>Работен диапазон при охлаждане (°C)</td>
                    <td>-10 до +46</td>
                </tr>
                <tr>
                    <td>Работен диапазон при отопление (°C)</td>
                    <td>-15 до +18</td>
                </tr>
                <tr>
                    <td>Хладилен агент</td>
                    <td>R32</td>
                </tr>
                <tr>
                    <td>Диаметър на тръбата – течност/газ (mm)</td>
                    <td>6.35/9.52</td>
                </tr>
                <tr>
                    <td>Захранване</td>
                    <td>Външно</td>
                </tr>
                <tr>
                    <td>Произход</td>
                    <td>Чехия/Турция</td>
                </tr>
                <tr>
                    <td>Гаранция</td>
                    <td>24/36 месеца</td>
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