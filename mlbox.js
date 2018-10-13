;(function () {
    "use strict";

    const parent = arguments[0];

    if (typeof parent.document !== 'object') {
        throw 'environment: document is not an object';
    }

    if (typeof parent.document.addEventListener !== 'function') {
        throw 'environment: addEventListener function does not exists';
    }

    var doc = parent.document;
    var config = {};
    var addEvent = parent.document.addEventListener;

    /**
     * @param {object}
     */
    const init = function(event) {
        console.debug('MLBOX3');
        console.debug(event);
        buildConfig();
        console.dir(config);
        initEvents();
    };

    /**
     *
     */
    function buildConfig() {
        let path = (doc.body.dataset.mlboxPath || 'images') + '/';
        let elements = Array.from(doc.querySelectorAll('*[data-mlbox]'));

        console.dir(elements);

        config = {
            path: path
        };
    }

    /**
     *
     */
    function initEvents() {
    }

    addEvent('DOMContentLoaded', init, false);
})(window);
