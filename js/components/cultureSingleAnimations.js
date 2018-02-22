let elementAnimationOnScroll = require('./elementAnimationOnScroll.js');

$(function () {
    $('.culture__details-row').each(function () {
        elementAnimationOnScroll('animate', this);
    });
});
