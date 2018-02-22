/**
 * Creates a DOM element with given attributes.
 * Returns a raw DOM element.
 * @param tagName a tag name of new DOM element
 * @param attributes an object with element attributes
 */
module.exports = function (tagName, attributes) {
    if (tagName === undefined) {
        return;
    }

    let element = document.createElement(tagName);

    if (attributes) {
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
    }

    return element;
};
