/**
 * Created by User on 17.07.2017.
 */

// module.exports = initSPscroller;

const keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    document.addEventListener("mousewheel", preventDefault);
    document.addEventListener("touchmove", preventDefault);
    document.addEventListener("keydown", preventDefaultForScrollKeys);
}

function enableScroll() {
    document.removeEventListener("mousewheel", preventDefault);
    document.removeEventListener("touchmove", preventDefault);
    document.removeEventListener("keydown", preventDefaultForScrollKeys);
}

class SPscroller {
    constructor() {

        this.scrollStatus = false;
        this.isAnimationContinues = false;

        this.$elements = {
            $window: $(window),
            $video: $('#sp-video'),
            $videoWrapper: $('#video-wrapper'),
            $header: $('#js-project-single-header'),
            $pageHeader: $('#sp-header'),
            $scrollButton: $('#js-scroll-btn'),
            $spButtons: $('.js-sp-button'),
            $spSidebar: $('#sp-sidebar-nav')
        };

        this.classes = {
            $videoWrapper: 'sp-top-video--compressed',
            $header: 'header--white header--transparent',
            $pageHeader: 'sp-header__transformed',
            $scrollButton: 'scroll-btn--scrolled',
            $spButtons: 'sp-button--scrolled',
            $spSidebar: 'sp-sidebar-nav--hidden'
        };

        // if true then the class will be added when scrolling down, if false will be removed
        // when scroll top - reverse values
        this.classesSchema = {
            $videoWrapper: true,
            $header: false,
            $pageHeader: false,
            $scrollButton: true,
            $spButtons: true,
            $spSidebar:false
        };


        disableScroll();
        this.$elements.$window.on('mousewheel touchmove', this.scrollHandler.bind(this));

        this.$elements.$scrollButton.click(this.toggleScroll.bind(this));

        if (window.innerWidth < 1200) {
            this.setClasses('down');
            this.isAnimationContinues = false;
            this.scrollStatus = true;
            enableScroll();
        } else {
            $(document).ready(function () {
                $('html, body').scrollTop(0);
            });
        }
    }

    scrollHandler(e) {
        if (!(this.scrollStatus || this.isAnimationContinues)) {
            this.spScrollDown();
        }
    }

    toggleScroll() {
        if (this.scrollStatus) {
            this.spScrollTop();
        } else {
            this.spScrollDown();
        }
        return false;
    }

    setClasses(direction) {

        for (let key in this.classesSchema) {

            let flag = this.classesSchema[key];

            switch (direction) {
                case 'top':
                    flag = !flag;
            }

            if (flag) {
                this.$elements[key].addClass(this.classes[key]);
            } else {
                this.$elements[key].removeClass(this.classes[key]);
            }
        }
    }

    resizeHandler() {
        this.spScrollDown();
    }

    spScrollDown() {
        this.isAnimationContinues = true;
        this.$elements.$video.get(0).pause();

        this.setClasses('down');

        setTimeout(() => {
            this.isAnimationContinues = false;
            this.scrollStatus = true;
            enableScroll();
            this.$elements.$window.trigger('resize');
        }, 1600)
    }

    spScrollTop() {
        this.isAnimationContinues = true;
        disableScroll();

        this.$elements.$video.get(0).play();

        this.setClasses('top');
        setTimeout(() => {
            this.isAnimationContinues = false;
            this.scrollStatus = false;
            this.$elements.$window.trigger('resize');
        }, 1600)
    }

    setAnimationBlock(time) {
        this.isAnimationContinues = true;

        setTimeout(() => {
            this.isAnimationContinues = false;
        }, time)
    }
}

if ($('.project-single').length > 0) {
    new SPscroller;
}
