/**
 * Created by 2501 on 03.07.2017.
 */
module.exports = function () {
    const classes = {
        btnDisabled: 'person-slider__button--disabled',
        imageSlided: 'person-slider__image--slided',
        textSlided: 'text-slider__slide--slided',
        textPreSlided: 'text-slider__slide--pre-slided',
        numSlided: 'person-slider__num-item--slided',
        numPreSlided: 'person-slider__num-item--pre-slided',
    };


    let $sliders = $('.js-person-slider');

    if ($sliders.length === 0) {
        return;
    }

    $sliders.each(function () {
        let currentSlide = 0;

        let buttons = {
            $prev: $(this).find('.js-prev'),
            $next: $(this).find('.js-next'),
        };

        let $images = $(this).find('.js-image-slide');
        let $texts = $(this).find('.js-text-slide');
        let $maxNum = $(this).find('.js-max-num');
        let $nums = $(this).find('.js-num').children();

        setStartSettings($images, $maxNum, buttons);


        buttons.$next.click(() => {
            currentSlide = next(currentSlide, $images, $texts, buttons, $nums);
        });

        buttons.$prev.click(() => {
            currentSlide = prev(currentSlide, $images, $texts, buttons, $nums);
        });

    });

    function setStartSettings($images, $maxNum, buttons){
        $maxNum.html($images.lenth);
        buttons.$prev.addClass(classes.btnDisabled);
    }

    function next(currentSlide, $images, $texts, buttons, $numbers) {
        if (currentSlide < $images.length - 1) {
            $images.eq(currentSlide).addClass(classes.imageSlided);
            $texts.eq(currentSlide).addClass(classes.textSlided);
            $texts.eq(currentSlide + 1).removeClass(classes.textPreSlided);
            $numbers.eq(currentSlide).addClass(classes.numSlided);
            $numbers.eq(currentSlide + 1).removeClass(classes.numPreSlided);

            currentSlide++;
            setBtnState(buttons, currentSlide, $images.length);

            return currentSlide;
        } else {

            return currentSlide;
        }
    }

    function prev(currentSlide, $images, $texts, buttons, $numbers) {
        if (currentSlide > 0) {
            $images.eq(currentSlide - 1).removeClass(classes.imageSlided);
            $texts.eq(currentSlide - 1).removeClass(classes.textSlided);
            $texts.eq(currentSlide).addClass(classes.textPreSlided);
            $numbers.eq(currentSlide - 1).removeClass(classes.numSlided);
            $numbers.eq(currentSlide).addClass(classes.numPreSlided);

            currentSlide--;
            setBtnState(buttons, currentSlide, $images.length);

            return currentSlide;
        } else {

            return currentSlide;
        }
    }

    function setBtnState(buttons, currentSlide, length) {
        if (currentSlide === 0) {
            buttons.$prev.addClass(classes.btnDisabled);
            buttons.$next.removeClass(classes.btnDisabled);
        } else if (currentSlide === length - 1) {
            buttons.$next.addClass(classes.btnDisabled);
            buttons.$prev.removeClass(classes.btnDisabled);
        } else {
            buttons.$next.removeClass(classes.btnDisabled);
            buttons.$prev.removeClass(classes.btnDisabled);
        }
    }
}