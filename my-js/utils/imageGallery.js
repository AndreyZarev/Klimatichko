export function setupImageGallery(containerId, images) {
    debugger
    let imags = [];
    for (let i = 0; i < 5; i++) {
        const url = images[i];
        if (url && url.trim() !== "") {
            imags.push(url);
        }
    }
    let container = document.getElementById(containerId);
    if (!container) return;

    let leftBtn = `<button class="arrow arrow-left" id="prevBtn">❮</button>`
    let rightBtn = `<button class="arrow arrow-right" id="nextBtn">❯</button>`
    container.innerHTML = `
        <div class="gallery-container">
            <div class="gallery">
                <img id="bigImage" class="big-image" src="${images[0]}" alt="Main Image">
                <div class="small-images-container">
                    ${images.slice(1)
            .filter(src => src.trim() !== "")
            .map((src, index) =>
                `<img class="small-images" src="${src}" alt="Image ${index + 1}">`
            ).join('')}
                </div>


            </div>
        </div>

        <div class="fullscreen-overlay" id="fullscreenOverlay">
            <button class="close-btn" id="closeBtn">&times;</button>
          ${images[1] ? leftBtn : ""}
            <img id="fullscreenImage">
          ${images[1] ? rightBtn : ""}
            
        </div>
    `;

    let bigImage = document.getElementById("bigImage");
    let smallImages = document.querySelectorAll(".small-images");
    let fullscreenOverlay = document.getElementById("fullscreenOverlay");
    let fullscreenImage = document.getElementById("fullscreenImage");
    let closeBtn = document.getElementById("closeBtn");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");

    let imageArray = imags.slice();
    let currentIndex = 0;

    // 🔹 Swap small image with big image
    smallImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            let tempSrc = bigImage.src;
            bigImage.src = img.src;
            img.src = tempSrc;
        });
    });

    // 🔹 Open fullscreen when clicking the big image
    bigImage.addEventListener("click", function () {
        fullscreenImage.src = bigImage.src;
        fullscreenOverlay.style.display = "flex";
        debugger

        // currentIndex = imageArray.findIndex(img => img === bigImage.src);
    });

    // 🔹 Close fullscreen
    closeBtn.addEventListener("click", () => fullscreenOverlay.style.display = "none");
    fullscreenOverlay.addEventListener("click", (event) => {
        if (event.target === fullscreenOverlay) fullscreenOverlay.style.display = "none";
    });

    // 🔹 Navigate images in fullscreen mode



    // if (images[1] !== "") {
    function navigate(direction) {
        debugger

        // Attempt to find a non-empty image, limiting the loop to avoid infinite cycles.
        let attempts = 0;
        do {
            let index = (currentIndex + direction + imageArray.length) % imageArray.length;
            currentIndex = index
            attempts++;
            // If imageArray[currentIndex] is an empty string (or only whitespace), continue looping.
        } while ((!imageArray[currentIndex] || imageArray[currentIndex].trim() === "") && attempts < imageArray.length);

        // If a valid image is found, update the fullscreen image source.
        if (imageArray[currentIndex] && imageArray[currentIndex].trim() !== "") {
            if (fullscreenImage.src != imageArray[currentIndex]) {
                fullscreenImage.src = imageArray[currentIndex];
            } else {
                fullscreenImage.src = imageArray[currentIndex + 1];
            }
        }
    }

    prevBtn.addEventListener("click", () => navigate(-1));
    nextBtn.addEventListener("click", () => navigate(1));
    // }

}
