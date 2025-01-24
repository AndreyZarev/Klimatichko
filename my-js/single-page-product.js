window.addEventListener("DOMContentLoaded", () => {


    const productData = JSON.parse(localStorage.getItem("selectedProduct"));
    console.log(productData.name);



    function singleProduct(product) {
        debugger

        let attachProduct = document.getElementById("attach-product")
        const productElement = document.createElement("div");
        // console.log(attachProduct);

        const sectionHTML = createSingleProduct(product);
        productElement.innerHTML = sectionHTML

        attachProduct.appendChild(productElement)

        let title = document.getElementsByClassName("h1-promo")[0]

        title.textContent = `${product.name}`;

        // if (window.location.href != "single-product-page.html") {
        //     window.location.href = "single-product-page.html";

        // }

    }
    singleProduct(productData)

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

})