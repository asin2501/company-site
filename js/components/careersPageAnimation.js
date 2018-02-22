let elementAnimationOnScroll = require('./elementAnimationOnScroll.js');

module.exports = function() {

    let $subscribeNote = $('.subscribe-note');
    let $subscribeForm = $('.subscribe-form');

    elementAnimationOnScroll('animate', $subscribeNote, 'vTop');
    elementAnimationOnScroll('animate', $subscribeForm, 'vTop');
}