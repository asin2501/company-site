module.exports = function ($videoContainer) {
    if ($(window).width() < 768) {
        return;
    }

    if (typeof $videoContainer === 'undefined') {
        return;
    }
    if (!($videoContainer instanceof $)) {
        $videoContainer = $($videoContainer);
    }

    $videoContainer.each(function () {
        let video = this.getElementsByTagName('video')[0];
        if (typeof video === 'undefined') {
            return;
        }

        $(this).hover(function () {
            video.play();
        }, function () {
            video.pause();
        });
    });
};
