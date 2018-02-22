module.exports = function () {
    $('.heading-block').click(function () {
        if ($(this).hasClass('heading-block--transformed')) {
            $(this).removeClass('heading-block--transformed');
        } else {
            $(this).addClass('heading-block--transformed');
        }
    });
};
