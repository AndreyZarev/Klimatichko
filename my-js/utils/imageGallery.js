/**
 * Image Gallery with Fullscreen Support
 *
 * Features:
 * - Click small images to swap with big image
 * - Click big image to open fullscreen view
 * - Navigate through images in fullscreen with arrows or keyboard
 * - Click fullscreen image to zoom in/out
 * - ESC key to close fullscreen
 */
export function setupImageGallery(containerId, images, productLabel = '') {
    let validImages = images.filter(img => img && img.trim() !== "");
    if (validImages.length === 0) return;

    let container = document.getElementById(containerId);
    if (!container) return;

    // Generic 404 placeholder for all products without proper images
    let fallbackImage = 'img/404-product-image.svg';

    container.innerHTML = `
        <div class="gallery-container">
            <div class="gallery">
                <img id="bigImage" class="big-image"
                     src="${validImages[0]}"
                     alt="Main Image"
                     onerror="this.src='${fallbackImage}'; this.onerror=null;">
                <div class="small-images-container">
                    ${validImages.slice(1).map((src, index) =>
        `<img class="small-images"
              src="${src}"
              alt="Image ${index + 1}"
              onerror="this.src='${fallbackImage}'; this.onerror=null;">`
    ).join('')}
                </div>
            </div>
        </div>

        <div class="fullscreen-overlay" id="fullscreenOverlay">
            <button class="close-btn" id="closeBtn">&times;</button>
            <button class="arrow arrow-left" id="arrowLeft">❮</button>
            <img id="fullscreenImage" class="fullscreen-image"
                 alt="Fullscreen Image"
                 onerror="this.src='${fallbackImage}'; this.onerror=null;">
            <button class="arrow arrow-right" id="arrowRight">❯</button>
        </div>
    `;

    const bigImage = document.getElementById("bigImage");
    const smallImages = document.querySelectorAll(".small-images");
    const fullscreenOverlay = document.getElementById("fullscreenOverlay");
    const fullscreenImage = document.getElementById("fullscreenImage");
    const closeBtn = document.getElementById("closeBtn");
    const arrowLeft = document.getElementById("arrowLeft");
    const arrowRight = document.getElementById("arrowRight");

    // ULTRA SIMPLE APPROACH: Just use the big image directly, no complex tracking
    let currentIndex = 0;

    // Swap big and small images
    smallImages.forEach((img) => {
        img.addEventListener("click", () => {
            const temp = bigImage.src;
            bigImage.src = img.src;
            img.src = temp;
        });
    });

    // Show fullscreen overlay - ALWAYS show exactly what the big image shows
    bigImage.addEventListener("click", () => {
        // FOOLPROOF: Always show exactly what the big image shows
        fullscreenImage.src = bigImage.src;
        fullscreenOverlay.style.display = "flex";

        // For navigation, find the current big image in validImages
        currentIndex = validImages.findIndex(imgSrc => {
            // Try exact match first
            if (imgSrc === bigImage.src) return true;

            // Try comparing just the filename
            const bigImageName = bigImage.src.split('/').pop();
            const validImageName = imgSrc.split('/').pop();
            return bigImageName === validImageName;
        });

        if (currentIndex === -1) currentIndex = 0;

        console.log('Fullscreen opened with big image:', bigImage.src);
        console.log('Found at index:', currentIndex, 'in validImages:', validImages);
    });

    function openFullscreenImage(index) {
        if (index >= 0 && index < validImages.length) {
            currentIndex = index;
            fullscreenImage.src = validImages[index];
            fullscreenOverlay.style.display = "flex";
            console.log('Navigation: showing image', index, ':', validImages[index]);
        }
    }
    // Close fullscreen overlay
    closeBtn.addEventListener("click", () => {
        fullscreenOverlay.style.display = "none";
    });

    fullscreenOverlay.addEventListener("click", (e) => {
        if (e.target === fullscreenOverlay) {
            fullscreenOverlay.style.display = "none";
        }
    });

    // Navigate fullscreen images
    arrowLeft.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + validImages.length) % validImages.length;
        openFullscreenImage(newIndex);
    });

    arrowRight.addEventListener("click", (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % validImages.length;
        openFullscreenImage(newIndex);
    });

    // Zoom toggle
    fullscreenImage.addEventListener("click", () => {

        fullscreenImage.classList.toggle("zoomed");
    });

    // ESC key closes overlay
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            fullscreenOverlay.style.display = "none";
        } else if (e.key === "ArrowLeft") {
            arrowLeft.click();
        } else if (e.key === "ArrowRight") {
            arrowRight.click();
        }
    });
}
