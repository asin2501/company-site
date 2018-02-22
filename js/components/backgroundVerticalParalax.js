module.exports = function($elements, minWidth, scale, minMoveCount) {

    scale = scale || 0.1;
    minMoveCount = minMoveCount || 20;

    setParalaxState($elements, minWidth, scale, minMoveCount);

    $(window).resize(() => {
        setParalaxState($elements, minWidth, scale, minMoveCount);
    });
}

function setParalaxState($elements, minWidth, scale, minMoveCount) {
    let viewportCenter = window.innerHeight / 2;

    if (window.innerWidth >= minWidth) {
        setParalax($elements, viewportCenter, scale, minMoveCount);
    } else {
        resetParalax($elements);
    }
}

function setParalax($elements, viewportCenter, scale, minMoveCount) {
    $elements.each(function() {
        let currentMoveCounter = 0;
        let bgCount = $(this).css('background-image').split(',').length;

        $(this).on('mousemove.vparalax', (event) => {
            if (currentMoveCounter === minMoveCount) {
                currentMoveCounter = 0;
                $(this).css('background-position-y', getOffsets(event.pageY, viewportCenter, scale, bgCount).join());
            } else {
                currentMoveCounter++;
            }
        });

        $(this).on('mouseenter.vparalax', () => {
            $(this).css('will-change', 'background-position');
        });

        $(this).on('mouseleave.vparalax', () => {
            $(this).css('will-change', 'auto');
        });
    })
}

function resetParalax($elements) {
    $elements.each(function() {
        $(this).off('.vparalax');
        $(this).css('will-change', 'auto');
        $(this).css('background-position-y', 'center');
    });
}

function getOffsets(pos, center, scale, count) {
    let offsets = [];
    count = count || 1;

    for (var i = 1; i <= count; i++) {
        let res = (pos - center) * (scale * i);
        offsets.push(res + 'px');

    }

    return offsets;
}