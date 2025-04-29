$(function () {
    // Click event on navigation links
    $('.links').on('click', function () {
        let address = $(this).attr('data-ref');
        window.history.pushState({ address: address }, '', `#${address}`);
        loadExternalPage(address);
    });

    // Back button event (browser-like behavior)
    $('#back').on('click', function () {
        window.history.back();
    });

    // Forward button event (browser-like behavior)
    $('#forward').on('click', function () {
        window.history.forward();
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
        debugger
        let address;
        if (event.state && event.state.address) {
            address = event.state.address;
        } else {
            // fallback: get address from URL hash
            address = window.location.hash.substring(1);
        }
        if (address) {
            loadExternalPage(address);
        }
    };

    // Handle first page load
    if (window.location.hash) {
        let initialAddress = window.location.hash.substring(1);
        loadExternalPage(initialAddress);
    }
});
