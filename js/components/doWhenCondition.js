module.exports = function(condition, callback) {
    if (document.querySelectorAll(condition).length > 0) {
        callback();
    }
}