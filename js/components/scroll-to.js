/**
 * Created by User on 20.07.2017.
 */

module.exports = scrollTo;

function scrollTo($elements, offset = 100) {
    if ($elements.length === 0) {
        return;
    }

    $elements.click(function (e) {
        let $target = $($(this).attr('href'));
        e.preventDefault();

        if ($target.length === 0) {
            return;
        }

        $('html, body').animate({scrollTop: $target.offset().top - offset});
    })
}


$(document).ready(() => {
    scrollTo($('.js-anchor'));
});