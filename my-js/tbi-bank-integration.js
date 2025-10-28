/**
 * TBI Bank Integration for Klimatichko
 * Provides installment payment options for air conditioning products
 */

class TBIBankIntegration {
    constructor(config = {}) {
        // Load configuration from global config or use defaults
        const globalConfig = window.TBI_BANK_CONFIG || {};

        this.merchantId = config.merchantId || globalConfig.merchantId || 'YOUR_MERCHANT_ID';
        this.apiKey = config.apiKey || globalConfig.apiKey || 'YOUR_API_KEY';
        this.environment = config.environment || globalConfig.environment || 'sandbox';
        this.currency = globalConfig.currency || 'BGN';
        this.language = globalConfig.language || 'bg';

        // Set API URLs based on environment
        const endpoints = globalConfig.endpoints || {};
        const envEndpoints = endpoints[this.environment] || endpoints.sandbox || {};

        this.apiUrl = envEndpoints.api || 'https://sandbox-api.tbibank.bg/v1';
        this.widgetUrl = envEndpoints.widget || 'https://sandbox-widget.tbibank.bg/widget.js';
        this.applyUrl = envEndpoints.apply || 'https://sandbox-apply.tbibank.bg/installment';

        // Load other configuration options
        this.config = { ...globalConfig, ...config };
        this.installmentOptions = this.config.installmentOptions || {};
        this.ui = this.config.ui || {};
        this.debug = this.config.debug || { enabled: false };

        if (this.debug.enabled) {
            console.log('TBI Bank Integration initialized with config:', this.config);
        }
    }

    /**
     * Initialize TBI Bank widget on product pages
     */
    init() {
        this.loadTBIScript();
        this.setupProductPageIntegration();
        this.setupCheckoutIntegration();
    }

    /**
     * Load TBI Bank JavaScript SDK
     */
    loadTBIScript() {
        if (document.getElementById('tbi-bank-sdk')) return;

        const script = document.createElement('script');
        script.id = 'tbi-bank-sdk';
        script.src = this.environment === 'production'
            ? 'https://widget.tbibank.bg/widget.js'
            : 'https://sandbox-widget.tbibank.bg/widget.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            console.log('TBI Bank SDK loaded successfully');
            this.initializeWidgets();
        };
    }

    /**
     * Setup integration on product pages
     */
    setupProductPageIntegration() {
        // Add installment info to product cards
        this.addInstallmentInfoToProducts();

        // Add installment calculator to single product page
        if (window.location.pathname.includes('single-product-page.html')) {
            this.addInstallmentCalculator();
        }
    }

    /**
     * Add installment information to product cards
     */
    addInstallmentInfoToProducts() {
        const productCards = document.querySelectorAll('.property-item');

        productCards.forEach(card => {
            const priceElement = card.querySelector('.normal-price, .second-price');
            if (priceElement) {
                const price = this.extractPrice(priceElement.textContent);
                if (price >= 100) { // Minimum amount for installments
                    this.addInstallmentBadge(card, price);
                }
            }
        });
    }

    /**
     * Add installment badge to product card
     */
    addInstallmentBadge(card, price) {
        const installmentAmount = this.calculateInstallment(price, 12);

        const badge = document.createElement('div');
        badge.className = 'tbi-installment-badge';
        badge.innerHTML = `
            <div class="installment-info">
                <i class="fas fa-credit-card"></i>
                <span>от ${installmentAmount.toFixed(2)} лв/месец</span>
                <small>с TBI Bank</small>
            </div>
        `;

        const priceDiv = card.querySelector('.div-price');
        if (priceDiv) {
            priceDiv.appendChild(badge);
        }
    }

    /**
     * Add installment calculator to single product page
     */
    addInstallmentCalculator() {
        const productContainer = document.querySelector('.single-product-details');
        if (!productContainer) return;

        const priceElement = document.querySelector('.product-price');
        if (!priceElement) return;

        const price = this.extractPrice(priceElement.textContent);
        if (price < 100) return;

        const calculatorHTML = this.createInstallmentCalculator(price);

        const calculatorDiv = document.createElement('div');
        calculatorDiv.innerHTML = calculatorHTML;

        // Insert after price
        priceElement.parentNode.insertBefore(calculatorDiv, priceElement.nextSibling);

        this.bindCalculatorEvents();
    }

    /**
     * Create installment calculator HTML
     */
    createInstallmentCalculator(price) {
        return `
            <div class="tbi-installment-calculator">
                <h5><i class="fas fa-calculator"></i> Разсрочено плащане с TBI Bank</h5>
                
                <div class="installment-options">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="installment-months">Брой месеци:</label>
                            <select id="installment-months" class="form-control">
                                <option value="3">3 месеца</option>
                                <option value="6">6 месеца</option>
                                <option value="12" selected>12 месеца</option>
                                <option value="18">18 месеца</option>
                                <option value="24">24 месеца</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Месечна вноска:</label>
                            <div class="monthly-payment">
                                <span id="monthly-amount">${this.calculateInstallment(price, 12).toFixed(2)}</span> лв
                            </div>
                        </div>
                    </div>
                </div>

                <div class="installment-details">
                    <div class="row">
                        <div class="col-md-4">
                            <small>Обща сума: <span id="total-amount">${price.toFixed(2)}</span> лв</small>
                        </div>
                        <div class="col-md-4">
                            <small>Лихва: <span id="interest-rate">0%</span></small>
                        </div>
                        <div class="col-md-4">
                            <small>Без такси</small>
                        </div>
                    </div>
                </div>

                <div class="tbi-actions">
                    <button class="btn btn-primary tbi-apply-btn" onclick="tbiBank.applyForInstallment(${price})">
                        <i class="fas fa-credit-card"></i> Кандидатствай за разсрочване
                    </button>
                    <button class="btn btn-outline-secondary tbi-info-btn" onclick="tbiBank.showMoreInfo()">
                        Повече информация
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Bind calculator events
     */
    bindCalculatorEvents() {
        const monthsSelect = document.getElementById('installment-months');
        const monthlyAmount = document.getElementById('monthly-amount');
        const totalAmount = document.getElementById('total-amount');

        if (monthsSelect && monthlyAmount) {
            monthsSelect.addEventListener('change', (e) => {
                const months = parseInt(e.target.value);
                const price = this.extractPrice(totalAmount.textContent);
                const installment = this.calculateInstallment(price, months);
                monthlyAmount.textContent = installment.toFixed(2);
            });
        }
    }

    /**
     * Calculate monthly installment amount
     */
    calculateInstallment(price, months) {
        // TBI Bank typically offers 0% interest for certain periods
        const interestRate = months <= 12 ? 0 : 0.05; // 5% for longer periods

        if (interestRate === 0) {
            return price / months;
        }

        const monthlyRate = interestRate / 12;
        return price * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }

    /**
     * Extract price from text
     */
    extractPrice(text) {
        const match = text.match(/(\d+(?:\.\d{2})?)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Apply for installment
     */
    async applyForInstallment(amount) {
        try {
            const months = document.getElementById('installment-months')?.value || 12;

            // Create application data
            const applicationData = {
                amount: amount,
                currency: this.currency,
                installments: parseInt(months),
                merchantId: this.merchantId,
                language: this.language,
                returnUrl: window.location.origin + '/payment-success.html',
                cancelUrl: window.location.origin + '/payment-cancel.html',
                productInfo: this.getProductInfo()
            };

            // Redirect to TBI Bank application form
            this.redirectToTBIApplication(applicationData);

        } catch (error) {
            console.error('Error applying for installment:', error);
            this.showError('Възникна грешка при кандидатстването. Моля, опитайте отново.');
        }
    }

    /**
     * Get current product information
     */
    getProductInfo() {
        const productName = document.querySelector('.product-name, h1')?.textContent || 'Климатик';
        const productId = new URLSearchParams(window.location.search).get('id') || '1';

        return {
            name: productName,
            id: productId,
            category: 'Климатици'
        };
    }

    /**
     * Redirect to TBI Bank application
     */
    redirectToTBIApplication(data) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = this.environment === 'production'
            ? 'https://apply.tbibank.bg/installment'
            : 'https://sandbox-apply.tbibank.bg/installment';

        // Add form fields
        Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }

    /**
     * Show more information modal
     */
    showMoreInfo() {
        const modal = this.createInfoModal();
        document.body.appendChild(modal);

        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        // Remove modal when hidden
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }

    /**
     * Create information modal
     */
    createInfoModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <img src="https://tbibank.bg/assets/images/logo.png" alt="TBI Bank" style="height: 30px; margin-right: 10px;">
                            Разсрочено плащане с TBI Bank
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6><i class="fas fa-check-circle text-success"></i> Предимства:</h6>
                                <ul>
                                    <li>Без лихви за периоди до 12 месеца</li>
                                    <li>Без скрити такси</li>
                                    <li>Бърза онлайн кандидатура</li>
                                    <li>Одобрение за минути</li>
                                    <li>Гъвкави условия за плащане</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6><i class="fas fa-info-circle text-primary"></i> Условия:</h6>
                                <ul>
                                    <li>Минимална сума: 100 лв</li>
                                    <li>Максимална сума: 15,000 лв</li>
                                    <li>Възраст: 18-70 години</li>
                                    <li>Постоянен доход</li>
                                    <li>Българско гражданство</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-lightbulb"></i>
                            <strong>Как работи:</strong> Избирате продукта, кандидатствате онлайн, получавате одобрение и поръчвате климатика с разсрочено плащане.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Затвори</button>
                        <a href="https://tbibank.bg/installments" target="_blank" class="btn btn-primary">
                            Научи повече в TBI Bank
                        </a>
                    </div>
                </div>
            </div>
        `;

        return modal;
    }

    /**
     * Show error message
     */
    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.insertBefore(alert, document.body.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    /**
     * Initialize widgets after SDK loads
     */
    initializeWidgets() {
        // Initialize TBI Bank widgets if SDK is available
        if (window.TBIBank) {
            window.TBIBank.init({
                merchantId: this.merchantId,
                environment: this.environment
            });
        }
    }

    /**
     * Setup checkout integration (placeholder for future implementation)
     */
    setupCheckoutIntegration() {
        // This method will be implemented when checkout functionality is added
        if (this.debug.enabled) {
            console.log('Checkout integration setup - placeholder method');
        }
    }
}

// Initialize TBI Bank integration
const tbiBank = new TBIBankIntegration({
    merchantId: 'KLIMATICHKO_MERCHANT_ID', // Replace with actual merchant ID
    environment: 'sandbox' // Change to 'production' when ready
});

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    tbiBank.init();
});

// Export for global access
window.tbiBank = tbiBank;
