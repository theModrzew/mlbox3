;(function () {
    "use strict";

    const parent = arguments[0];
    const nullConsole = {
        log: function() {},
        dir: function() {},
        info: function() {},
        warn: function() {},
        debug: function() {},
        clear: function() {},
        error: function() {}
    };

    if (typeof parent.document !== 'object') {
        throw 'environment: document is not an object';
    }

    if (typeof parent.document.addEventListener !== 'function') {
        throw 'environment: addEventListener function does not exists';
    }

    var doc = parent.document;
    var config = {};
    var addEvent = parent.document.addEventListener;
    var logger = parent.console || nullConsole;

    if (arguments.length < 2 || arguments[1] !== 'debug') {
        logger = nullConsole;
    }

    /**
     * @param {object}
     */
    const init = function(event) {
        logger.debug('MLBOX3');
        logger.debug(event);
        buildConfig();
        logger.dir(config);
        initEvents();
    };

    /**
     *
     */
    function buildConfig() {
        let path = (doc.body.dataset.mlboxPath || 'images') + '/';

        let elements = Array.from(doc.querySelectorAll('*[data-mlbox]'));
        let images = [];
        for (let i=0; i<elements.length; i++) {
            if (elements[i].dataset.mlbox === 'gallery') {
                // search for images there
                let imgs = Array.from(elements[i].getElementsByTagName('img'));
                let tagOrder = 0;
                let setName = '?';

                imgs.forEach(function(image) {
                    if (image.parentNode.nodeName.toLowerCase() === 'a') {
                        Array.push(images, {
                            el: image.parentNode,
                            target: image.parentNode.href,
                            set: setName,
                            order: tagOrder
                        });
                    } else {
                        Array.push(images, {
                            el: image,
                            target: image.getAttribute('src'),
                            set: setName,
                            order: tagOrder
                        });
                    }
                    tagOrder++;
                });
            } else if (elements[i].nodeName.toLowerCase() === 'a') {
                Array.push(images, {
                    el: elements[i],
                    target: elements[i].href,
                    set: null,
                    order: 0
                });
            } else if (elements[i].nodeName.toLowerCase() === 'img') {
                Array.push(images, {
                    el: elements[i],
                    target: elements[i].getAttribute('src'),
                    set: null,
                    order: 0
                });
            } else {
                logger.warn('mlbox used on invalid tag: ' + elements[i].nodeName);
            }
        }

        config = {
            path: path,
            images: images
        };
    }

    /**
     *
     */
    function initEvents() {
    }

    addEvent('DOMContentLoaded', init, false);
})(window, 'debug');
