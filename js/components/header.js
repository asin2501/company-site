module.exports = function () {
    let $retractableSidebar = $('#js-retractable-sidebar'),
        $navButton = $('#js-nav-button'),
        sideBarIsOpened = false;

    $navButton.click(toggleSidebar);
    $retractableSidebar.click(retractableSidebarClickHandler);
    $(document.body).click(closeSidebar);

    function openSidebar(e) {
        $(document.body).addClass('sidebar-opened');
        $retractableSidebar.addClass('retractable-sidebar--opened');
        $navButton.addClass('opened');

        sideBarIsOpened = true;
    }

    function toggleSidebar(e) {
        if (sideBarIsOpened) {
            closeSidebar();
        } else {
            openSidebar();
        }
        return false;
    }

    function retractableSidebarClickHandler(e) {
        e.stopPropagation();
    }

    function closeSidebar(e) {
        $(document.body).removeClass('sidebar-opened');
        $retractableSidebar.removeClass('retractable-sidebar--opened');
        $navButton.removeClass('opened');

        sideBarIsOpened = false;
    }
};
