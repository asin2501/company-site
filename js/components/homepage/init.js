//let $ = require('jquery');
let backgroundVerticalParalax = require('../backgroundVerticalParalax.js');
require('particles.js');
let logoAnimation = require('./logoAnimation.js');

module.exports = function() {

    let selectors = {
        mainScreen: '#main-screen',
        secondScreen: '#second-screen'
    };

    let elements = {
        mainScreen: $(selectors.mainScreen),
        secondScreen: $(selectors.secondScreen)
    };


    backgroundVerticalParalax($('.home__halfscreen'), 1200);
    particlesJS.load('particles-js', '/particles.json');

    elements.mainScreen.click(() => {
        $(document.body).addClass('scrolled');
        elements.secondScreen.addClass('animation-up');
        logoAnimation.stopDispersion();

        setTimeout(function() {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }, 1000)
    });

};