let mixitup = require('mixitup');

module.exports = function() {
    var containerEl = $('.portfolio-list');
    var mixer = mixitup(containerEl, {
        animation: {
            duration: 500,
            effectsIn: 'fade translateY(-100%)',
            effectsOut: "fade translateY(-100%)"
        },

        selectors: {
            target: '.js-mix'
        }
    });
};