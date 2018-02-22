module.exports = function () {
    setImagesOffset();
    awardListItemClickHandler();

    // Sets the nearby position for pictures related to the links in the table
    function setImagesOffset() {
        $('#js-award-table').find('.award-table__project-link').each(function () {
            let coord = getElementCoordinates($(this));
            $(this).siblings('.award-table__project-image-wrapper')
                .offset({top: coord.top, left: coord.right});
        });
    }

    function awardListItemClickHandler() {
        $('.js-award').click(function () {
            let dataAttrValue = $(this).attr('data-table-value'),
                awardTable = $('#js-award-table'),
                awardTableBody = awardTable.find('tbody');

            // Moves related table rows to the top of the table
            $('.js-table-row').each(function () {
                let rowDataAttrValue = $(this).attr('data-row-value');

                if (rowDataAttrValue === dataAttrValue) {
                    awardTableBody.prepend($(this));
                }
            });
            awardTable.trigger('sortEnd');

            // Scroll to the table
            if ($(window).width() > 991) {
                $('html,body').animate({
                    scrollTop: awardTable.offset().top
                }, 'slow');
            } else {
                // -- or redirect to project on mobile
                window.location.href = $(this).find('a').attr('href');
            }
        });
    }
};

/**
 * Returns element offset including margins.
 * @param element a jQuery object or selector
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
function getElementCoordinates(element) {
    if (!(element instanceof $)) {
        element = $(element);
    }

    let top = element.offset().top - parseFloat(element.css('margin-top')),
        left = element.offset().left - parseFloat(element.css('margin-left'));

    return {
        top: top,
        right: left + element.outerWidth(true),
        bottom: top + element.outerHeight(true),
        left: left
    };
}
