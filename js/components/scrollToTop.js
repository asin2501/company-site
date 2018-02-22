module.exports = function (scrollUpButton) {
    if (typeof scrollUpButton === 'undefined') {
        return;
    }

    if (!(scrollUpButton instanceof $)) {
        scrollUpButton = $(scrollUpButton);
    }

    scrollUpButton.click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
};
