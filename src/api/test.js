var bus = {
    messageHandler: [],
    init: function () {
        window.onload = function () {
            window.addEventListener('message', function (event) {
                if (event.data.type == 'share') {
                    if (event.data.status == 1) {
                        alert('succ')
                        //succ
                    } else {
                        alert('error')
                    }
                }
            }, false)

            parent.postMessage({
                type: 'share',
                config: {
                    title: 'title',
                    description: 'description',
                    imageUrl: 'http://i.lifevccdn.com/upload/Category_Img/19bb96cb3336468ba2a3a9b494029b45.jpg',
                    url: 'http://mnew.lifepre.com/h5/#/all'
                }
            }, "*");
        }
    }
}
if (parent) {
    window.onload = function () {
        window.addEventListener('message', function (event) {
            if (event.data.type == 'share') {
                if (event.data.status == 1) {
                    alert('succ')
                    //succ
                } else {
                    alert('error')
                }
            }
        }, false)

        parent.postMessage({
            type: 'share',
            config: {
                title: 'title',
                description: 'description',
                imageUrl: 'http://i.lifevccdn.com/upload/Category_Img/19bb96cb3336468ba2a3a9b494029b45.jpg',
                url: 'http://mnew.lifepre.com/h5/#/all'
            }
        }, "*");
    }
}

function Bus() {
    var handlers = {};

    this.subscribe = function (type, handler) {
        var handlerName = type + '_' + 'handler';
        var _handler = function (event, data) {
            handler(event, data);
        };

        handlers[handlerName] = _handler;
    };

    this.publish = function (type, data, target, callback) {
        var callbackName = type + '_' + 'callback';
        var cb = function (e, d) {
            callback(e, d);
        };

        var _data = {
            type: type,
            data: data
        }

        handlers[callbackName] = cb;
        target.postMessage(_data, "*")
    }

    window.onload = function () {
        window.addEventListener('message', function (event) {
            console.log(event.data);
            
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
}

var bus = new Bus();

bus.subscribe('share',function(e,d){
  console.log(d)
});

bus.publish('share',{title:''},window,function(e,d){
  console.log(d)
});