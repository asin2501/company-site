/**
 * Created by User on 18.07.2017.
 */
let elementAnimationOnScroll = require('./elementAnimationOnScroll.js');

$(initSPAnimation);

function initSPAnimation() {
    if ($(document.body).hasClass('project-single')) {

        elementAnimationOnScroll('animate', $('.js-sp-video'));

        $('.sp-images').find('img').each(function () {
            elementAnimationOnScroll('animate', $(this));
        });

        $('.sp-section').each(function () {
            elementAnimationOnScroll('animate', $(this));
        });

        elementAnimationOnScroll('animate', $('.js-sp-slider-container'));

    }
}
