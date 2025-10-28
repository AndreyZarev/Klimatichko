# Klimatichko - Air Conditioner E-commerce Website

A modern e-commerce website for air conditioners and HVAC systems, built with vanilla JavaScript and Bootstrap.

## 🌟 Features

- **Product Catalog**: Browse through 150+ air conditioner models
- **Advanced Filtering**: Search by brand, type, price range, and specifications  
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Payment Integration**: TBI Bank payment gateway integration
- **Dual Currency**: BGN/EUR price display with automatic conversion
- **Product Gallery**: High-quality product images with zoom functionality
- **Multi-brand Support**: Daikin, KAISAI, Mitsubishi, Fujitsu, Toshiba, and more

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Libraries**: jQuery, Owl Carousel, WOW.js animations
- **Payment**: TBI Bank API integration
- **Data**: JSON-based product database

## 📁 Project Structure

```
Klimatichko/
├── index.html              # Homepage with promotional products
├── products.html            # Main product catalog with pagination
├── single-product-page.html # Individual product details
├── contacts.html            # Contact information
├── montaje.html            # Installation services
├── css/                    # Stylesheets
├── js/                     # Core JavaScript files
├── my-js/                  # Custom application logic
├── data-json/              # Product data and images
├── img/                    # Static images and assets
└── lib/                    # Third-party libraries
```

## 🛠️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/klimatichko.git
   cd klimatichko
   ```

2. **Serve the files**:
   - Use any local web server (Live Server, Python's http.server, etc.)
   - Or simply open `index.html` in a modern web browser

3. **For development**:
   - The project uses vanilla JavaScript - no build process required
   - All dependencies are included in the `lib/` directory

## 🎯 Features Overview

### 🏠 Homepage
- Promotional air conditioner displays
- Featured products with discount pricing
- Dual currency display (BGN/EUR at 1.96 rate)
- Responsive carousel and animations

### 📦 Product Catalog  
- Complete product listing with pagination
- Advanced search and filtering
- Brand-specific filtering (Daikin, KAISAI, Mitsubishi, etc.)
- Type-based categorization (Wall-mounted, Floor, Column, etc.)

### 🔍 Product Details
- Comprehensive product specifications
- High-resolution image galleries
- TBI Bank installment calculator
- Related product suggestions
- Dual currency pricing

### 💳 Payment Integration
- TBI Bank payment gateway
- Secure checkout process
- Payment success/cancel handling

## 🏢 Supported Brands

The website features 150+ air conditioner models from leading brands:
- **Daikin** - Premium Japanese air conditioners
- **KAISAI** - Energy-efficient models with various series (ICE, Care, ProHeat)
- **Mitsubishi Electric** - Advanced inverter technology (HR, AY, EF, NINJA series)
- **Fujitsu General** - Reliable cooling solutions
- **Toshiba** - Smart air conditioning systems
- **Williams** - Affordable cooling options

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔧 Development

### Key Files:
- `my-js/products-html.js` - Main product catalog functionality
- `my-js/single-page-product.js` - Individual product page logic
- `my-js/dynamic-products.js` - Homepage promotional products
- `data-json/all-products.json` - Complete product database

### Adding New Products:
1. Add product data to `data-json/all-products.json`
2. Add product images to appropriate brand folder in `data-json/img/brands/`
3. Ensure unique product IDs to avoid conflicts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Klimatichko** - Your trusted partner for air conditioning solutions in Bulgaria 🇧🇬
