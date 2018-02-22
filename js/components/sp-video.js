/**
 * Created by User on 18.07.2017.
 */

$(initSPVideo);

function initSPVideo() {
    $('.js-sp-video').each(function () {
        let $button = $(this).find('button');
        let video = $(this).find('video').get(0);

        $button.click(function () {
            video.play();

            $button.fadeOut(500, function () {
                video.setAttribute("controls", "controls");
            });
        });
    });
}