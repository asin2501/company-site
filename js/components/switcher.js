let post = require('./getPost.js');

let elementAnimationOnScroll = require('./elementAnimationOnScroll.js');

let $simpleSliders;

class Switcher {
    constructor() {
        this.$switcher = $('#switch');
        this.$buttons = $('.switch__inner').find('.switch-button');
        this.$backBtn = $('#back-switch');
        this.activeTabClass = 'switch-item--active';
        this.$tabs = this.$switcher.find('.switch-item');
        this.currentPos = 0;
        this.$devLink = $('.nav__item--developer').find('a');
        this.$designLink = $('.nav__item--designer').find('a');


        this.$simpleSliders = $('.js-simple-slider');
        this.$simpleSliders.slick({
            slidesToShow: 1,
            slidesToScroll: 1
        });

        this.switcherPosClasses = ['switch--left', 'switch--right'];

        this.setStartPos();
        initSwitchPageAnimation();

        this.$buttons.click(this.changePos.bind(this));

        this.$devLink.click((e) => {
            e.preventDefault();
            this.setPos(0);
            return false;
        });

        this.$designLink.click((e) => {
            e.preventDefault();
            this.setPos(1);
            return false;
        });
    }

    getCurrentTab() {
        return this.$tabs.eq(this.currentPos);
    }

    setStartPos() {
        let posIndex = post.switcherPos === undefined ? 0 : +post.switcherPos;

        if(posIndex) {
            this.$designLink.parent().toggleClass('active');
        }else{
            this.$devLink.parent().addClass('active');
        }

        this.setPos(posIndex);

        let $preloader = $('#switch-preload');
        setTimeout(() => {
            $preloader.addClass('animated');

            setTimeout(() => {
                $preloader.hide();
            }, 1200);
        }, 1000);

        return posIndex;

    }

    changePos() {
        let newPos = 1;

        if (this.currentPos) {
            newPos = 0;
        }
        this.setPos(newPos);
    }


    setPos(num) {
        if(this.currentPos === num){
            return;
        }

        let oldTab = this.getCurrentTab();
        oldTab.find('.switch-button').addClass('switch-button--hide');

        this.currentPos = num;

        this.$devLink.parent().add(this.$designLink.parent()).toggleClass('active');

        this.$tabs.removeClass('switch-button--hide');

        $('#page-name').html(num === 1 ? 'developer' : 'designer');

        setTimeout(() => {
            this.$switcher.removeClass(this.switcherPosClasses.join(' ')).addClass(this.switcherPosClasses[this.currentPos]);
            setTimeout(() => {
                oldTab.find('.switch-button').removeClass('switch-button--hide');
                this.$simpleSliders.slick('setPosition');
            }, 1000)
        }, 500);

        let url = `${document.location.origin}${document.location.pathname}?switcherPos=${num}`;
        if (document.location.href.indexOf(url) === -1) {
            window.history.pushState({"html": "page", "pageTitle": "title"}, "", url);
        }
    }
}

function initSwitchPageAnimation() {
    let $container = $('#designer-scroll-container');

    elementAnimationOnScroll('animate', $('#design-apply-section'), 'vCenter', $container);

    $container.find('.our-way-present-second').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.section-heading').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.person-story__portrait').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.person-slider').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });


    $container = $('#developer-scroll-container');

    elementAnimationOnScroll('animate', $('#developer-apply-section'), 'vCenter', $container);

    $container.find('.our-way-present-second').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.section-heading').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.person-story__portrait').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });

    $container.find('.person-slider').each(function () {
        elementAnimationOnScroll('animate', $(this), 'vCenter', $container);
    });
}

module.exports = Switcher;