// window.$ = require('jquery');
// require('slick-carousel');

let aboutpageAnimation = require('./components/aboutpageAnimation.js'); //example
let careersPageAnimation = require('./components/careersPageAnimation.js'); //example
let initHomepage = require('./components/homepage/init.js');
let doWhenCondition = require('./components/doWhenCondition.js');
let Switcher = require('./components/switcher.js');
let addMouseEnterHandler = require('./components/addMouseEnterHandler');
let tableSorting = require('./components/tableSorting');
let sorterMenu = require('./components/sorter-menu');
let mixitUp = require('./components/mixitUp');
let projectPageAnimation = require('./components/progressPageAnimations');
let logoAnimation = require('./components/homepage/logoAnimation.js');
let scrollBar = require('./components/scroll');
let personSlider = require('./components/person-slider');
let headerScripts = require('./components/header');
let projectSingleScripts = require('./components/projectSingle');
require('./components/sp-scroller');
require('./components/sp-slider');
require('./components/sp-video');
require('./components/sp-animation');
let scrollToTop = require('./components/scrollToTop');
require('./components/cultureSingleAnimations');
let cultureIndexVideoPlaying = require('./components/hoverVideoControl');
require('./components/scroll-to');

$(document).ready(function () {
    doWhenCondition('.homepage', initHomepage);
    doWhenCondition('#js-nav-button', headerScripts);
    doWhenCondition('.heading-block', projectSingleScripts);

    doWhenCondition('.careers-page', careersPageAnimation);
    doWhenCondition('.our-works', sorterMenu);
    doWhenCondition('.portfolio-list', mixitUp);
    doWhenCondition('#switch', () => {
        new Switcher();
    });

    personSlider();
    doWhenCondition('.award-wrapper', () => {
        addMouseEnterHandler($('.award-wrapper'), {
            top: 'award-wrapper--top',
            right: 'award-wrapper--right',
            bottom: 'award-wrapper--bottom',
            left: 'award-wrapper--left'
        });
    });

    addMouseEnterHandler($('.portfolio-list__item'));
    scrollBar($('.js-scroll-bar'));

    doWhenCondition('#js-award-table', () => {
        tableSorting($('#js-award-table'), '.year');
    });

    doWhenCondition('#js-award-table', projectPageAnimation);
    //doWhenCondition(selector, func) Performs the code when there is an element of the specified selector
    setTimeout(doWhenCondition('#logo', logoAnimation.initLogoAnimation.bind(null, 'logo', '#logo-canvas', '#logo-canvas-hidden', '#canvas-container')), 500)

    scrollToTop('#js-scroll-up-button');

    cultureIndexVideoPlaying('.js-half-screen');
});
