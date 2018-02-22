module.exports = initSorterMenu;

function initSorterMenu() {

    let $menuTitle = $('.sorter-menu__title');
    let $menuList = $('.sorter-menu__list');
    let $menuLink = $menuList.find('.sorter-menu__link');
    let windowWidth = $(window).outerWidth();
    let mobileWidth = 991;


    $(window).resize(function () {
        windowWidth = $(window).outerWidth();
        isMolbile();

        if (!isMolbile()) {
            $menuList.attr('style', '');
            $menuTitle.removeClass('opened');
        }

    });


    $menuTitle.click(function () {
        if (isMolbile()) {
            $(this).toggleClass('opened');
            $menuList.stop().slideToggle();
        }
    });

    $menuLink.click(function (e) {
        e.preventDefault();

        if (isMolbile()) {
            $menuTitle.removeClass('opened');
            $menuTitle.text($(this).text());
            $menuList.slideUp();
        }

    });

    function isMolbile() {
        if (windowWidth <= mobileWidth) {
            return true;
        } else {
            return false;
        }
    }

}