/**
 * Add mouse enter handler for given element.
 * @param element a jQuery object or simple selector
 * @param classes an object like {
             top: <className>,
             right: <className>,
             bottom: <className>,
             left: <className>
         }.
    Missed classes will be added by default.
 */
module.exports = function (element, classes) {
    if (element === undefined || element === null) {
        return;
    }

    if (!(element instanceof $)) {
        element = $(element);
    }

    classes = checkClassesObject(classes);

    element.mouseenter(function (e) {
        clearClasses($(this), classes);

        let direction = determineDirection($(this), {x: e.pageX, y: e.pageY});
        switch (direction) {
            case 0:
                $(this).addClass(classes.top);
                break;
            case 1:
                $(this).addClass(classes.right);
                break;
            case 2:
                $(this).addClass(classes.bottom);
                break;
            case 3:
                $(this).addClass(classes.left);
                break;
        }
    });

    element.mouseleave(function () {
        clearClasses($(this), classes);
    });

    /*
        Determines mouse enter direction.
        Returns a number from 0 to 3, where:
            0 - top -> bottom,
            1 - right -> left,
            2 - bottom -> top,
            3 - left -> right.
     */
    function determineDirection($el, pos) {
        let w = $el.width(),
            h = $el.height(),
            x = (pos.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (pos.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1);

        return Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90 + 3) % 4;
    }

    function checkClassesObject(classes) {
        if (classes === undefined || classes === null) {
            classes = generateDefaultClasses();
        } else {
            if (classes.top === undefined) {
                classes.top = 'top';
            }
            if (classes.right === undefined) {
                classes.right = 'right';
            }
            if (classes.bottom === undefined) {
                classes.bottom = 'bottom';
            }
            if (classes.left === undefined) {
                classes.left = 'left';
            }
        }

        return classes;
    }

    function generateDefaultClasses() {
        return {
            top: 'top',
            right: 'right',
            bottom: 'bottom',
            left: 'left'
        };
    }

    function clearClasses(jqueryObject, classes) {
        jqueryObject.removeClass(classes.top).removeClass(classes.right).removeClass(classes.bottom).removeClass(classes.left);
    }
};
