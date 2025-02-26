$(function () {
    let historyStack = [];
    let index = -1;

    // Click event on navigation links
    $('.links').on('click', function () {
        let address = $(this).attr('data-ref');

        if (index < historyStack.length - 1) {
            historyStack = historyStack.slice(0, index + 1); // Trim forward history
        }

        historyStack.push(address);
        index++;
        window.history.pushState({ index: index }, '', `#${address}`);

        loadExternalPage(address);
    });

    // Back button event
    $('#back').on('click', function () {
        if (index > 0) {
            index--;
            let address = historyStack[index];
            window.history.pushState({ index: index }, '', `#${address}`);
            loadExternalPage(address);
        }
    });

    // Forward button event
    $('#forward').on('click', function () {
        if (index < historyStack.length - 1) {
            index++;
            let address = historyStack[index];
            window.history.pushState({ index: index }, '', `#${address}`);
            loadExternalPage(address);
        }
    });

    // Function to load external page content
    function loadExternalPage(address) {
        $('#result-section').load(address, function (response, status) {
            if (status === "error") {
                console.log("Error loading the page.");
            } else {
                console.log("Page loaded successfully.");
            }
        });
    }

    // Handle browser back/forward buttons
    window.onpopstate = function (event) {
        if (event.state) {
            index = event.state.index;
            let address = historyStack[index];
            loadExternalPage(address);
        }
    };
});