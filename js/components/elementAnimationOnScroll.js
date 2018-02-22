module.exports = elementAnimationOnScroll;
// TODO: change parameters order
// TODO: optionally add ability to apply animation for each of elements in jQuery object
function elementAnimationOnScroll(animateClass, element, positionAnimation, parent) {

    let elementPosition, targetElement, elementHeight, targetScrollTop, windowHeight, windowWidth, deskTopWidth, isMobile;

    animateClass = animateClass || 'animate';
    element = $(element);
    parent = parent || $(window);
    positionAnimation = positionAnimation || 'vOffset-70';

    if (element.length === 0) {
        return;
    }

    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    elementHeight = element.innerHeight();
    targetElement = element.offset().top;
    deskTopWidth = 1200;

    if (windowWidth <= deskTopWidth) {
        isMobile = true;
    } else {
        isMobile = false;
    }

    $(window).resize(function () {
        windowHeight = $(window).height();
        windowWidth = window.innerWidth;
        elementHeight = element.innerHeight();
        targetElement = element.offset().top;

        elementPosition = setValues(positionAnimation);

        if (windowWidth <= deskTopWidth) {
            isMobile = true;
        } else {
            isMobile = false;
        }
        scrollHandler();
    });

    elementPosition = setValues(positionAnimation);

    parent.scroll(scrollHandler);

    function setValues(positionAnimation){
        let elementPosition;
        switch (positionAnimation) {
            case 'vTop':
                elementPosition = targetElement - windowHeight;
                break;
            case 'vCenter':
                elementPosition = targetElement - (windowHeight / 2);
                break;
            case 'vBottom':
                elementPosition = targetElement;
                break;
            case 'vBottomElem':
                elementPosition = (targetElement - windowHeight) + elementHeight;
                break;
            case 'vOffset-70':
            default:
                elementPosition = targetElement - (windowHeight * 0.7);
        }
        return elementPosition
    }

    function scrollHandler(){
        if (parent.scrollTop() >= elementPosition && !isMobile) {
            element.addClass(animateClass);
        }
    }
}