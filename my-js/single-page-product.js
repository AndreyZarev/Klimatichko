import { setupImageGallery } from "../my-js/utils/imageGallery.js";

let imagePaths = []; // global

// Global brand placeholder function
function getBrandPlaceholder(brand) {
    switch (brand) {
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

// --- FUNCTIONS --- //
function createSingleProduct(product) {
    // Handle images based on product type

    // Handle images intelligently
    if (product.Teo === "new") {
        // For new products, only show generic 404 placeholder
        imagePaths = ['img/404-product-image.svg'];
    } else {
        // For original products (Teo: "don't touch it's updated"), show all available images
        const brandPlaceholder = getBrandPlaceholder(product.label);
        const mainImg = product.img || brandPlaceholder;
        const additionalImages = [product?.img1, product?.img2, product?.img3, product?.img4].filter(img => img && img.trim() !== "");

        imagePaths = [mainImg, ...additionalImages].filter(img => img && img.trim() !== "");

        // If no images at all, use brand placeholder
        if (imagePaths.length === 0) {
            imagePaths = [brandPlaceholder];
        }
    }

    const discountHTML = product.discount
        ? `
        <div class="div-h3-span-price">
            <p class="price-p">Нормална цена:</p>
            <h3 class="h3-price-single h3-first">${product.price}.00 лв. / ${(product.price / 1.96).toFixed(2)} €</h3>
        </div>
        <div class="div-h3-span-price">
            <p class="price-p">Намалена цена:</p>
            <h3 class="h3-price-single h3-second">${(product.price * 0.95).toFixed(2)} лв. / ${((product.price * 0.95) / 1.96).toFixed(2)} €</h3>
        </div>
        `
        : `
        <div class="div-h3-span-price">
            <p class="price-p">Цена:</p>
            <h3 class="h3-price-single">${product.price}.00 лв. / ${(product.price / 1.96).toFixed(2)} €</h3>
        </div>
        `;

    // Optional details
    const detailsList = [product.details1, product.details2, product.details3, product.details4, product.details5, product.details6]
        .filter(detail => detail)
        .map(detail => `<li class="single-item-top-text">${detail}</li>`)
        .join("");

    // Optional cooling/heating capacity
    const coolingCapacity = product.recommendedCoolingCapacity ? `
        <tr>
            <td>Препоръчителен обем (охлаждане) (куб. м.)</td>
            <td>${product.recommendedCoolingCapacity}</td>
        </tr>` : "";

    const heatingCapacity = product.recommendedheatingCapacity ? `
        <tr>
            <td>Препоръчителен обем (отопление) (куб. м.)</td>
            <td>${product.recommendedheatingCapacity}</td>
        </tr>` : "";

    return `
    <div class="container single-product">
        <div class="left-side">
            <div id="galleryContainer"></div>
        </div>

        <div class="right-side">
            <h4>${product.model}</h4>
            <h5>Описание:</h5>
            <ul>${detailsList}</ul>

            ${discountHTML}

            <p class="single-item-top-text">За консултация или поръчка можете да се свържете с нас.</p>

            <!-- Call Us Button - Green with Phone Icon -->
            <div class="call-us-block" style="margin: 15px 0;">
                <a class="call-us big-btn" href="tel:0896081213" style="width: 100%; display: flex; align-items: center; justify-content: center; background: #25D366; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; text-align: center; font-size: 16px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-shadow: 0 3px 6px rgba(37, 211, 102, 0.3); transition: all 0.3s ease; white-space: nowrap;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(37, 211, 102, 0.4)'; this.style.background='#22C55E'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 6px rgba(37, 211, 102, 0.3)'; this.style.background='#25D366'">
                    <svg style="width: 20px; height: 20px; margin-right: 10px; fill: white;" viewBox="0 0 24 24">
                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                    Обади се сега
                </a>
            </div>

            <!-- TBI Bank Installment Calculator - Medium Size -->
            <div class="tbi-installment-section" style="margin: 15px 0;">
                <div class="tbi-header" style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin-right: 6px;">Купи с</span>
                    <div style="background: black; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold; font-size: 13px; margin-right: 6px;">TBI</div>
                    <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">bank</span>
                </div>

                <div class="tbi-orange-banner" style="background: linear-gradient(135deg, #ff6b35, #f7931e); border-radius: 6px; padding: 10px 12px; color: white; text-align: center; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        на вноски започвайки от <span id="tbiMonthlyPayment" style="font-size: 18px; font-weight: bold;">-</span> лв. (<span id="tbiMonthlyPaymentEuro" style="font-size: 15px;">-</span> €)
                    </div>
                </div>

                <div class="installment-calculator">
                    <div class="form-group" style="margin-bottom: 12px;">
                        <label for="installmentMonths" style="display: block; margin-bottom: 6px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 16px;">Избери период:</label>
                        <div style="position: relative;">
                            <select id="installmentMonths" class="form-control" style="width: 100%; padding: 12px 35px 12px 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: white; appearance: none; -webkit-appearance: none; -moz-appearance: none; color: #666; font-weight: 700;">
                                <option value="3">3 месеца (0% лихва)</option>
                                <option value="6">6 месеца (0% лихва)</option>
                                <option value="12" selected>12 месеца (0% лихва)</option>
                                <option value="18">18 месеца (5% лихва)</option>
                                <option value="24">24 месеца (5% лихва)</option>
                            </select>
                            <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #666; font-size: 16px;">▼</div>
                        </div>
                    </div>

                    <div class="installment-details" style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 12px; border-left: 4px solid #007bff;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: #666; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">Месечна вноска:</span>
                            <div style="text-align: right;">
                                <strong id="monthlyPayment" style="color: #333; font-size: 18px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">-</strong>
                                <span id="monthlyPaymentEuro" style="color: #666; margin-left: 8px; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">(-)</span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #666; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">Обща сума:</span>
                            <div style="text-align: right;">
                                <strong id="totalAmount" style="color: #333; font-size: 18px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">-</strong>
                                <span id="totalAmountEuro" style="color: #666; margin-left: 8px; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 700;">(-)</span>
                            </div>
                        </div>
                    </div>

                    <button id="applyInstallmentBtn" style="width: 100%; display: block; background: linear-gradient(135deg, #ff6b35, #f7931e); border: none; padding: 12px 20px; border-radius: 8px; color: white; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 3px 6px rgba(255,107,53,0.3); white-space: nowrap;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(255,107,53,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 6px rgba(255,107,53,0.3)'">
                        Кандидатствай сега
                    </button>
                </div>
            </div>
        </div>
    </div>

    <h4 class="char-h4">Характеристики:</h4>

    <section class="details-table">
        <table>
            <tbody>
                <tr><td class="td-pre-build">За помещения (кв. м.)</td><td>${product.forPlaces || ""}</td></tr>
                ${coolingCapacity}
                ${heatingCapacity}
                <tr><td class="td-pre-build">Мощност</td><td>${product.size || ""} BTU</td></tr>
                <tr><td class="td-pre-build">Отдавана мощност (охлаждане) (kW)</td><td>${product.coolingPowerExert || ""}</td></tr>
                <tr><td class="td-pre-build">Отдавана мощност (отопление) (kW)</td><td>${product.heatingPowerExert || ""}</td></tr>
                <tr><td class="td-pre-build">Консумирана мощност (охлаждане) (kW)</td><td>${product.coolingPowerConsumption || ""}</td></tr>
                <tr><td class="td-pre-build">Консумирана мощност (отопление) (kW)</td><td>${product.heatingPowerConsumption || ""}</td></tr>
                <tr><td class="td-pre-build">Енергиен клас охлаждане</td><td>${product.coolingEnergyClass || ""}</td></tr>
                <tr><td class="td-pre-build">Енергиен клас отопление</td><td>${product.heatEnergyClass || ""}</td></tr>
                <tr><td class="td-pre-build">Захранващо напрежение (V)</td><td>${product.voltage || ""}</td></tr>
                <tr><td class="td-pre-build">SEER</td><td>${product.seer || ""}</td></tr>
                <tr><td class="td-pre-build">SCOP</td><td>${product.scop || ""}</td></tr>
                <tr><td class="td-pre-build">Ниво на шум (вътрешно тяло) (dB)</td><td>${product.insideNoise || ""}</td></tr>
                <tr><td class="td-pre-build">Ниво на шум (външно тяло) (dB)</td><td>${product.outsideNoise || ""}</td></tr>
                <tr><td class="td-pre-build">Размери вътрешно тяло</td><td>${product.sizeInsideBody || ""}</td></tr>
                <tr><td class="td-pre-build">Размери външно тяло</td><td>${product.sizeOutsideBody || ""}</td></tr>
                <tr><td class="td-pre-build">Тегло вътрешно тяло (кг.)</td><td>${product.weightInsideBody || ""}</td></tr>
                <tr><td class="td-pre-build">Тегло външно тяло (кг.)</td><td>${product.weightOutsideBody || ""}</td></tr>
                <tr><td class="td-pre-build">Работен диапазон охлаждане (°C)</td><td>${product.workingTempraturesForCooling || ""}</td></tr>
                <tr><td class="td-pre-build">Работен диапазон отопление (°C)</td><td>${product.workingTempraturesForHeating || ""}</td></tr>
                <tr><td class="td-pre-build">Хладилен агент</td><td>${product.agent || ""}</td></tr>
                <tr><td class="td-pre-build">Диаметър на тръбата</td><td>${product.diameter || ""}</td></tr>
                <tr><td class="td-pre-build">Захранване</td><td>${product.power || ""}</td></tr>
                <tr><td class="td-pre-build">Произход</td><td>${product.madeIn || ""}</td></tr>
                <tr><td class="td-pre-build">Гаранция</td><td>${product.warranty || ""}</td></tr>
            </tbody>
        </table>
    </section>
    `;
}

function createProductSection(product) {
    // Check if product has discount and calculate discounted price
    const hasDiscount = product.discount;
    const currentPrice = hasDiscount ? (product.price * 0.95).toFixed(2) : null;

    // Create discount badge if product has discount
    const discountBadge = hasDiscount ?
        `<div class="bg-primary discount rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
            ${product.discount}
        </div>` : '';

    // Create price section based on whether product has discount
    const priceSection = hasDiscount ?
        `<h5 class="first-price">${product.price.toFixed(2)}лв / ${(product.price / 1.96).toFixed(2)}€</h5>
        <h5 class="second-price">${currentPrice}лв / ${(currentPrice / 1.96).toFixed(2)}€</h5>` :
        `<h5 class="normal-price">${product.price.toFixed(2)}лв / ${(product.price / 1.96).toFixed(2)}€</h5>`;

    // Handle images based on product type
    let imageToShow = product.img;
    let fallbackImage;

    if (product.Teo === "new") {
        // For new products, always use generic 404 placeholder
        imageToShow = 'img/404-product-image.svg';
        fallbackImage = 'img/404-product-image.svg';
    } else {
        // For original products, use brand-specific placeholders as fallback
        fallbackImage = getBrandPlaceholder(product.label);
    }

    return `
       <div class="property-item rounded overflow-hidden product-html" id="${product.id}">
            <div class="position-relative overflow-hidden img-ac-products">
                <a><img class="img-fluid img-ac-products"
                    src="${imageToShow}"
                    alt="${product.name}"
                    onerror="this.src='${fallbackImage}'; this.onerror=null;"></a>
                ${discountBadge}
            </div>
            <div class="pb-0 div-price">
                ${priceSection}
                <a class="d-block">${product.name}</a>
            </div>
            <a class="call-us" href="tel:0896081213" style="background: #25D366; color: white; display: flex; align-items: center; justify-content: center; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: 500; font-size: 12px; transition: all 0.3s ease;" onmouseover="this.style.background='#22C55E'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#25D366'; this.style.transform='translateY(0)'">
                <svg style="width: 12px; height: 12px; margin-right: 4px; fill: white;" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
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


function singleProduct(productData, products) {
    const attachProduct = document.getElementById("attach-product");
    const otherProducts = document.getElementById("other-products");
    const titleDiv = document.querySelector(".if-h1");

    attachProduct.innerHTML = "";
    otherProducts.innerHTML = "";
    titleDiv.innerHTML = "";

    const productElement = document.createElement("div");
    productElement.innerHTML = createSingleProduct(productData);
    attachProduct.appendChild(productElement);

    if (products.length > 0) {
        const h1 = document.createElement("h1");
        h1.classList.add("other-products-h1");
        h1.textContent = "Подобни продукти";
        titleDiv.appendChild(h1);
    }

    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "wow", "ac-products", "other-product");
        div.innerHTML = createProductSection(product);
        div.addEventListener("click", () => getToSingleProductPage(product.id));
        otherProducts.appendChild(div);
    });

    setupImageGallery("galleryContainer", imagePaths, productData.label);

    // Initialize TBI Bank calculator
    initializeTBICalculator(productData);

    // Add event listener to update modal image when gallery main image changes
    setTimeout(() => {
        const bigImage = document.getElementById('bigImage');
        if (bigImage) {
            // Store original src for comparison
            let lastImageSrc = bigImage.src;

            // Check for image changes periodically (when user clicks small images)
            const imageChangeObserver = new MutationObserver(() => {
                if (bigImage.src !== lastImageSrc) {
                    lastImageSrc = bigImage.src;
                    // Update modal image if modal is open
                    const modalImage = document.querySelector('#tbiModal img');
                    if (modalImage) {
                        modalImage.src = getCurrentMainImage();
                    }
                }
            });

            imageChangeObserver.observe(bigImage, { attributes: true, attributeFilter: ['src'] });
        }
    }, 1000); // Wait for gallery to be fully initialized

    // Scroll to top nicely
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function getToSingleProductPage(id) {
    if (window.location.pathname.includes("single-product-page.html")) {
        history.pushState(null, "", `single-product-page.html?id=${id}`);
        loadProductFromURL();
    } else {
        window.location.href = `single-product-page.html?id=${id}`;
    }
}

// Helper function to get the current main image displayed in the gallery
function getCurrentMainImage() {
    // Get the main image from the gallery using the correct ID
    const bigImage = document.getElementById('bigImage');
    if (bigImage && bigImage.src) {
        // Convert absolute URL to relative path if needed
        const src = bigImage.src;
        if (src.includes(window.location.origin)) {
            return src.replace(window.location.origin + '/', '');
        }
        return src;
    }

    // Fallback to imagePaths[0] if gallery not ready
    if (imagePaths && imagePaths.length > 0) {
        return imagePaths[0];
    }

    // Final fallback - use brand placeholder if available
    const currentProduct = window.currentProduct;
    if (currentProduct && currentProduct.label) {
        return getBrandPlaceholder(currentProduct.label);
    }
    return 'img/404-product-image.svg';
}

// TBI Bank Calculator Functions
function initializeTBICalculator(product) {
    const monthsSelect = document.getElementById('installmentMonths');
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const monthlyPaymentEuroSpan = document.getElementById('monthlyPaymentEuro');
    const totalAmountSpan = document.getElementById('totalAmount');
    const totalAmountEuroSpan = document.getElementById('totalAmountEuro');
    const tbiMonthlyPayment = document.getElementById('tbiMonthlyPayment');
    const tbiMonthlyPaymentEuro = document.getElementById('tbiMonthlyPaymentEuro');
    const applyBtn = document.getElementById('applyInstallmentBtn');

    if (!monthsSelect || !monthlyPaymentSpan || !totalAmountSpan || !applyBtn) {
        console.warn('TBI Bank calculator elements not found');
        return;
    }

    // Get product price (use discounted price if available)
    const productPrice = product.discount ? (product.price * 0.95) : product.price;

    // Check if product qualifies for installments (minimum 100 BGN)
    if (productPrice < 100) {
        document.querySelector('.tbi-installment-section').style.display = 'none';
        return;
    }

    // BGN to EUR conversion rate (approximate)
    const BGN_TO_EUR = 0.51;

    // Convert BGN to EUR
    function convertToEuro(bgnAmount) {
        return (bgnAmount * BGN_TO_EUR).toFixed(2);
    }

    // Calculate installments when months change
    function calculateInstallment() {
        const months = parseInt(monthsSelect.value);
        let monthlyPayment, totalAmount;

        if (months <= 12) {
            // 0% interest for 3, 6, 12 months
            monthlyPayment = productPrice / months;
            totalAmount = productPrice;
        } else {
            // 5% annual interest for 18, 24 months
            const annualRate = 0.05;
            const totalInterest = productPrice * annualRate * (months / 12);
            totalAmount = productPrice + totalInterest;
            monthlyPayment = totalAmount / months;
        }

        // Update all payment displays
        const monthlyBGN = monthlyPayment.toFixed(2);
        const monthlyEUR = convertToEuro(monthlyPayment);
        const totalBGN = totalAmount.toFixed(2);
        const totalEUR = convertToEuro(totalAmount);

        // Update main orange banner
        tbiMonthlyPayment.textContent = monthlyBGN;
        tbiMonthlyPaymentEuro.textContent = monthlyEUR;

        // Update detailed breakdown
        monthlyPaymentSpan.textContent = `${monthlyBGN} лв`;
        monthlyPaymentEuroSpan.textContent = `(${monthlyEUR} €)`;
        totalAmountSpan.textContent = `${totalBGN} лв`;
        totalAmountEuroSpan.textContent = `(${totalEUR} €)`;
    }

    // Initial calculation
    calculateInstallment();

    // Update calculation when months change
    monthsSelect.addEventListener('change', calculateInstallment);

    // Handle apply button click
    applyBtn.addEventListener('click', () => {
        const months = parseInt(monthsSelect.value);
        const monthlyPaymentText = monthlyPaymentSpan.textContent;
        const monthlyPayment = parseFloat(monthlyPaymentText.replace(' лв', ''));

        // Redirect to TBI Bank application with product details
        applyForInstallment(product, productPrice, months, monthlyPayment);
    });
}

function applyForInstallment(product, amount, months, monthlyPayment) {
    // Show TBI Bank modal instead of alert
    showTBIModal(product, amount, months, monthlyPayment);
}

// Show TBI Bank Modal
function showTBIModal(product, amount, months, monthlyPayment) {
    // Calculate total amount with interest
    const interestRate = months > 12 ? 0.05 : 0;
    const totalAmount = amount * (1 + (interestRate * months / 12));
    const actualMonthlyPayment = totalAmount / months;

    // Calculate APR and other rates
    const apr = interestRate > 0 ? (interestRate * 100).toFixed(2) : '0.00';
    const effectiveRate = interestRate > 0 ? ((Math.pow(1 + interestRate / 12, 12) - 1) * 100).toFixed(2) : '0.00';

    // Create modal HTML
    const modalHTML = `
        <div id="tbiModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;" onclick="closeTBIModal()">
            <div id="tbiModalContent" style="background: white; border-radius: 12px; width: 95%; max-width: 600px; max-height: 90vh; overflow-y: auto; overflow-x: visible; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); padding: 20px 0;" onclick="event.stopPropagation()">
                <!-- Close Button -->
                <button id="closeTBIBtn" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; color: #666; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; z-index: 1;">×</button>

                <!-- Product Header -->
                <div style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #eee;">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="${getCurrentMainImage()}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 15px;" onerror="this.src='${product.Teo === 'new' ? 'img/404-product-image.svg' : getBrandPlaceholder(product.label)}'">
                        <div>
                            <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.3;">${product.name}</h3>
                            <div style="font-size: 20px; font-weight: bold; color: #333; margin-top: 6px;">${amount.toFixed(2)} лв. (${(amount / 1.96).toFixed(2)}€)</div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="padding: 20px;">
                    <!-- Header with orange dot -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background: #ff6b35; border-radius: 50%; margin-right: 12px;"></div>
                            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #333; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Избери си вноска</h2>
                        </div>
                        <button id="proceedTBIBtnHeader" style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; border: none; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(255,107,53,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">Продължи</button>
                    </div>

                    <div style="color: #666; font-size: 16px; margin-bottom: 20px;">започваща от ${(amount / 48).toFixed(2)} лв. ( ${(amount / 48 / 1.96).toFixed(2)} €)/месец</div>

                    <!-- Monthly Payment Display -->
                    <div style="font-size: 28px; font-weight: bold; color: #ff6b35; margin-bottom: 25px;">
                        <span id="modalMonthlyPayment">${actualMonthlyPayment.toFixed(2)}</span> лв. (<span id="modalMonthlyPaymentEuro">${(actualMonthlyPayment / 1.96).toFixed(2)}</span> €) / месец
                    </div>

                    <!-- Period Selection -->
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="font-size: 18px; color: #666; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">избери период</span>
                            <span style="font-size: 18px; color: #666; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Обща дължима сума</span>
                        </div>

                        <!-- Slider Container -->
                        <div style="position: relative; margin-bottom: 15px;">
                            <input type="range" id="monthsSlider" min="3" max="48" value="${months}" style="width: 100%; height: 8px; background: #ddd; border-radius: 4px; outline: none; -webkit-appearance: none;">
                            <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 14px; color: #999;">
                                <span>3 месеца</span>
                                <span>48 месеца</span>
                            </div>
                        </div>

                        <div style="text-align: center; margin-bottom: 15px;">
                            <span id="selectedMonths" style="font-size: 22px; font-weight: bold; color: #333;">${months}</span>
                            <span style="font-size: 16px; color: #999; margin-left: 5px;">месеца</span>
                        </div>

                        <div style="text-align: right; font-size: 20px; font-weight: bold; color: #333;">
                            <span id="modalTotalAmount">${totalAmount.toFixed(2)}</span> лв.(<span id="modalTotalAmountEuro">${(totalAmount / 1.96).toFixed(2)}</span> €)
                        </div>
                    </div>

                    <!-- Interest Rates -->
                    <div style="margin-bottom: 20px; padding: 0 20px; position: relative; overflow: visible;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div style="display: flex; align-items: center;">
                                <span style="color: #666; font-size: 16px; margin-right: 8px;">ГПР</span>
                                <div class="tooltip-container" style="position: relative; display: inline-block;">
                                    <div style="width: 20px; height: 20px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; cursor: help;" onmouseover="showTooltip(this, 'Годишен процентен разход - общата цена на кредита, изразена като годишен процент')" onmouseout="hideTooltip(this)">?</div>
                                    <div class="tooltip" style="visibility: hidden; width: 260px; background-color: #333; color: #fff; text-align: center; border-radius: 8px; padding: 12px; position: fixed; z-index: 10001; bottom: auto; left: 50%; transform: translateX(-50%) translateY(-100%); font-size: 13px; line-height: 1.4; opacity: 0; transition: opacity 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: -60px;">
                                        Годишен процентен разход - общата цена на кредита, изразена като годишен процент
                                        <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 6px; border-style: solid; border-color: #333 transparent transparent transparent;"></div>
                                    </div>
                                </div>
                            </div>
                            <span class="apr-rate" style="font-size: 18px; font-weight: bold; color: #333;">${apr} %</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center;">
                                <span style="color: #666; font-size: 16px; margin-right: 8px;">ГЛП</span>
                                <div class="tooltip-container" style="position: relative; display: inline-block;">
                                    <div style="width: 20px; height: 20px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; cursor: help;" onmouseover="showTooltip(this, 'Годишна лихва по погасяване - лихвеният процент, който се начислява върху кредита')" onmouseout="hideTooltip(this)">?</div>
                                    <div class="tooltip" style="visibility: hidden; width: 260px; background-color: #333; color: #fff; text-align: center; border-radius: 8px; padding: 12px; position: fixed; z-index: 10001; bottom: auto; left: 50%; transform: translateX(-50%) translateY(-100%); font-size: 13px; line-height: 1.4; opacity: 0; transition: opacity 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-top: -60px;">
                                        Годишна лихва по погасяване - лихвеният процент, който се начислява върху кредита
                                        <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 6px; border-style: solid; border-color: #333 transparent transparent transparent;"></div>
                                    </div>
                                </div>
                            </div>
                            <span class="glp-rate" style="font-size: 18px; font-weight: bold; color: #333;">${effectiveRate} %</span>
                        </div>
                    </div>

                    <!-- Continue Button -->
                    <div style="padding: 20px;">
                        <button id="proceedTBIBtn" style="width: 100%; background: #ff6b35; color: white; border: none; padding: 15px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            Продължи
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listeners
    const slider = document.getElementById('monthsSlider');
    slider.addEventListener('input', function () {
        updateModalCalculations(product, amount, parseInt(this.value));
    });

    // Close button event listener
    document.getElementById('closeTBIBtn').addEventListener('click', closeTBIModal);

    // Proceed button event listeners (both header and footer buttons)
    document.getElementById('proceedTBIBtn').addEventListener('click', function () {
        // Add loading state
        this.innerHTML = 'Обработва...';
        this.disabled = true;
        setTimeout(() => {
            proceedWithTBI(product, amount, parseInt(slider.value));
        }, 500);
    });

    document.getElementById('proceedTBIBtnHeader').addEventListener('click', function () {
        // Add loading state
        this.innerHTML = 'Обработва...';
        this.disabled = true;
        setTimeout(() => {
            proceedWithTBI(product, amount, parseInt(slider.value));
        }, 500);
    });

    // Keyboard support - close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.getElementById('tbiModal')) {
            closeTBIModal();
        }
    });

    // Add tooltip functions to global scope
    window.showTooltip = function (element, text) {
        const tooltip = element.parentNode.querySelector('.tooltip');
        if (tooltip) {
            // Get element position for fixed positioning
            const rect = element.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 10) + 'px';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        }
    };

    window.hideTooltip = function (element) {
        const tooltip = element.parentNode.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }
    };
}

// Update modal calculations when slider changes
function updateModalCalculations(product, amount, months) {
    const interestRate = months > 12 ? 0.05 : 0;
    const totalAmount = amount * (1 + (interestRate * months / 12));
    const monthlyPayment = totalAmount / months;

    // Update display values
    document.getElementById('modalMonthlyPayment').textContent = monthlyPayment.toFixed(2);
    document.getElementById('modalMonthlyPaymentEuro').textContent = (monthlyPayment / 1.96).toFixed(2);
    document.getElementById('modalTotalAmount').textContent = totalAmount.toFixed(2);
    document.getElementById('modalTotalAmountEuro').textContent = (totalAmount / 1.96).toFixed(2);
    document.getElementById('selectedMonths').textContent = months;

    // Update rates - display the calculated rates
    const apr = interestRate > 0 ? (interestRate * 100).toFixed(2) : '0.00';
    const effectiveRate = interestRate > 0 ? ((Math.pow(1 + interestRate / 12, 12) - 1) * 100).toFixed(2) : '0.00';

    // Update the displayed rates
    const aprElement = document.querySelector('#tbiModal .apr-rate');
    const glpElement = document.querySelector('#tbiModal .glp-rate');
    if (aprElement) aprElement.textContent = apr + ' %';
    if (glpElement) glpElement.textContent = effectiveRate + ' %';
}

// Close TBI Modal
function closeTBIModal() {
    const modal = document.getElementById('tbiModal');
    if (modal) {
        modal.remove();
    }
}

// Make closeTBIModal globally available
window.closeTBIModal = closeTBIModal;

// Proceed with TBI application
function proceedWithTBI(product = null, amount = null, months = null) {
    // Load TBI Bank configuration
    if (typeof TBI_BANK_CONFIG === 'undefined') {
        console.error('TBI Bank configuration not loaded');
        alert('Услугата за разсрочване временно не е достъпна. Моля, свържете се с нас на телефон.');
        return;
    }

    const config = TBI_BANK_CONFIG;
    const baseUrl = config.endpoints[config.environment].apply;

    // Get current values from modal
    const selectedMonths = parseInt(document.getElementById('selectedMonths').textContent);
    const monthlyPayment = parseFloat(document.getElementById('modalMonthlyPayment').textContent);
    const totalAmount = parseFloat(document.getElementById('modalTotalAmount').textContent);

    // Prepare application data
    const applicationData = {
        merchantId: config.merchantId,
        amount: totalAmount.toFixed(2),
        currency: config.currency,
        months: selectedMonths,
        monthlyPayment: monthlyPayment.toFixed(2),
        returnUrl: config.returnUrls.success,
        cancelUrl: config.returnUrls.cancel,
        language: config.language
    };

    console.log('TBI Bank Application Data:', applicationData);

    // Close modal
    closeTBIModal();

    // In production, redirect to TBI Bank
    if (config.environment === 'production') {
        window.location.href = `${baseUrl}?${new URLSearchParams(applicationData)}`;
    } else {
        // In sandbox mode, show success message
        alert('Тестов режим: Кандидатурата би била изпратена към TBI Bank.\n\nВ реален режим ще бъдете пренасочени към тяхната платформа.');
    }
}

// Toggle TBI Bank details
function toggleTBIDetails() {
    const details = document.getElementById('tbiDetails');
    if (details) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}

function loadProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get("id"));

    // Fallback to localStorage if no ID in URL
    if (isNaN(id)) {
        const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
        id = storedProduct?.id;
    }

    // If still no valid ID, show error
    if (isNaN(id) || id <= 0) {
        console.error("No valid product ID found");
        return;
    }

    console.log(`Loading product with ID: ${id}`); // Debug log

    // Always try to load from all-products.json first (contains all 152 products)
    fetch("data-json/all-products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Searching for product ID ${id} in ${data.length} products`); // Debug log

            const specificItem = data.find(item => item.id === id);

            if (specificItem) {
                console.log(`Found product: ${specificItem.name}`); // Debug log

                // Find similar products (same brand or nearby IDs)
                const similarItems = data.filter(item =>
                    item.id !== id && (
                        item.label === specificItem.label || // Same brand
                        Math.abs(item.id - id) <= 2 // Nearby IDs
                    )
                ).slice(0, 3); // Limit to 3 similar products

                singleProduct(specificItem, similarItems);
            } else {
                console.error(`Product with ID ${id} not found in all-products.json`);
                // Fallback: try promotional products
                loadFromPromoProducts(id);
            }
        })
        .catch(error => {
            console.error("Error loading from all-products.json:", error);
            // Fallback: try promotional products
            loadFromPromoProducts(id);
        });
}

// Fallback function to load from promotional products
function loadFromPromoProducts(id) {
    console.log(`Trying to load product ID ${id} from promo-ac.json`); // Debug log

    fetch("data-json/types/promo-ac.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const specificItem = data.find(item => item.id === id);

            if (specificItem) {
                console.log(`Found promo product: ${specificItem.name}`); // Debug log

                const similarItems = data.filter(item =>
                    item.id !== id && Math.abs(item.id - id) <= 2
                ).slice(0, 6);

                singleProduct(specificItem, similarItems);
            } else {
                console.error(`Product with ID ${id} not found in any data source`);
                showProductNotFound();
            }
        })
        .catch(error => {
            console.error("Error loading from promo-ac.json:", error);
            showProductNotFound();
        });
}

// Show error message when product is not found
function showProductNotFound() {
    const attachProduct = document.getElementById("attach-product");
    if (attachProduct) {
        attachProduct.innerHTML = `
            <div class="container text-center py-5">
                <h2>Продуктът не е намерен</h2>
                <p>Съжаляваме, но продуктът който търсите не съществува.</p>
                <a href="products.html" class="btn btn-primary">Обратно към продуктите</a>
            </div>
        `;
    }
}

// --- INITIALIZATION --- //
window.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Single product page loaded");
    console.log("Current URL:", window.location.href);
    console.log("URL search params:", window.location.search);
    loadProductFromURL();
});

// Handle browser back button - redirect to stored URL
window.addEventListener("popstate", (event) => {
    const backUrl = localStorage.getItem('backToProductsUrl');
    if (backUrl) {
        console.log('🔙 Back button pressed, redirecting to:', backUrl);
        localStorage.removeItem('backToProductsUrl'); // Clean up
        window.location.href = backUrl;
    } else {
        console.log('🏠 No back URL found, going to index');
        window.location.href = 'index.html';
    }
});







