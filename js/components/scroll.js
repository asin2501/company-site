/**
 * Created by 2501 on 03.07.2017.
 */
module.exports = function ($scroll) {
    if ($scroll.length < 1) {
        return;
    }

    $scroll.each(function(){

        let $scroll = $(this);

        const MOBILE_WIDTH = 1199;

        const classes = {
            item: 'scroll-bar__item',
            active: 'scroll-bar__item--active',
            border: 'scroll-bar__border'
        };

        let $scrollItems = $scroll.find('.' + classes.item);
        let $scrollContainer = $($scroll.attr('data-scroll-container'));

        if ($scrollContainer.length === 0) {
            $scrollContainer = $('html, body');
        }

        $scrollItems.each(function (i) {
            let $target = $($(this).attr('data-for'));
            let height = $target.height();
            let conteinerOffset = $scrollContainer.offset().top;

            $scrollContainer.on('scroll', scrollHandler.bind(this));
            scrollHandler.bind(this)();

            $(window).resize(() => {
                height = $target.height();
                conteinerOffset = $scrollContainer.offset().top;
            });

            $(this).click(function (e) {
                let targetPos = $target.position().top + $scrollContainer.scrollTop() + conteinerOffset;
                let time = Math.abs(targetPos - $scrollContainer.scrollTop()) / 3;
                $scrollContainer.animate({scrollTop: targetPos}, time);
                e.preventDefault();
            });

            function scrollHandler() {

                if (window.innerWidth < MOBILE_WIDTH) {
                    return
                }

                let offset = $target.position().top;
                let deltaOffset = offset;
                let height = $target.height();
                let absOffset = Math.abs(deltaOffset);

                if (deltaOffset <= 1 && ( absOffset < height )) {
                    let persent = (absOffset / height ) * 100;

                    if (($scrollContainer.children().height() - $scrollContainer.height() - $scrollContainer.scrollTop() - 2) < 0) { // 2 To overcome the error
                        persent = 100;
                    }

                    $(this).addClass(classes.active).children('.' + classes.border).css({'height': persent + '%'});
                } else {
                    $(this).removeClass(classes.active).children('.' + classes.border).css({'height': 0});
                }
            }
        })
    })
}