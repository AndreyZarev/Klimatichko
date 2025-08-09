# Klimatichko AC Products Organization

## 🎉 What We've Accomplished

✅ **Split 107 AC products into 11 brand-specific files**
✅ **Created organized directory structure**
✅ **Built image management tools**
✅ **Prepared download infrastructure**

## 📁 File Structure

```
Klimatichko/data-json/
├── categories/
│   ├── mitsubishi-products.json      (39 products)
│   ├── kaisai-products.json          (17 products)
│   ├── daikin-products.json          (11 products)
│   ├── midea-products.json           (8 products)
│   ├── auratsu-products.json         (8 products)
│   ├── fuji-electric-products.json   (7 products)
│   ├── fujitsu-general-products.json (4 products)
│   ├── fujitsu-products.json         (4 products)
│   ├── toshiba-products.json         (4 products)
│   ├── williams-products.json        (4 products)
│   └── mitsubishi-heavy-products.json (1 product)
├── img/brands/                       (Image directories created)
│   ├── mitsubishi/
│   ├── kaisai/
│   ├── daikin/
│   ├── midea/
│   ├── toshiba/
│   ├── fujitsu/
│   ├── fuji-electric/
│   ├── auratsu/
│   └── williams/
└── Tools:
    ├── split-products.js
    ├── organize-images.js
    ├── image-downloader.js
    └── summary.js
```

## 🏢 Products by Brand

| Brand | Products | File |
|-------|----------|------|
| Mitsubishi Electric | 39 | mitsubishi-products.json |
| KAISAI | 17 | kaisai-products.json |
| Daikin | 11 | daikin-products.json |
| Midea | 8 | midea-products.json |
| Auratsu | 8 | auratsu-products.json |
| Fuji Electric | 7 | fuji-electric-products.json |
| Fujitsu General | 4 | fujitsu-general-products.json |
| Fujitsu | 4 | fujitsu-products.json |
| Toshiba | 4 | toshiba-products.json |
| Williams | 4 | williams-products.json |
| Mitsubishi Heavy | 1 | mitsubishi-heavy-products.json |

## 🖼️ Image Management

### Current Status
- **Total products**: 107
- **Products with image references**: 107 (100%)
- **Missing image files**: 52
- **Image directories created**: ✅

### To Download Images

#### Option 1: Manual Download
1. Visit manufacturer websites:
   - **Mitsubishi**: https://www.mitsubishielectric.com
   - **Daikin**: https://www.daikin.com
   - **KAISAI**: https://www.kaisai.com
   - **Midea**: https://www.midea.com
   - **Toshiba**: https://www.toshiba-aircon.com

2. Search for each product model and download images
3. Save to appropriate `img/brands/[brand]/` directory
4. Update JSON files with new image paths

#### Option 2: Use Image Scraping Tools
```bash
# Install a web scraping tool like wget or curl
# Example for downloading Mitsubishi images:
wget -P ../img/brands/mitsubishi/ "https://example.com/product-image.jpg"
```

#### Option 3: Use the Provided Scripts
```bash
# Run the image downloader (modify URLs first)
node image-downloader.js

# Check image status
node organize-images.js

# View summary
node summary.js
```

## 🔧 How to Use the Brand Files

### Loading Products by Brand
```javascript
// Load specific brand products
const mitsubishiProducts = require('./categories/mitsubishi-products.json');
const kaisaiProducts = require('./categories/kaisai-products.json');
const daikinProducts = require('./categories/daikin-products.json');

// Or load all brands dynamically
const fs = require('fs');
const brands = {};
const brandFiles = fs.readdirSync('./categories');

brandFiles.forEach(file => {
    const brandName = file.replace('-products.json', '');
    brands[brandName] = require(`./categories/${file}`);
});
```

### Example Product Structure
```json
{
    "id": 22,
    "img": "img/brands/mitsubishi/msz-hr25vf.jpg",
    "type": "Високостенни климатици",
    "name": "Инверторен стенен климатик Mitsubishi Electric MSZ-HR25VF",
    "price": 1499,
    "size": "9000",
    "label": "Mitsubishi Electric",
    "model": "Mitsubishi Electric MSZ-HR25VF",
    "energy": "A++",
    "keyword": "Mitsubishi Electric MSZ-HR25VF 9000 BTU",
    "details1": "Икономичен",
    "details2": "WiFi управление (опция)",
    "forPlaces": "10-15",
    "coolingEnergyClass": "А++",
    "heatEnergyClass": "А+",
    "seer": "6.10",
    "scop": "4.60",
    "warranty": "24/36 месеца"
}
```

## 🚀 Next Steps

1. **Download Images**: Use one of the methods above to get product images
2. **Update Website**: Modify your website to load products from brand-specific files
3. **Test Display**: Verify that products display correctly with new structure
4. **SEO Optimization**: Use brand-specific pages for better search rankings

## 💡 Benefits of This Organization

- **Better Performance**: Load only products for specific brands
- **Easier Management**: Update products per brand independently
- **SEO Friendly**: Create brand-specific pages and URLs
- **Scalable**: Easy to add new brands or products
- **Organized Images**: Clear image structure by brand

## 🛠️ Tools Available

- `split-products.js` - Split products by brand
- `organize-images.js` - Analyze image usage
- `image-downloader.js` - Download missing images
- `summary.js` - Show organization summary

---

**🎉 Your AC products are now perfectly organized by brand with a complete image management system!**
