function IframeBus() {
    var handlers = {};

    this.subscribe = function (type, handler) {
        var handlerName = type + '_' + 'handler';
        handlers[handlerName] = function (event, data) {
            handler(event, data);
        };
    };

    this.publish = function (target, type, data, callback) {

        if (callback) {
            var callbackName = type + '_' + 'callback';
            var cb = function (e, d) {
                callback(e, d);
            };

            handlers[callbackName] = cb;
        }

        var d = data || {};
        d.type = type;
        console.log(d)
        target.postMessage(d, "*");
    }

    window.addEventListener('message', function (event) {
        var handlerName = event.data.type + '_' + 'handler';
        var callbackName = event.data.type + '_' + 'callback';

        if (handlers[handlerName]) {
            handlers[handlerName](event, event.data)
        }

        if (handlers[callbackName]) {
            handlers[callbackName](event, event.data)
        }
    }, false)
}

export default new IframeBus();