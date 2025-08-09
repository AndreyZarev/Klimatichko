/**
 * TBI Bank Configuration for Klimatichko
 * 
 * IMPORTANT: Replace the placeholder values with your actual TBI Bank credentials
 * Contact TBI Bank to obtain your merchant credentials and API keys
 */

const TBI_BANK_CONFIG = {
    // Merchant Configuration
    merchantId: '5G02', // Your actual merchant ID from TBI Bank
    apiKey: 'I2MTS3D#fWvUcikdm@hdoGPmMQXB#hT@KYv3LP0glaRHLHWixth9zPxK91P8vkb7tPLNOAon@SGnMdY6G8Pmk8oMlifPwb7DmZsy', // Your actual API key from TBI Bank

    // Environment Settings
    environment: 'sandbox', // IMPORTANT: Change to 'production' when ready to go live with real payments

    // API Endpoints
    endpoints: {
        sandbox: {
            api: 'https://sandbox-api.tbibank.bg/v1',
            widget: 'https://sandbox-widget.tbibank.bg/widget.js',
            apply: 'https://sandbox-apply.tbibank.bg/installment'
        },
        production: {
            api: 'https://api.tbibank.bg/v1',
            widget: 'https://widget.tbibank.bg/widget.js',
            apply: 'https://apply.tbibank.bg/installment'
        }
    },

    // Business Settings
    currency: 'BGN',
    language: 'bg',

    // Installment Options
    installmentOptions: {
        minAmount: 100, // Minimum amount for installments in BGN
        maxAmount: 15000, // Maximum amount for installments in BGN
        availableMonths: [3, 6, 12, 18, 24], // Available installment periods
        zeroInterestMonths: [3, 6, 12], // Months with 0% interest
        standardInterestRate: 0.05 // 5% annual interest for longer periods
    },

    // UI Settings
    ui: {
        showOnProductCards: true, // Show installment info on product cards
        showOnSingleProduct: true, // Show calculator on single product page
        showOnCheckout: true, // Show option during checkout
        badgeStyle: 'gradient', // 'gradient', 'solid', or 'outline'
        calculatorPosition: 'after-price' // 'after-price', 'before-actions', or 'custom'
    },

    // Return URLs
    returnUrls: {
        success: window.location.origin + '/payment-success.html',
        cancel: window.location.origin + '/payment-cancel.html',
        error: window.location.origin + '/payment-error.html'
    },

    // Analytics and Tracking
    analytics: {
        enabled: true,
        trackApplications: true,
        trackApprovals: true,
        googleAnalytics: true,
        facebookPixel: false
    },

    // Customization
    customization: {
        brandColors: {
            primary: '#1e3c72',
            secondary: '#2a5298',
            success: '#28a745',
            warning: '#ffc107'
        },
        texts: {
            installmentBadge: 'от {amount} лв/месец',
            installmentSubtext: 'с TBI Bank',
            calculatorTitle: 'Разсрочено плащане с TBI Bank',
            applyButton: 'Кандидатствай за разсрочване',
            moreInfoButton: 'Повече информация',
            monthsLabel: 'Брой месеци:',
            monthlyPaymentLabel: 'Месечна вноска:',
            totalAmountLabel: 'Обща сума:',
            interestRateLabel: 'Лихва:',
            noFeesText: 'Без такси'
        }
    },

    // Debug and Development
    debug: {
        enabled: true, // Set to false in production
        logLevel: 'info', // 'error', 'warn', 'info', 'debug'
        showTestData: true // Show test data in sandbox mode
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TBI_BANK_CONFIG;
} else {
    window.TBI_BANK_CONFIG = TBI_BANK_CONFIG;
}

/**
 * Setup Instructions:
 * 
 * 1. Contact TBI Bank Business Development:
 *    - Email: business@tbibank.bg
 *    - Phone: +359 2 8166 000
 *    - Request merchant account for installment payments
 * 
 * 2. Obtain Credentials:
 *    - Merchant ID
 *    - API Key
 *    - Sandbox credentials for testing
 * 
 * 3. Update Configuration:
 *    - Replace 'YOUR_MERCHANT_ID' with actual merchant ID
 *    - Replace 'YOUR_API_KEY' with actual API key
 *    - Test in sandbox environment first
 * 
 * 4. Integration Testing:
 *    - Test with small amounts (100-500 BGN)
 *    - Verify all callback URLs work
 *    - Test success/cancel/error flows
 * 
 * 5. Go Live:
 *    - Change environment to 'production'
 *    - Update return URLs to production domain
 *    - Set debug.enabled to false
 * 
 * 6. Legal Requirements:
 *    - Add TBI Bank terms and conditions link
 *    - Include privacy policy updates
 *    - Add required disclaimers
 * 
 * For technical support contact:
 * - TBI Bank IT Support: it-support@tbibank.bg
 * - Integration documentation: https://developers.tbibank.bg
 */
