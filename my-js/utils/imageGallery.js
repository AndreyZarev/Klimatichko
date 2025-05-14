// export function setupImageGallery(containerId, images) {
//     debugger
//     let imags = [];
//     for (let i = 0; i < 5; i++) {
//         const url = images[i];
//         if (url && url.trim() !== "") {
//             imags.push(url);
//         }
//     }
//     let container = document.getElementById(containerId);
//     if (!container) return;

//     let leftBtn = `<button class="arrow arrow-left" id="prevBtn">❮</button>`
//     let rightBtn = `<button class="arrow arrow-right" id="nextBtn">❯</button>`
//     container.innerHTML = `
//         <div class="gallery-container">
//             <div class="gallery">
//                 <img id="bigImage" class="big-image" src="${images[0]}" alt="Main Image">
//                 <div class="small-images-container">
//                     ${images.slice(1)
//             .filter(src => src.trim() !== "")
//             .map((src, index) =>
//                 `<img class="small-images" src="${src}" alt="Image ${index + 1}">`
//             ).join('')}
//                 </div>


//             </div>
//         </div>

//         <div class="fullscreen-overlay" id="fullscreenOverlay">
//             <button class="close-btn" id="closeBtn">&times;</button>
//           ${images[1] ? leftBtn : ""}
//             <img id="fullscreenImage">
//           ${images[1] ? rightBtn : ""}

//         </div>
//     `;

//     let bigImage = document.getElementById("bigImage");
//     let smallImages = document.querySelectorAll(".small-images");
//     let fullscreenOverlay = document.getElementById("fullscreenOverlay");
//     let fullscreenImage = document.getElementById("fullscreenImage");
//     let closeBtn = document.getElementById("closeBtn");
//     let prevBtn = document.getElementById("prevBtn");
//     let nextBtn = document.getElementById("nextBtn");

//     let imageArray = imags.slice();
//     let currentIndex = 0;
//     const lens = document.createElement("div");
//     lens.classList.add("zoom-lens");
//     document.body.appendChild(lens);

//     fullscreenImage.addEventListener("mousemove", moveLens);
//     fullscreenImage.addEventListener("mouseenter", () => {
//         lens.style.visibility = "visible";
//     });
//     fullscreenImage.addEventListener("mouseleave", () => {
//         lens.style.visibility = "hidden";
//     });

//     function moveLens(e) {
//         const rect = fullscreenImage.getBoundingClientRect();

//         // Cursor position relative to image
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         // Prevent lens from going outside image bounds
//         const lensHalfWidth = lens.offsetWidth / 2;
//         const lensHalfHeight = lens.offsetHeight / 2;
//         const lensX = Math.max(rect.left, Math.min(e.pageX - lensHalfWidth, rect.right - lens.offsetWidth));
//         const lensY = Math.max(rect.top, Math.min(e.pageY - lensHalfHeight, rect.bottom - lens.offsetHeight));

//         lens.style.left = `${lensX}px`;
//         lens.style.top = `${lensY}px`;

//         // Set background image & zoom
//         lens.style.backgroundImage = `url('${fullscreenImage.src}')`;
//         lens.style.backgroundSize = `${fullscreenImage.width * 2}px ${fullscreenImage.height * 2}px`;
//         lens.style.backgroundPosition = `-${x * 2 - lensHalfWidth}px -${y * 2 - lensHalfHeight}px`;
//     }
//     // 🔹 Swap small image with big image
//     smallImages.forEach((img, index) => {
//         img.addEventListener("click", () => {
//             debugger
//             let tempSrc = bigImage.src;
//             bigImage.src = img.src;
//             img.src = tempSrc;
//         });
//     });

//     // 🔹 Open fullscreen when clicking the big image
//     bigImage.addEventListener("click", function () {
//         fullscreenImage.src = bigImage.src;
//         fullscreenOverlay.style.display = "flex";
//         debugger

//         // currentIndex = imageArray.findIndex(img => img === bigImage.src);
//     });

//     // 🔹 Close fullscreen
//     closeBtn.addEventListener("click", () => fullscreenOverlay.style.display = "none");
//     fullscreenOverlay.addEventListener("click", (event) => {
//         if (event.target === fullscreenOverlay) fullscreenOverlay.style.display = "none";
//     });

//     // 🔹 Navigate images in fullscreen mode



//     // if (images[1] !== "") {
//     function navigate(direction) {
//         debugger

//         // Attempt to find a non-empty image, limiting the loop to avoid infinite cycles.
//         let attempts = 0;
//         do {
//             let index = (currentIndex + direction + imageArray.length) % imageArray.length;
//             currentIndex = index
//             attempts++;
//             // If imageArray[currentIndex] is an empty string (or only whitespace), continue looping.
//         } while ((!imageArray[currentIndex] || imageArray[currentIndex].trim() === "") && attempts < imageArray.length);

//         // If a valid image is found, update the fullscreen image source.
//         if (imageArray[currentIndex] && imageArray[currentIndex].trim() !== "") {
//             if (fullscreenImage.src != imageArray[currentIndex]) {
//                 fullscreenImage.src = imageArray[currentIndex];
//             } else {
//                 fullscreenImage.src = imageArray[currentIndex + direction];
//             }
//         }
//     }

//     prevBtn.addEventListener("click", () => navigate(-1));
//     nextBtn.addEventListener("click", () => navigate(1));


// }
export function setupImageGallery(containerId, images) {
    let validImages = images.filter(img => img && img.trim() !== "");
    if (validImages.length === 0) return;

    let container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="gallery-container">
            <div class="gallery">
                <img id="bigImage" class="big-image" src="${validImages[0]}" alt="Main Image">
                <div class="small-images-container">
                    ${validImages.slice(1).map((src, index) =>
        `<img class="small-images" src="${src}" alt="Image ${index + 1}">`
    ).join('')}
                </div>
            </div>
        </div>

        <div class="fullscreen-overlay" id="fullscreenOverlay">
            <button class="close-btn" id="closeBtn">&times;</button>
            <button class="arrow arrow-left" id="arrowLeft">❮</button>
            <img id="fullscreenImage" class="fullscreen-image" alt="Fullscreen Image">
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

    let currentIndex = 0;

    // Swap big and small images
    smallImages.forEach(img => {
        img.addEventListener("click", () => {
            const temp = bigImage.src;
            bigImage.src = img.src;
            img.src = temp;
        });
    });

    // Show fullscreen overlay
    bigImage.addEventListener("click", () => {
        currentIndex = validImages.indexOf(bigImage.src);
        if (currentIndex === -1) currentIndex = 0;
        openFullscreenImage(currentIndex);
    });
    function openFullscreenImage(index) {
        let bigImage = document.getElementsByClassName("big-image")[0]

        fullscreenImage.src = bigImage.src
        fullscreenOverlay.style.display = "flex";
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
        currentIndex = (currentIndex - 1 + validImages.length) % validImages.length;

        openFullscreenImage(currentIndex);
    });

    arrowRight.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % validImages.length;
        openFullscreenImage(currentIndex);
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
