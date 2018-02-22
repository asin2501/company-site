var elementAnimationOnScroll = require('./elementAnimationOnScroll.js');

module.exports = function() {

    let faqList = $('.faq-section__list');
    let faqListItem = faqList.find('.faq-section__list-item');

    elementAnimationOnScroll('animate', $('#apply-section'), 'vCenter', $('#overlap-page'));
    elementAnimationOnScroll('animate', $('#faq-section'), 'vCenter', $('#overlap-page'));

    faqListItem.each(function() {
        elementAnimationOnScroll('animate', $(this), 'vBottomElem', $('#overlap-page'));
    });
}