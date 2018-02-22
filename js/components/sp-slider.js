/**
 * Created by User on 17.07.2017.
 */

$(initSpSlider);

function initSpSlider() {
    let $slidersList = $('.js-sp-slider-container');

    $slidersList.each(function () {
        let $slider = $(this).find('.js-sp-slider');
        let $currentNum = $(this).find('.js-current-num');
        let $maxNum = $(this).find('.js-total-num');
        let $prev = $(this).find('.js-prev');
        let $next = $(this).find('.js-next');

        $maxNum.html($slider.find('.sp-slider__slide').length);

        $slider.slick({
            arrows: false,
        });

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $currentNum.html(nextSlide+1);
        });

        $prev.click(() => {
            $slider.slick('slickPrev');
        });

        $next.click(() => {
            $slider.slick('slickNext');
        });
    });
}