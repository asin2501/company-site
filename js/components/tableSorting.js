/**
 * Makes table sorting enabled for given element
 * @param table a jQuery object or simple selector
 * @param hideDuplicateClass a class where td with duplicate content must be hidden (only one class allowed)
 */
module.exports = function (table, hideDuplicateClass) {
    if (table === undefined || table === null) {
        return;
    }

    if (!(table instanceof $)) {
        table = $(table);
    }

    if (hideDuplicateClass.indexOf('.') !== 0) {
        hideDuplicateClass = '.' + hideDuplicateClass;
    }


    table.tablesorter({
        headers: {
            1: {
                sorter: false
            },
            3: {
                sorter: false
            },
        },
        sortList: [[0, 1]]
    }).bind('sortEnd', function () {
        let data;
        table.find(hideDuplicateClass).each(function () {
            if (data === undefined) {
                $(this).css('visibility', 'visible');
                data = $(this).html();
                return;
            }

            if ($(this).html() === data) {
                $(this).css('visibility', 'hidden');
            } else {
                $(this).css('visibility', 'visible');
            }
            data = $(this).html();
        });
    });

    setTableHeaderAngleSwitcher(table);

    table.trigger('sortEnd');
};

function setTableHeaderAngleSwitcher(table) {
    table.find('th').click(function () {
        let faAngleUp = 'fa-angle-up',
            faAngleDown = 'fa-angle-down',
            $fa = $(this).find('.fa');
        if ($(this).hasClass('tablesorter-headerAsc')) {
            $fa.removeClass(faAngleDown).addClass(faAngleUp);
        } else {
            $fa.removeClass(faAngleUp).addClass(faAngleDown);
        }
    });
}
